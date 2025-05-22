import React from 'react';
import { Check, ArrowLeft, User, Mail, Phone, MapPin, FileText } from 'lucide-react';

const SuccessPage = ({ data, onBack }) => {
  const InfoCard = ({ icon: Icon, title, children }) => (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
      <div className="flex items-center mb-3 sm:mb-4">
        {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mr-2 sm:mr-3" />}
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {children}
      </div>
    </div>
  );

  const InfoItem = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:items-center">
      <span className="font-medium text-gray-700 text-sm sm:text-base sm:w-32 sm:flex-shrink-0">
        {label}:
      </span>
      <span className="text-gray-900 text-sm sm:text-base sm:ml-2 break-all">
        {value}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 sm:px-8 py-6 sm:py-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Registration Successful!
              </h1>
              <p className="text-green-100 text-sm sm:text-base">
                Your registration has been completed successfully. Here are your details:
              </p>
            </div>
          </div>

          <div className="px-4 sm:px-8 py-6 sm:py-8">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <InfoCard icon={User} title="Personal Information">
                <InfoItem label="First Name" value={data.firstName} />
                <InfoItem label="Last Name" value={data.lastName} />
                <InfoItem label="Username" value={data.username} />
              </InfoCard>

              <InfoCard icon={Mail} title="Contact Information">
                <InfoItem label="Email" value={data.email} />
                <InfoItem 
                  label="Phone" 
                  value={`${data.countryCode} ${data.phoneNumber}`} 
                />
              </InfoCard>

              <InfoCard icon={MapPin} title="Location">
                <InfoItem label="Country" value={data.country} />
                <InfoItem label="City" value={data.city} />
              </InfoCard>

              <InfoCard icon={FileText} title="Documents">
                <InfoItem label="PAN Number" value={data.panNumber.toUpperCase()} />
                <InfoItem label="Aadhar Number" value={data.aadharNumber} />
              </InfoCard>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-center">
              <button
                onClick={onBack}
                className="flex items-center justify-center px-6 py-3 sm:py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-md font-medium transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Back to Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;