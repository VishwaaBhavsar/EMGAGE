
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users, Award, Shield, TrendingUp } from 'lucide-react';
import AnimatedBackground from './bg/AnimatedBackground';
import ThemeToggle from './ThemeToggle.jsx';

const Layout = ({ children }) => {
  useEffect(() => {
    // Set document title and meta tags
    document.title = 'HR Peers | Connect with HR Professionals';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'HR Peers - Professional networking platform for HR professionals');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'HR Peers - Professional networking platform for HR professionals';
      document.head.appendChild(meta);
    }
    
    // Set theme color
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', '#2563eb');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#2563eb';
      document.head.appendChild(meta);
    }
    
    // Set viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    }
    
    // Add Google Fonts
    const existingFont = document.querySelector('link[href*="fonts.googleapis.com"]');
    if (!existingFont) {
      // Add preconnect links
      const preconnect1 = document.createElement('link');
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect1);
      
      const preconnect2 = document.createElement('link');
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect2);
      
      // Add font link
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }
    
    // Apply Inter font family to body
    document.body.style.fontFamily = 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif';
    
  }, []);

  const features = [
    {
      icon: Users,
      title: "Connect with Peers",
      description: "Network with HR professionals worldwide"
    },
    {
      icon: Award,
      title: "Best Practices",
      description: "Learn from industry-leading strategies"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected and private"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Advance your HR career with confidence"
    }
  ];

  return (
    <div className="min-h-screen w-full overflow-hidden flex">
      <AnimatedBackground />
      <ThemeToggle />
      
      {/* Left Info Panel */}
      <motion.div 
        className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative z-10 flex-col justify-center p-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <motion.div 
          className="flex items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Rocket className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          <span className="ml-3 text-2xl font-bold text-slate-800 dark:text-white">HR Peers</span>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl xl:text-5xl font-bold text-slate-800 dark:text-white mb-6">
              Connect with HR
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Professionals
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Join the premier networking platform for HR professionals. Share insights, 
              learn best practices, and grow your career in human resources.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 dark:bg-slate-800/20 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Logo for small screens */}
      <motion.div 
        className="lg:hidden absolute top-8 left-8 z-50 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <span className="ml-2 text-xl font-bold text-slate-800 dark:text-white">HR Peers</span>
      </motion.div>
      
      {/* Right Content Area */}
      <div className="flex-1 lg:w-1/2 xl:w-3/5 flex items-center justify-center p-6 relative z-10">
        {children}
      </div>
      
      {/* Footer */}
      <div className="absolute -bottom-60   w-full text-center text-xs text-slate-600 dark:text-slate-400 z-10">
        © {new Date().getFullYear()} HR Peers. All rights reserved.
      </div>
    </div>
  );
};

export default Layout;