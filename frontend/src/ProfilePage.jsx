import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { FaCog, FaBell, FaLock, FaHeart, FaQuestionCircle, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <div className="h-full w-full bg-blue-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4 bg-blue-200 shadow-md">
        <Link to="/dashboard">
          <ChevronLeft className="w-6 h-6 text-gray-700 mr-3" />
        </Link>
        <h1 className="z-500 top-0 sticky text-xl font-bold text-gray-800">My Profile</h1>
      </div>

      {/* Centered Scrollable Content */}
      <div className="flex-1 overflow-y-auto py-6 flex justify-center">
        <div className="w-full max-w-2xl px-4 flex flex-col items-center space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full transform transition hover:scale-[1.02] hover:shadow-xl duration-300">
            <div className="flex items-center">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                <span className="text-white text-4xl">👤</span>
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold">Tyler Rake</h2>
                <p className="text-gray-500">HR Manager</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full">Active</span>
                  <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-4 w-full">
            <MenuItem icon={<FaCog />} title="Account Settings" description="Manage your account settings" iconBg="bg-pink-500" path="/settings/account" />
            <MenuItem icon={<FaBell />} title="Notifications" description="Manage your notifications" iconBg="bg-blue-500" path="/profile/notifications" />
            <MenuItem icon={<FaLock />} title="Privacy & Security" description="Manage your privacy & security" iconBg="bg-green-500" path="/profile/privacy" />
            <MenuItem icon={<FaHeart />} title="App Preferences" description="Manage your app preferences" iconBg="bg-red-500" path="/settings/preferences" />
            <MenuItem icon={<FaQuestionCircle />} title="Support & Help" description="Manage your support & help" iconBg="bg-yellow-400" path="/help" />
            <MenuItem icon={<FaFileAlt />} title="Legal & Policy" description="Manage your legal & policy" iconBg="bg-purple-500" path="/profile/legal" />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 w-full">
            <StatCard number="156" label="Projects" />
            <StatCard number="89%" label="Completion" />
            <StatCard number="4.9" label="Rating" />
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, title, description, iconBg, path = '#' }) => (
  <Link to={path} className="block">
    <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 hover:shadow-lg transform transition hover:scale-[1.02] duration-300">
      <div className="flex items-center gap-4">
        <div className={`text-white p-3 rounded-xl ${iconBg}`}>
          {icon}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
      <div className="text-gray-400 text-xl">&gt;</div>
    </div>
  </Link>
);

const StatCard = ({ number, label }) => (
  <div className="bg-white rounded-2xl shadow-md p-4 text-center transform transition hover:scale-[1.05] hover:bg-blue-50 hover:shadow-lg duration-300">
    <p className="text-xl font-semibold">{number}</p>
    <p className="text-gray-500 text-sm">{label}</p>
  </div>
);

export default ProfilePage;
