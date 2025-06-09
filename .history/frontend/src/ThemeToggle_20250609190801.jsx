
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Check for system preference on component mount
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      console.log('Dark mode enabled - HTML classes:', document.documentElement.className);
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Light mode enabled - HTML classes:', document.documentElement.className);
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-8 right-8 z-50 p-3 rounded-full bg-white/10 dark:bg-slate-800/20 backdrop-blur-md border border-white/20 dark:border-slate-700/30 hover:bg-white/20 dark:hover:bg-slate-800/40 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-slate-100" />
        ) : (
          <Sun className="w-5 h-5 text-slate-800" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;