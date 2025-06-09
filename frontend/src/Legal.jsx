import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegalAndPolicy = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    console.log(`Navigating to ${section}`);
  };

  const PolicySection = ({ number, title, description, buttonText, onClick }) => (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="mb-3">
        <h3 className="text-base font-normal text-gray-900 mb-2">
          <span className="font-medium">{number}. {title}</span>
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{description}</p>
        <button
          onClick={() => onClick(title.toLowerCase().replace(/\s+/g, '-'))}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          {buttonText}
        </button>
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
            <h1 className="text-lg font-medium text-blue-600">Legal and Policy</h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-lg shadow-sm">
          <div className="px-4">
            <PolicySection
              number="1"
              title="Privacy Policy"
              description="Learn how we collect, use, and protect your personal data."
              buttonText="View Privacy Policy"
              onClick={handleSectionClick}
            />

            <PolicySection
              number="2"
              title="Terms and Conditions"
              description="Understand the rules and guidelines for using our app."
              buttonText="Read Terms and Conditions"
              onClick={handleSectionClick}
            />

            <PolicySection
              number="3"
              title="Data & Security"
              description="See how your information is securely stored and handled."
              buttonText="View Data Security Details"
              onClick={handleSectionClick}
            />

            <PolicySection
              number="4"
              title="User Rights"
              description="Find out how to access, update, or delete your data."
              buttonText="Manage My Data"
              onClick={handleSectionClick}
            />
          </div>
        </div>
      </div>

      {/* Selected Section Feedback */}
      {selectedSection && (
        <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-3 rounded-lg shadow-lg">
          <p className="text-sm text-center">
            Opening {selectedSection.replace(/-/g, ' ')}... (This would navigate in a real app)
          </p>
        </div>
      )}
    </div>
  );
};

export default LegalAndPolicy;