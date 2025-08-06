import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Search, Filter, ExternalLink, CheckCircle, DollarSign, Calendar, Users } from 'lucide-react';
import { getSchemeFavorites, saveSchemeFavorites } from '../utils/localStorage';

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string;
  category: string;
  applicationDeadline?: string;
  estimatedBenefit: string;
  applicants: number;
  isEligible: boolean;
}

const SchemesPage = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [eligibleSchemes, setEligibleSchemes] = useState<Scheme[]>([]);
  const [allSchemes, setAllSchemes] = useState<Scheme[]>([]);
  const [favoriteSchemes, setFavoriteSchemes] = useState<string[]>(getSchemeFavorites());

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    saveSchemeFavorites(favoriteSchemes);
  }, [favoriteSchemes]);

  const toggleFavorite = (schemeId: string) => {
    setFavoriteSchemes(prev => 
      prev.includes(schemeId) 
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  useEffect(() => {
    if (!userData?.isRegistered) {
      navigate('/register');
      return;
    }

    // Mock schemes data - in real implementation, this would be fetched from API
    const mockSchemes: Scheme[] = [
      {
        id: '1',
        name: 'PM-KISAN (PM Kisan Samman Nidhi)',
        description: 'Income support scheme for small and marginal farmers',
        eligibility: ['farmers', 'landholders', 'rural'],
        benefits: '₹6,000 per year in three installments',
        category: 'Agriculture',
        applicationDeadline: '2025-03-31',
        estimatedBenefit: '₹6,000',
        applicants: 120000000,
        isEligible: checkEligibility(['farmers', 'rural'], userData)
      },
      {
        id: '2',
        name: 'Ayushman Bharat - PMJAY',
        description: 'Health insurance scheme for economically vulnerable families',
        eligibility: ['bpl', 'lmig'],
        benefits: 'Health insurance cover up to ₹5 lakhs per family per year',
        category: 'Healthcare',
        estimatedBenefit: '₹5,00,000',
        applicants: 50000000,
        isEligible: checkEligibility(['bpl', 'lmig'], userData)
      },
      {
        id: '3',
        name: 'National Scholarship Portal',
        description: 'Scholarships for students from various backgrounds',
        eligibility: ['student', 'sc', 'st', 'obc'],
        benefits: 'Educational scholarships and fee reimbursement',
        category: 'Education',
        applicationDeadline: '2025-02-28',
        estimatedBenefit: '₹25,000',
        applicants: 8500000,
        isEligible: checkEligibility(['student', userData.caste], userData)
      },
      {
        id: '4',
        name: 'Pradhan Mantri Awaas Yojana',
        description: 'Housing for All scheme providing affordable housing',
        eligibility: ['bpl', 'lmig', 'mig'],
        benefits: 'Subsidized housing loans and direct assistance',
        category: 'Housing',
        estimatedBenefit: '₹2,50,000',
        applicants: 12000000,
        isEligible: checkEligibility(['bpl', 'lmig', 'mig'], userData)
      },
      {
        id: '5',
        name: 'Skill India Mission',
        description: 'Skill development and training programs for youth',
        eligibility: ['youth', 'unemployed'],
        benefits: 'Free skill training and certification',
        category: 'Employment',
        estimatedBenefit: '₹10,000',
        applicants: 15000000,
        isEligible: userData.age <= 35
      }
    ];

    setAllSchemes(mockSchemes);
    setEligibleSchemes(mockSchemes.filter(scheme => scheme.isEligible));
  }, [userData, navigate]);

  function checkEligibility(requirements: string[], userData: any): boolean {
    if (!userData) return false;
    
    return requirements.some(req => {
      switch (req) {
        case 'bpl':
        case 'lmig':
        case 'mig':
        case 'hmig':
        case 'hig':
          return userData.incomeGroup === req;
        case 'sc':
        case 'st':
        case 'obc':
          return userData.caste === req;
        case 'youth':
          return userData.age <= 35;
        case 'student':
          return userData.age <= 25;
        default:
          return false;
      }
    });
  }

  const categories = ['all', 'Agriculture', 'Healthcare', 'Education', 'Housing', 'Employment'];

  const filteredSchemes = (selectedCategory === 'all' ? eligibleSchemes : eligibleSchemes.filter(scheme => scheme.category === selectedCategory))
    .filter(scheme => scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     scheme.description.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Register First</h2>
          <button 
            onClick={() => navigate('/register')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Eligible Government Schemes
          </h1>
          <p className="text-xl text-gray-600">
            Welcome, {userData.name}! Here are the schemes personalized for your profile.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <CheckCircle className="h-10 w-10 text-emerald-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{eligibleSchemes.length}</p>
                <p className="text-gray-600">Eligible Schemes</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <DollarSign className="h-10 w-10 text-blue-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  ₹{eligibleSchemes.reduce((sum, scheme) => sum + parseInt(scheme.estimatedBenefit.replace(/[₹,]/g, '')), 0).toLocaleString()}
                </p>
                <p className="text-gray-600">Total Potential Benefits</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Calendar className="h-10 w-10 text-amber-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {eligibleSchemes.filter(s => s.applicationDeadline).length}
                </p>
                <p className="text-gray-600">With Deadlines</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {scheme.name}
                    </h3>
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                      {scheme.category}
                    </span>
                  </div>
                  <CheckCircle className="h-6 w-6 text-emerald-500" />
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{scheme.description}</p>
                
                <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">Benefits:</h4>
                  <p className="text-emerald-700">{scheme.benefits}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{(scheme.applicants / 1000000).toFixed(1)}M applicants</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>Up to {scheme.estimatedBenefit}</span>
                  </div>
                </div>
                
                {scheme.applicationDeadline && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-amber-600 mr-2" />
                      <span className="text-amber-800 text-sm font-medium">
                        Application Deadline: {new Date(scheme.applicationDeadline).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>
                )}
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                  Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No schemes found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find relevant schemes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemesPage;