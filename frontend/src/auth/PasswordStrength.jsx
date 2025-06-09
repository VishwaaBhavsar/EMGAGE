import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PasswordStrength = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    calculateStrength(password);
  }, [password]);

  const calculateStrength = (password) => {
    let score = 0;
    
    if (password.length > 8) score += 1;
    if (password.length > 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    let strengthMessage = '';
    if (score <= 1) strengthMessage = 'Weak';
    else if (score <= 3) strengthMessage = 'Medium';
    else strengthMessage = 'Strong';
    
    setStrength(score);
    setMessage(strengthMessage);
  };

  const getColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="mt-1">
      <div className="flex h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${getColor()}`}
          initial={{ width: '0%' }}
          animate={`{ width: ${(strength / 5) * 100}% }`}
          transition={{ duration: 0.3 }}
        />
      </div>
      <motion.p 
        className={`text-xs mt-1 ${
          strength <= 1 ? 'text-red-500' : 
          strength <= 3 ? 'text-yellow-500' : 
          'text-green-500'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Password strength: {message}
      </motion.p>
    </div>
  );
};

export default PasswordStrength;