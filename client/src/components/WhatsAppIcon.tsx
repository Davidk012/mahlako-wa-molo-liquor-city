import React from 'react';

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* WhatsApp Logo - Green background with white phone */}
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.844.503 3.568 1.378 5.062L2 22l4.938-1.378C8.432 21.497 10.156 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
        fill="#25D366"
      />
      <path
        d="M17.515 8.485c-.345-.345-1.05-.345-1.395 0l-5.12 5.12-2.51-2.51c-.345-.345-1.05-.345-1.395 0s-.345 1.05 0 1.395l3.207 3.207c.172.172.398.258.623.258.225 0 .451-.086.623-.258l5.567-5.567c.345-.345.345-1.05 0-1.395z"
        fill="white"
      />
      <path
        d="M8.25 15.75l-1.5 1.5c-.345.345-.345 1.05 0 1.395s1.05.345 1.395 0l1.5-1.5c.345-.345.345-1.05 0-1.395s-1.05-.345-1.395 0z"
        fill="white"
      />
    </svg>
  );
};

export default WhatsAppIcon;
