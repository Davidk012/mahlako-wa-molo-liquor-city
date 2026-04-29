import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface StoreStatusProps {
  className?: string;
}

const StoreStatus: React.FC<StoreStatusProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const checkStoreStatus = () => {
      const now = new Date();
      
      // Convert to South African Standard Time (SAST - UTC+2)
      const sastTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Johannesburg"}));
      
      const day = sastTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = sastTime.getHours();
      
      // Format time
      const timeString = sastTime.toLocaleTimeString('en-ZA', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      setCurrentTime(timeString);
      
      // Check if store is open
      let open = false;
      
      if (day >= 1 && day <= 6) { // Monday to Saturday
        open = hours >= 9 && hours < 20; // 9:00 AM - 8:00 PM
      } else if (day === 0) { // Sunday
        open = hours >= 9 && hours < 17; // 9:00 AM - 5:00 PM
      }
      
      setIsOpen(open);
    };

    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium ${
        isOpen 
          ? 'bg-green-50 text-green-700 border border-green-200' 
          : 'bg-red-50 text-red-700 border border-red-200'
      }`}>
        <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
        <span>{isOpen ? 'Open' : 'Closed'}</span>
      </div>
      
      <div className="flex items-center space-x-1.5 text-gray-500 text-sm">
        <Clock className="w-3.5 h-3.5" />
        <span>{currentTime}</span>
      </div>
    </div>
  );
};

export default StoreStatus;
