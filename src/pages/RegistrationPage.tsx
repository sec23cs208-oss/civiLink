import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, DollarSign, GraduationCap, CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    pincode: '',
    district: '',
    incomeGroup: '',
    caste: '',
    education: '',
    aadhaar: '',
    pan: ''
  });

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Location & Income', icon: MapPin },
    { number: 3, title: 'Education & ID', icon: GraduationCap },
    { number: 4, title: 'Verification', icon: Shield }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      ...formData,
      age: parseInt(formData.age),
      isRegistered: true
    };
    setUserData(userData);
    navigate('/schemes');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Age"
                  min="1"
                  max="120"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter PIN Code"
                  pattern="[0-9]{6}"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter District"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Income Group *</label>
              <select
                name="incomeGroup"
                value={formData.incomeGroup}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select Income Group</option>
                <option value="bpl">Below Poverty Line (BPL)</option>
                <option value="lmig">Lower Middle Income Group</option>
                <option value="mig">Middle Income Group</option>
                <option value="hmig">Higher Middle Income Group</option>
                <option value="hig">High Income Group</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caste/Community (Optional)</label>
              <select
                name="caste"
                value={formData.caste}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Category</option>
                <option value="general">General</option>
                <option value="sc">Scheduled Caste (SC)</option>
                <option value="st">Scheduled Tribe (ST)</option>
                <option value="obc">Other Backward Class (OBC)</option>
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Educational Background *</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select Education Level</option>
                <option value="no-formal">No Formal Education</option>
                <option value="primary">Primary School</option>
                <option value="secondary">Secondary School</option>
                <option value="higher-secondary">Higher Secondary</option>
                <option value="diploma">Diploma</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="doctorate">Doctorate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number *</label>
              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter 12-digit Aadhaar Number"
                pattern="[0-9]{12}"
                maxLength={12}
                required
              />
              <p className="text-sm text-gray-500 mt-1">Used solely for eligibility verification</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number (Optional)</label>
              <input
                type="text"
                name="pan"
                value={formData.pan}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter PAN Number"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                maxLength={10}
                style={{ textTransform: 'uppercase' }}
              />
              <p className="text-sm text-gray-500 mt-1">For scheme linkage and benefits</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center py-8">
            <CheckCircle className="h-20 w-20 text-emerald-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Verification Complete</h3>
            <p className="text-gray-600 mb-8">
              Your information has been verified and you're ready to access personalized government schemes.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-blue-900 mb-2">Data Security Notice</h4>
              <p className="text-blue-800 text-sm">
                Your personal information is encrypted and used only for scheme eligibility verification. 
                We comply with all data protection regulations.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Citizen Registration</h1>
          <p className="text-xl text-gray-600">
            Secure verification process to access personalized government schemes
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep >= step.number;
              const isCurrent = currentStep === step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-blue-200' : ''}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-3 mr-8 hidden sm:block">
                    <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-blue-800' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${isActive ? 'bg-blue-600' : 'bg-gray-300'} transition-all duration-200`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {renderStep()}
            
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 ml-auto"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-lg transition-all duration-200 ml-auto"
                >
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;