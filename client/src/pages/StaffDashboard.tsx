import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Calendar, 
  CheckCircle, 
  Truck, 
  Clock,
  MapPin,
  Phone,
  Camera,
  Users,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Task {
  id: string;
  bookingId: string;
  clientName: string;
  cemeteryName: string;
  cemeteryAddress: string;
  funeralDate: string;
  funeralTime: string;
  status: 'pending' | 'picked-up' | 'delivered' | 'setup' | 'collected';
  equipment: Array<{
    name: string;
    quantity: number;
  }>;
  contactPerson: string;
  contactPhone: string;
  notes?: string;
}

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming'>('today');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // This would fetch tasks assigned to the current staff member
      const mockTasks: Task[] = [
        {
          id: '1',
          bookingId: 'SFS123',
          clientName: 'John Doe Funeral Home',
          cemeteryName: 'Westpark Cemetery',
          cemeteryAddress: '123 Beyers Naudé Drive, Johannesburg',
          funeralDate: '2024-04-20',
          funeralTime: '10:00',
          status: 'pending',
          equipment: [
            { name: 'Professional Tent', quantity: 1 },
            { name: 'Standard Chairs', quantity: 100 }
          ],
          contactPerson: 'John Smith',
          contactPhone: '+27 82 123 4567',
          notes: 'Setup near the main entrance'
        },
        {
          id: '2',
          bookingId: 'SFS124',
          clientName: 'Sacred Heart Funeral',
          cemeteryName: 'Avalon Cemetery',
          cemeteryAddress: '456 Sauer Street, Johannesburg',
          funeralDate: '2024-04-20',
          funeralTime: '14:00',
          status: 'delivered',
          equipment: [
            { name: 'VIP Tent', quantity: 1 },
            { name: 'Premium Chairs', quantity: 200 },
            { name: 'Artificial Grass', quantity: 50 }
          ],
          contactPerson: 'Mary Johnson',
          contactPhone: '+27 83 987 6543'
        }
      ];
      setTasks(mockTasks);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      // This would update the task status in the backend
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
      toast.success('Task status updated successfully!');
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'picked-up':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-purple-100 text-purple-800';
      case 'setup':
        return 'bg-indigo-100 text-indigo-800';
      case 'collected':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'picked-up':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <MapPin className="w-4 h-4" />;
      case 'setup':
        return <CheckCircle className="w-4 h-4" />;
      case 'collected':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.funeralDate).toDateString();
    
    switch (filter) {
      case 'today':
        return taskDate === today;
      case 'upcoming':
        return new Date(task.funeralDate) > new Date();
      default:
        return true;
    }
  });

  const handlePhotoUpload = (taskId: string) => {
    // This would open a file picker to upload photos
    toast.success('Photo upload feature coming soon!');
  };

  const handleCallContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const getDirections = (address: string) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your daily tasks and assignments
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
              <Clock className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tasks.filter(t => t.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
              <Truck className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tasks.filter(t => ['picked-up', 'delivered'].includes(t.status)).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Setup</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tasks.filter(t => t.status === 'setup').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {tasks.filter(t => t.status === 'collected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'All Tasks' },
            { key: 'today', label: "Today's Tasks" },
            { key: 'upcoming', label: 'Upcoming' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filter === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                {filteredTasks.length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="card p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {task.bookingId} - {task.clientName}
                </h3>
                <p className="text-gray-600">{task.cemeteryName}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {task.funeralDate} at {task.funeralTime}
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(task.status)}`}>
                {getStatusIcon(task.status)}
                <span className="ml-1">{task.status.replace('-', ' ')}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Equipment</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {task.equipment.map((item, index) => (
                    <li key={index}>• {item.quantity} x {item.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {task.contactPerson}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {task.contactPhone}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {task.cemeteryAddress}
                  </div>
                </div>
              </div>
            </div>

            {task.notes && (
              <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Notes:</strong> {task.notes}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {task.status === 'pending' && (
                <button
                  onClick={() => updateTaskStatus(task.id, 'picked-up')}
                  className="btn btn-primary"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Mark as Picked Up
                </button>
              )}

              {task.status === 'picked-up' && (
                <button
                  onClick={() => updateTaskStatus(task.id, 'delivered')}
                  className="btn btn-primary"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Mark as Delivered
                </button>
              )}

              {task.status === 'delivered' && (
                <button
                  onClick={() => updateTaskStatus(task.id, 'setup')}
                  className="btn btn-primary"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Setup Complete
                </button>
              )}

              {task.status === 'setup' && (
                <button
                  onClick={() => updateTaskStatus(task.id, 'collected')}
                  className="btn btn-primary"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Collected
                </button>
              )}

              <button
                onClick={() => handleCallContact(task.contactPhone)}
                className="btn btn-outline"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Contact
              </button>

              <button
                onClick={() => getDirections(task.cemeteryAddress)}
                className="btn btn-outline"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </button>

              <button
                onClick={() => handlePhotoUpload(task.id)}
                className="btn btn-outline"
              >
                <Camera className="w-4 h-4 mr-2" />
                Upload Photos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'today' ? "No tasks scheduled for today" : 
             filter === 'upcoming' ? "No upcoming tasks" : 
             "No tasks assigned to you"}
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
