import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Calendar, 
  Package, 
  FileText, 
  Clock, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Bookings',
      value: '12',
      change: '+2 from last month',
      icon: Calendar,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Active Bookings',
      value: '3',
      change: 'This week',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Pending Payments',
      value: 'R 2,450',
      change: '2 bookings',
      icon: DollarSign,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      label: 'Total Spent',
      value: 'R 18,750',
      change: '+15% from last month',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const recentBookings = [
    {
      id: 'SFS123',
      date: '2024-04-20',
      status: 'confirmed',
      amount: 'R 4,500',
      package: 'Professional Setup'
    },
    {
      id: 'SFS124',
      date: '2024-04-25',
      status: 'pending',
      amount: 'R 8,450',
      package: 'VIP Setup'
    },
    {
      id: 'SFS125',
      date: '2024-04-28',
      status: 'confirmed',
      amount: 'R 2,500',
      package: 'Basic Setup'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const quickActions = [
    {
      title: 'New Booking',
      description: 'Create a new equipment booking',
      icon: Calendar,
      link: '/booking',
      color: 'bg-primary-600 hover:bg-primary-700'
    },
    {
      title: 'View Equipment',
      description: 'Browse available equipment',
      icon: Package,
      link: '/equipment',
      color: 'bg-secondary-600 hover:bg-secondary-700'
    },
    {
      title: 'Get Quote',
      description: 'Calculate costs for your needs',
      icon: FileText,
      link: '/quote',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Booking History',
      description: 'View past and upcoming bookings',
      icon: Clock,
      link: '/bookings',
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your funeral equipment bookings and activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className={`card p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 ${action.color.replace('hover:', 'border-l-').replace('bg-', 'border-l-')}`}
              >
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.package}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <Link
                to="/bookings"
                className="text-primary-600 hover:text-primary-500 text-sm font-medium"
              >
                View all bookings →
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="card">
            <div className="p-6">
              <div className="space-y-4">
                {recentBookings.filter(b => b.status === 'confirmed').map((booking, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Booking {booking.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        {booking.date} • {booking.package}
                      </p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {booking.amount}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
