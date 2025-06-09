import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageCircle, 
  Bell, 
  User,
  Search,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const LinkedInNavigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
const navigate=useNavigate();
  const navItems = [
    { id: 'home', icon: Home, label: 'Home',path:'/dashboard' },
    { id: 'network', icon: Users, label: 'Events',path:'/events'},
    { id: 'jobs', icon: Briefcase, label: 'upload', path:'/add' },
    { id: 'messaging', icon: MessageCircle, label: 'Messaging',path:'/msg' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'profile', icon: User, label: 'Me' ,path:'/profile'}
  ];

  const handleTabClick = (tabId,path) => {
    setActiveTab(tabId);
    navigate(path);
    if (isMobile) {
      setShowMobileMenu(false);
    }
  };

  // Desktop Header
  const DesktopHeader = () => (
    <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Left section - Logo and Search */}
          <div className="flex items-center space-x-4">
            <img src="/in.jpg" className='h-10 w-10' alt="" />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-blue-50 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>

          {/* Right section - Navigation */}
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id,item.path)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded transition-colors ${
                    activeTab === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );

  // Mobile Header
  const MobileHeader = () => (
    <header className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-14 px-4">
        <a href='/dashboard' >
      <img src="/in.jpg" className='h-10 w-10' alt="" />
        </a>
        
        
        <div className="flex items-center space-x-4">
          <Search className="text-gray-600 w-6 h-6" />
          <MessageCircle className="text-gray-600 w-6 h-6" />
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-600"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {showMobileMenu && (
        <div className="absolute top-14 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <nav className="py-2">
            {navItems.slice(0, 4).map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id,item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                    activeTab === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );

  // Mobile Footer Navigation
  const MobileFooter = () => (
    <footer className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <nav className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id,item.path)}
              className={`flex flex-col items-center space-y-1 px-2 py-2 rounded transition-colors ${
                activeTab === item.id
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </footer>
  );

  // Content Area
  const ContentArea = () => (
    <main className={`${isMobile ? 'pt-1 pb-16' : 'pt-14'}  bg-gray-50`}>
     
    </main>
  );

  return (
    <div className="font-sans">
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
      <ContentArea />
      {isMobile && <MobileFooter />}
    </div>
  );
};

export default LinkedInNavigation;