import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

interface AgeVerificationProps {
  onVerified: () => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerified }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isVerified = Cookies.get('age-verified');
    if (!isVerified) {
      setIsVisible(true);
    } else {
      onVerified();
    }
  }, [onVerified]);

  const handleYes = () => {
    Cookies.set('age-verified', 'true', { expires: 1 }); // 24 hours
    setIsVisible(false);
    onVerified();
  };

  const handleNo = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-amber-900 to-amber-950 p-8 rounded-2xl shadow-2xl max-w-md mx-4 border border-amber-700"
      >
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-amber-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Age Verification Required</h1>
          </div>
          
          <p className="text-amber-100 mb-8 leading-relaxed">
            You must be <span className="font-bold text-white">18 years or older</span> to enter Mahlako Wa Molo. 
            <br />
            <span className="text-red-400 font-semibold">Alcohol Not for Persons Under 18.</span>
          </p>

          <div className="space-y-3">
            <button
              onClick={handleYes}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              I am 18 or older - Enter Site
            </button>
            
            <button
              onClick={handleNo}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-4 px-6 rounded-lg transition-all duration-200"
            >
              I am under 18 - Exit
            </button>
          </div>

          <p className="text-xs text-amber-200 mt-6 opacity-75">
            By entering this site, you confirm that you are of legal drinking age in your location.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AgeVerification;
