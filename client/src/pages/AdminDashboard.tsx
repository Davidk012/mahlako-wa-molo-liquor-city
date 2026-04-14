import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Users, 
  Calendar, 
  Package, 
  DollarSign, 
  TrendingUp,
  Settings,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: 'Total Bookings',
      value: '156',
      change: '+12% from last month',
      icon: Calendar,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Active Users',
      value: '89',
      change: '+8 new this week',
      icon: Users,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Revenue (MTD)',
      value: 'R 124,500',
      change: '+18% from last month',
      icon: DollarSign,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      label: 'Equipment Utilization',
      value: '78%',
      change: '+5% from last week',
      icon: Package,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const recentBookings = [
    {
      id: 'SFS123',
      client: 'John Doe Funeral Home',
      date: '2024-04-20',
      status: 'confirmed',
      amount: 'R 4,500'
    },
    {
      id: 'SFS124',
      client: 'Sacred Heart Funeral',
      date: '2024-04-25',
      status: 'pending',
      amount: 'R 8,450'
    },
    {
      id: 'SFS125',
      client: 'Memorial Services',
      date: '2024-04-28',
      status: 'delivered',
      amount: 'R 2,500'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'Low stock on Premium Chairs (only 5 available)',
      time: '2 hours ago'
    },
    {
      type: 'info',
      message: 'New user registration: ABC Funeral Services',
      time: '4 hours ago'
    },
    {
      type: 'success',
      message: 'Payment received for booking SFS123',
      time: '6 hours ago'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Bookings',
      description: 'View and manage all bookings',
      icon: Calendar,
      link: '/admin/bookings',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Manage Users',
      description: 'Manage client and staff accounts',
      icon: Users,
      link: '/admin/users',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Equipment Inventory',
      description: 'Update equipment and stock levels',
      icon: Package,
      link: '/admin/equipment',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Financial Reports',
      description: 'View revenue and analytics',
      icon: TrendingUp,
      link: '/admin/reports',
      color: 'bg-yellow-600 hover:bg-yellow-700'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your funeral equipment booking system
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href={action.link}
                  className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </a>
              );
            })}
          </div>
        </div>

        {/* System Alerts */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs mt-1 opacity-75">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
          <a href="/admin/bookings" className="text-primary-600 hover:text-primary-500 text-sm font-medium">
            View all bookings →
          </a>
        </div>
        
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
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
                      {booking.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.date}
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
        </div>
      </div>

      {/* Settings Link */}
      <div className="text-center">
        <a
          href="/admin/settings"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Settings className="w-4 h-4 mr-2" />
          System Settings
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;
