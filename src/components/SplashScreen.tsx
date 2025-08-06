import React, { useEffect, useState } from 'react';
import { Scale, Users, BookOpen, Shield } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const features = [
    { icon: Users, text: 'Government Schemes', color: 'from-blue-500 to-blue-600' },
    { icon: Scale, text: 'AI Legal Counsel', color: 'from-emerald-500 to-emerald-600' },
    { icon: BookOpen, text: 'Legal Education', color: 'from-amber-500 to-amber-600' },
    { icon: Shield, text: 'Citizen Empowerment', color: 'from-purple-500 to-purple-600' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < features.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Start fade out animation
        setIsVisible(false);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentStep, features.length, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-800 flex items-center justify-center transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center text-white">
        {/* Logo Animation */}
        <div className="mb-8 animate-pulse">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-full mx-auto w-24 h-24 flex items-center justify-center transform animate-bounce">
            <Scale className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 animate-fade-in">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            CIVILINK
          </span>
        </h1>
        
        <p className="text-xl text-blue-100 mb-12 animate-fade-in-delay">
          Citizen Welfare Integration Platform
        </p>

        {/* Feature Icons */}
        <div className="flex justify-center space-x-8 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index <= currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div
                key={index}
                className={`transition-all duration-500 transform ${
                  isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-30'
                } ${isCurrent ? 'animate-pulse' : ''}`}
              >
                <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-full w-16 h-16 flex items-center justify-center`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <p className="text-sm mt-2 text-blue-100">{feature.text}</p>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto bg-white bg-opacity-20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / features.length) * 100}%` }}
          ></div>
        </div>

        {/* Loading Text */}
        <p className="text-blue-100 mt-4 animate-pulse">
          Initializing platform...
        </p>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-400 rounded-full opacity-20 animate-float-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-400 rounded-full opacity-10 animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-purple-400 rounded-full opacity-15 animate-float-reverse"></div>
      </div>
    </div>
  );
};

export default SplashScreen;