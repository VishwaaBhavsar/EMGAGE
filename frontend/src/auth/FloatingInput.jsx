import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingInput = ({ type, name, label, value, onChange, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value.length > 0 ? true : false);

  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        className="peer h-14 w-full border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-800 dark:text-white rounded-lg px-4 pt-4 pb-1 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors"
        placeholder={label}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
      />
      <motion.label
        htmlFor={name}
        className="absolute left-4 text-slate-600 dark:text-slate-400 text-sm transition-all pointer-events-none"
        animate={{
          top: isFocused ? '0.5rem' : value ? '0.5rem' : '1rem',
          fontSize: isFocused ? '0.75rem' : value ? '0.75rem' : '1rem',
          color: isFocused 
            ? 'rgb(37, 99, 235)' 
            : 'rgb(100, 116, 139)'
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
    </div>
  );
};

export default FloatingInput;