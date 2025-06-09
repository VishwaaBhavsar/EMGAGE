
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
const ToggleSwitch = ({ enabled, onToggle }) => (
  <div
    onClick={onToggle}
    className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
      enabled ? "bg-blue-600" : "bg-gray-300"
    }`}
  >
    <div
      className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
        enabled
          ? "translate-x-5 bg-white border-2 border-blue-600"
          : "translate-x-0 bg-white"
      }`}
    ></div>
  </div>
);

const SettingItem = ({
  title,
  description,
  enabled,
  onToggle,
  hasToggle = true,
  icon,
}) => (
  <div className="flex items-center justify-between bg-white rounded-lg shadow-sm hover:shadow-md p-3 border border-blue-100 transition-all duration-300">
    <div className="flex items-center space-x-2 pr-2">
      <div>{icon}</div>
      <div>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
    </div>
    {hasToggle && <ToggleSwitch enabled={enabled} onToggle={onToggle} />}
  </div>
);

const NotificationsPage = () => {
  const [settings, setSettings] = useState({
    push: false,
    messages: false,
    events: true,
    birthdays: false,
    jobs: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6 md:p-8">

        <div className="flex flex-row ml-90 items-center">

         <Link to='/profile'>
          <ChevronLeft className="w-6 h-6 mb-4 text-gray-700 mr-3" />
        </Link>
      <h2 className="text-xl sm:text-2xl  font-bold text-gray-800 mb-5">
        🔔 Notification Settings
      </h2>
        </div>
      <div className="space-y-3 max-w-2xl mx-auto">
        <SettingItem
          title="Push Notifications"
          description="Turn notifications on or off for all activity in the app."
          enabled={settings.push}
          onToggle={() => toggleSetting("push")}
          icon={
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405C18.79 15.21 18 13.79 18 12V8a6 6 0 10-12 0v4c0 1.79-.79 3.21-1.595 3.595L3 17h5m4 0v1a3 3 0 006 0v-1"
              />
            </svg>
          }
        />
        <SettingItem
          title="New Messages"
          description="Get notifications when someone sends you a direct or group message."
          enabled={settings.messages}
          onToggle={() => toggleSetting("messages")}
          icon={
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
              />
            </svg>
          }
        />
        <SettingItem
          title="Event Reminders"
          description="Receive reminders for upcoming HR events you’ve RSVP'd to."
          enabled={settings.events}
          onToggle={() => toggleSetting("events")}
          icon={
            <svg
              className="w-5 h-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <SettingItem
          title="Birthday & Work Anniversary Alerts"
          description="Stay updated on team birthdays and work anniversaries."
          enabled={settings.birthdays}
          onToggle={() => toggleSetting("birthdays")}
          icon={
            <svg
              className="w-5 h-5 text-pink-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c1.104 0 2-.672 2-1.5S13.104 5 12 5s-2 .672-2 1.5S10.896 8 12 8zm-2 3h4v6h-4v-6z"
              />
            </svg>
          }
        />
        <SettingItem
          title="Job Alerts"
          description="Be the first to know when new HR jobs match your profile."
          enabled={settings.jobs}
          onToggle={() => toggleSetting("jobs")}
          icon={
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-9 4h4"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default NotificationsPage;




