import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { countries, countryCodes } from '../data/countries';
import { validateField } from '../utils/validation';

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        country: value,
        city: ''
      }));
    }

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const getCitiesForCountry = () => {
    const country = countries.find(c => c.name === formData.country);
    return country ? country.cities : [];
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'city' || formData.country) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const isFormValid = () => {
    const currentErrors = validateAllFields();
    return Object.keys(currentErrors).length === 0 &&
      Object.values(formData).every(value => value.toString().trim() !== '');
  };

  const handleSubmit = () => {
    const newErrors = validateAllFields();

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-8 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">
              Registration Form
            </h1>
            <p className="text-blue-100 text-center mt-2 text-sm sm:text-base">
              Please fill in all the required information
            </p>
          </div>

          <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
                Personal Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input type="text" name="username" value={formData.username} onChange={handleInputChange}
                  className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter username"
                />
                {errors.username && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 sm:py-3 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
                Contact Details
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="px-2 sm:px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base min-w-0 flex-shrink-0"
                  >
                    {countryCodes.map(cc => (
                      <option key={cc.code} value={cc.code}>
                        {cc.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`flex-1 min-w-0 px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="Enter phone number"
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phoneNumber}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.country}
                    className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.city ? 'border-red-500' : 'border-gray-300'
                      } ${!formData.country ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  >
                    <option value="">Select City</option>
                    {getCitiesForCountry().map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.city}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 border-b pb-2">
                Document Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.panNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="ABCDE1234F"
                    maxLength="10"
                  />
                  {errors.panNumber && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.panNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Aadhar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 sm:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm sm:text-base ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="123456789012"
                    maxLength="12"
                  />
                  {errors.aadharNumber && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.aadharNumber}</p>}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Document Format Guidelines:</h3>
                <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                  <li>• PAN Number: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)</li>
                  <li>• Aadhar Number: 12 digits (e.g., 123456789012)</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 sm:pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`w-full py-3 sm:py-4 px-4 rounded-md font-medium transition-colors text-sm sm:text-base ${isFormValid()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Submit Registration
              </button>
            </div>

            <div className="text-center text-xs sm:text-sm text-gray-500">
              <span className="text-red-500">*</span> Required fields
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;