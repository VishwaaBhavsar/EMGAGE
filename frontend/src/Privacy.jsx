import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    whoCanMessage: 'anyone',
    showBirthday: false,
    emailNotifications: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleProfileVisibility = (value) => {
    setSettings(prev => ({
      ...prev,
      profileVisibility: value
    }));
  };

  const handleWhoCanMessage = (value) => {
    setSettings(prev => ({
      ...prev,
      whoCanMessage: value
    }));
  };

  const ToggleSwitch = ({ enabled, onToggle }) => (
    <div 
      className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-gray-300'
      }`}
      onClick={onToggle}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </div>
  );

  const RadioOption = ({ name, value, checked, onChange, label }) => (
    <div className="flex items-center py-2">
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <label htmlFor={`${name}-${value}`} className="ml-3 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );

  const SettingSection = ({ title, description, children }) => (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="mb-3">
        <h3 className="text-base font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
      {children}
    </div>
  );

  const ToggleSection = ({ title, description, enabled, onToggle }) => (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <h3 className="text-base font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
        <ToggleSwitch enabled={enabled} onToggle={onToggle} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 rounded-t-lg">
          <div className="flex items-center px-4 py-3">
            <Link to='/profile'>
            <ChevronLeft className="w-6 h-6 text-gray-600 mr-3" />
            </Link>
            <h1 className="text-lg font-medium text-blue-600">Privacy</h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-lg shadow-sm">
          <div className="px-4">
            <SettingSection
              title="Profile Visibility"
              description="Control who can view your profile information."
            >
              <div className="space-y-1">
                <RadioOption
                  name="profileVisibility"
                  value="public"
                  checked={settings.profileVisibility === 'public'}
                  onChange={handleProfileVisibility}
                  label="Public (Visible to all users)"
                />
                <RadioOption
                  name="profileVisibility"
                  value="members"
                  checked={settings.profileVisibility === 'members'}
                  onChange={handleProfileVisibility}
                  label="Members Only (Visible only within the organization)"
                />
                <RadioOption
                  name="profileVisibility"
                  value="private"
                  checked={settings.profileVisibility === 'private'}
                  onChange={handleProfileVisibility}
                  label="Private (Visible only to you)"
                />
              </div>
            </SettingSection>

            <SettingSection
              title="Who Can Message Me"
              description="Decide who can start a conversation with you."
            >
              <div className="space-y-1">
                <RadioOption
                  name="whoCanMessage"
                  value="anyone"
                  checked={settings.whoCanMessage === 'anyone'}
                  onChange={handleWhoCanMessage}
                  label="Anyone"
                />
                <RadioOption
                  name="whoCanMessage"
                  value="connections"
                  checked={settings.whoCanMessage === 'connections'}
                  onChange={handleWhoCanMessage}
                  label="Only My Connections"
                />
                <RadioOption
                  name="whoCanMessage"
                  value="noone"
                  checked={settings.whoCanMessage === 'noone'}
                  onChange={handleWhoCanMessage}
                  label="No One"
                />
              </div>
            </SettingSection>

            <ToggleSection
              title="Show My Birthday"
              description="Allow others to see and celebrate your birthday."
              enabled={settings.showBirthday}
              onToggle={() => toggleSetting('showBirthday')}
            />

            <ToggleSection
              title="Receive Email Notifications"
              description="Get important updates and highlights via email."
              enabled={settings.emailNotifications}
              onToggle={() => toggleSetting('emailNotifications')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;