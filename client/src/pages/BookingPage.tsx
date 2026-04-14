import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { equipmentAPI, packageAPI, bookingAPI } from '../services/api';
import { Calendar, MapPin, Calculator, Clock, Package, DollarSign } from 'lucide-react';
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

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number}>({});
  const [formData, setFormData] = useState({
    funeralDate: '',
    funeralTime: '',
    cemeteryName: '',
    cemeteryAddress: '',
    contactPerson: '',
    contactPhone: '',
    notes: ''
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
        funeralTime: formData.funeralTime,
        cemetery: {
          name: formData.cemeteryName,
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
      setStep(3);
    } catch (error: any) {
      toast.error(error.message || 'Failed to calculate quote');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async () => {
    if (!quote) return;

    setLoading(true);
    try {
      const bookingData = {
        funeralDate: formData.funeralDate,
        funeralTime: formData.funeralTime,
        cemetery: {
          name: formData.cemeteryName,
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
        }] : [],
        deliveryFee: quote.deliveryFee,
        totalAmount: quote.totalAmount,
        contactPerson: formData.contactPerson,
        contactPhone: formData.contactPhone,
        notes: formData.notes
      };

      const response = await bookingAPI.create(bookingData);
      toast.success('Booking created successfully!');
      navigate(`/dashboard`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => `R ${price.toLocaleString()}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Book Equipment</h1>
        <p className="text-gray-600 mt-2">
          Complete the form below to book funeral equipment for your service
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= stepNumber ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div className={`w-full h-1 mx-2 ${
                step > stepNumber ? 'bg-primary-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Package or Items */}
      {step === 1 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Package or Individual Items</h2>
            
            {/* Package Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`card p-4 cursor-pointer border-2 ${
                      selectedPackage === pkg.id ? 'border-primary-500' : 'border-transparent'
                    }`}
                    onClick={() => handlePackageSelect(pkg.id)}
                  >
                    <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                    <p className="text-lg font-bold text-primary-600">{formatPrice(pkg.price)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Items */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Individual Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipment.map((item) => (
                  <div key={item.id} className="card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
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

          <div className="flex justify-end">
            <button
              className="btn btn-primary"
              onClick={() => setStep(2)}
              disabled={!selectedPackage && Object.values(selectedItems).every(qty => qty === 0)}
            >
              Next: Event Details
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Event Details */}
      {step === 2 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  Funeral Time *
                </label>
                <input
                  type="time"
                  value={formData.funeralTime}
                  onChange={(e) => setFormData({...formData, funeralTime: e.target.value})}
                  className="input"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cemetery Name *
                </label>
                <input
                  type="text"
                  value={formData.cemeteryName}
                  onChange={(e) => setFormData({...formData, cemeteryName: e.target.value})}
                  className="input"
                  placeholder="e.g., Westpark Cemetery"
                />
              </div>

              <div className="md:col-span-2">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  className="input"
                  placeholder="Name of on-site contact"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  className="input"
                  placeholder="Phone number for coordination"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="input"
                  rows={4}
                  placeholder="Any special requirements or instructions"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="btn btn-secondary"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={calculateQuote}
              disabled={loading}
            >
              {loading ? 'Calculating...' : 'Get Quote'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Quote Review */}
      {step === 3 && quote && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quote Summary</h2>
            
            <div className="card p-6">
              <div className="space-y-4">
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
                  <span className="text-xl font-bold text-primary-600">
                    {formatPrice(quote.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="card p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {formData.funeralDate} at {formData.funeralTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card p-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{formData.cemeteryName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              className="btn btn-secondary"
              onClick={() => setStep(2)}
            >
              Back
            </button>
            <button
              className="btn btn-primary"
              onClick={handleBookingSubmit}
              disabled={loading}
            >
              {loading ? 'Creating Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
