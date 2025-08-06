import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Scale, BookOpen, Shield, Globe, Heart } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Users,
      title: 'Government Schemes',
      description: 'Personalized matching of eligible welfare schemes based on your demographic and socioeconomic profile',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Scale,
      title: 'AI Legal Counsel',
      description: 'Smart legal guidance with multilingual voice support in Tamil, English, and regional languages',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: BookOpen,
      title: 'Legal Education',
      description: 'Career-focused legal awareness for youth, preventing disqualifying offenses and promoting compliance',
      color: 'from-amber-500 to-amber-600'
    }
  ];

  const stats = [
    { label: 'Government Schemes', value: '500+', icon: Shield },
    { label: 'Languages Supported', value: '12', icon: Globe },
    { label: 'Citizens Helped', value: '10K+', icon: Heart }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-400 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-400 rounded-full opacity-10 animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              CIVILINK
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Empowering citizens through transparent access to government welfare, 
            AI-powered legal guidance, and comprehensive legal education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/legal-counsel"
              className="inline-flex items-center px-8 py-4 bg-white bg-opacity-10 hover:bg-opacity-20 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 backdrop-blur-sm border border-white border-opacity-20"
            >
              AI Legal Counsel
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Citizen Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CIVILINK integrates multiple essential services to enhance your interaction 
              with government systems and legal frameworks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are already benefiting from transparent 
            government services and legal guidance
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Register Now <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;