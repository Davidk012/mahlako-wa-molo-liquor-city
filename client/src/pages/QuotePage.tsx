import React, { useState, useEffect } from 'react';
import { equipmentAPI, packageAPI, bookingAPI } from '../services/api';
import { Calculator, Download, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

interface Equipment {
  id: string;
  name: string;
  basePrice: number;
  unit: string;
}

interface PackageData {
  id: string;
  name: string;
  description: string;
  price: number;
  items: { equipmentId: string; quantity: number }[];
}

const QuotePage: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number}>({});
  const [formData, setFormData] = useState({
    funeralDate: '',
    cemeteryAddress: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    companyName: ''
  });
  const [quote, setQuote] = useState<{
    itemsTotal: number;
    packagesTotal: number;
    deliveryFee: number;
    totalAmount: number;
  } | null>(null);

  useEffect(() => {
    fetchEquipment();
    fetchPackages();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await equipmentAPI.getAll();
      setEquipment(response.data || []);
    } catch (error) {
      toast.error('Failed to load equipment');
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await packageAPI.getAll();
      setPackages(response.data || []);
    } catch (error) {
      toast.error('Failed to load packages');
    }
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setSelectedItems({});
  };

  const handleItemQuantityChange = (itemId: string, quantity: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: Math.max(0, quantity)
    }));
    setSelectedPackage('');
  };

  const calculateQuote = async () => {
    if (!formData.funeralDate || !formData.cemeteryAddress) {
      toast.error('Please select funeral date and cemetery address');
      return;
    }

    const hasItems = Object.values(selectedItems).some(qty => qty > 0);
    const hasPackage = selectedPackage !== '';

    if (!hasItems && !hasPackage) {
      toast.error('Please select at least one package or item');
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        funeralDate: formData.funeralDate,
        cemetery: {
          name: 'Quote Request',
          address: formData.cemeteryAddress
        },
        items: Object.entries(selectedItems)
          .filter(([_, quantity]) => quantity > 0)
          .map(([equipmentId, quantity]) => ({
            equipmentId,
            quantity,
            price: equipment.find(e => e.id === equipmentId)?.basePrice || 0
          })),
        packages: selectedPackage ? [{
          packageId: selectedPackage,
          quantity: 1,
          price: packages.find(p => p.id === selectedPackage)?.price || 0
        }] : []
      };

      const response = await bookingAPI.calculateQuote(bookingData);
      setQuote(response.data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to calculate quote');
    } finally {
      setLoading(false);
    }
  };

  const downloadQuote = () => {
    if (!quote) return;
    
    const quoteData = {
      contactInfo: formData,
      selectedPackage: selectedPackage ? packages.find(p => p.id === selectedPackage) : null,
      selectedItems: Object.entries(selectedItems)
        .filter(([_, quantity]) => quantity > 0)
        .map(([equipmentId, quantity]) => ({
          equipment: equipment.find(e => e.id === equipmentId),
          quantity
        })),
      quote,
      generatedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(quoteData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `sfs-quote-${Date.now()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Quote downloaded successfully!');
  };

  const formatPrice = (price: number) => `R ${price.toLocaleString()}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Get Quote</h1>
        <p className="text-gray-600 mt-2">
          Calculate the cost for your funeral equipment rental needs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Selection */}
        <div className="space-y-6">
          {/* Package Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Packages</h3>
            <div className="space-y-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`card p-4 cursor-pointer border-2 ${
                    selectedPackage === pkg.id ? 'border-primary-500' : 'border-transparent'
                  }`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary-600">{formatPrice(pkg.price)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Individual Items</h3>
            <div className="space-y-3">
              {equipment.map((item) => (
                <div key={item.id} className="card p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {formatPrice(item.basePrice)} {item.unit}
                      </p>
                    </div>
                    <input
                      type="number"
                      min="0"
                      value={selectedItems[item.id] || 0}
                      onChange={(e) => handleItemQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      className="w-20 input text-center"
                      disabled={selectedPackage !== ''}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quote Details */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                  className="input"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                  className="input"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  className="input"
                  placeholder="+27 12 345 6789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="input"
                  placeholder="Funeral home name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funeral Date *
                </label>
                <input
                  type="date"
                  value={formData.funeralDate}
                  onChange={(e) => setFormData({...formData, funeralDate: e.target.value})}
                  className="input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cemetery Address *
                </label>
                <input
                  type="text"
                  value={formData.cemeteryAddress}
                  onChange={(e) => setFormData({...formData, cemeteryAddress: e.target.value})}
                  className="input"
                  placeholder="Full address for delivery"
                />
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            className="w-full btn btn-primary"
            onClick={calculateQuote}
            disabled={loading}
          >
            <Calculator className="w-5 h-5 mr-2" />
            {loading ? 'Calculating...' : 'Calculate Quote'}
          </button>
        </div>
      </div>

      {/* Quote Results */}
      {quote && (
        <div className="card p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quote Summary</h3>
          
          <div className="space-y-4 mb-6">
            {selectedPackage && (
              <div className="flex justify-between items-center pb-4 border-b">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {packages.find(p => p.id === selectedPackage)?.name}
                  </h4>
                  <p className="text-sm text-gray-600">Package</p>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatPrice(quote.packagesTotal)}
                </span>
              </div>
            )}

            {Object.entries(selectedItems)
              .filter(([_, quantity]) => quantity > 0)
              .map(([equipmentId, quantity]) => {
                const item = equipment.find(e => e.id === equipmentId);
                return (
                  <div key={equipmentId} className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item?.name}</h4>
                      <p className="text-sm text-gray-600">
                        {quantity} x {formatPrice(item?.basePrice || 0)}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {formatPrice((item?.basePrice || 0) * quantity)}
                    </span>
                  </div>
                );
              })}

            <div className="flex justify-between items-center pt-4">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(quote.deliveryFee)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="text-lg font-semibold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-primary-600">
                {formatPrice(quote.totalAmount)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="btn btn-primary flex items-center justify-center"
              onClick={downloadQuote}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Quote
            </button>
            
            <button
              className="btn btn-outline flex items-center justify-center"
              onClick={() => window.location.href = `mailto:info@sfs.co.za?subject=Quote Request&body=I would like to discuss the quote for ${formatPrice(quote.totalAmount)}`}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </button>
            
            <button
              className="btn btn-outline flex items-center justify-center"
              onClick={() => window.location.href = 'tel:+27123456789'}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This quote is valid for 7 days and is subject to equipment availability. 
              Delivery fees are calculated based on distance from our facility.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuotePage;
