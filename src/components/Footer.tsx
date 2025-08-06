import React from 'react';
import { Scale, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-2 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">CIVILINK</h2>
                <p className="text-gray-400 text-sm">Citizen Welfare Integration Platform</p>
              </div>
            </div>
            <p className="text-gray-300 max-w-md">
              Empowering citizens through transparent access to government welfare schemes, 
              AI-powered legal guidance, and comprehensive legal education for career development.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/register" className="text-gray-300 hover:text-blue-400 transition-colors">Register</a></li>
              <li><a href="/schemes" className="text-gray-300 hover:text-blue-400 transition-colors">Government Schemes</a></li>
              <li><a href="/legal-counsel" className="text-gray-300 hover:text-blue-400 transition-colors">Legal Counsel</a></li>
              <li><a href="/education" className="text-gray-300 hover:text-blue-400 transition-colors">Legal Education</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@civilink.gov.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Ministry of Electronics & IT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 CIVILINK. A Government of India Initiative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;