import React, { useState } from 'react';
import { BookOpen, AlertTriangle, Shield, Briefcase, GraduationCap, CheckCircle, XCircle, Info } from 'lucide-react';

interface LegalGuide {
  id: string;
  title: string;
  description: string;
  category: 'government' | 'it' | 'general';
  severity: 'high' | 'medium' | 'low';
  examples: string[];
  prevention: string[];
  consequences: string[];
}

const EducationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'government' | 'it' | 'general'>('all');
  const [selectedGuide, setSelectedGuide] = useState<LegalGuide | null>(null);

  const legalGuides: LegalGuide[] = [
    {
      id: '1',
      title: 'Criminal Background Verification',
      description: 'Understanding how criminal records affect government job eligibility',
      category: 'government',
      severity: 'high',
      examples: [
        'Any conviction under Indian Penal Code',
        'Cases involving moral turpitude',
        'Economic offenses like fraud or embezzlement',
        'Violent crimes and assault cases'
      ],
      prevention: [
        'Avoid involvement in any illegal activities',
        'Stay away from protests that may turn violent',
        'Never accept bribes or engage in corrupt practices',
        'Maintain clean financial records'
      ],
      consequences: [
        'Permanent disqualification from government jobs',
        'Cancellation of existing employment',
        'Loss of pension and benefits',
        'Public records affecting future opportunities'
      ]
    },
    {
      id: '2',
      title: 'Cyber Crime and Digital Violations',
      description: 'Digital offenses that can disqualify IT sector candidates',
      category: 'it',
      severity: 'high',
      examples: [
        'Hacking or unauthorized access to systems',
        'Cyberbullying and online harassment',
        'Copyright infringement and piracy',
        'Data theft and privacy violations',
        'Creating or spreading malware'
      ],
      prevention: [
        'Use only licensed software and content',
        'Respect digital privacy and data protection laws',
        'Follow ethical hacking practices only in authorized environments',
        'Report security vulnerabilities responsibly',
        'Maintain professional online presence'
      ],
      consequences: [
        'Industry blacklisting',
        'Criminal charges under IT Act',
        'Loss of professional certifications',
        'Difficulty obtaining security clearances'
      ]
    },
    {
      id: '3',
      title: 'Academic Integrity Violations',
      description: 'Educational misconduct affecting career prospects',
      category: 'general',
      severity: 'medium',
      examples: [
        'Examination malpractice and cheating',
        'Plagiarism in academic work',
        'Fake degree certificates',
        'Impersonation in examinations',
        'Ragging and harassment in educational institutions'
      ],
      prevention: [
        'Maintain academic honesty in all work',
        'Properly cite all sources and references',
        'Avoid purchasing or using fake certificates',
        'Report any misconduct by others',
        'Follow institutional codes of conduct'
      ],
      consequences: [
        'Cancellation of degrees and certifications',
        'Disqualification from competitive exams',
        'Legal action for document fraud',
        'Permanent academic record damage'
      ]
    },
    {
      id: '4',
      title: 'Financial and Tax Violations',
      description: 'Economic offenses that affect employment eligibility',
      category: 'government',
      severity: 'medium',
      examples: [
        'Tax evasion and non-payment of dues',
        'Money laundering activities',
        'Loan defaults and financial fraud',
        'Benami property transactions',
        'GST violations and fake billing'
      ],
      prevention: [
        'File tax returns accurately and on time',
        'Maintain proper financial documentation',
        'Avoid cash transactions above legal limits',
        'Ensure all business activities are legitimate',
        'Consult tax professionals for complex matters'
      ],
      consequences: [
        'Income tax department action',
        'Disqualification from government positions',
        'Asset seizure and penalties',
        'Criminal prosecution in severe cases'
      ]
    },
    {
      id: '5',
      title: 'Social Media and Online Conduct',
      description: 'Digital behavior that can impact professional reputation',
      category: 'it',
      severity: 'low',
      examples: [
        'Posting inflammatory or hate content',
        'Sharing fake news and misinformation',
        'Cyberbullying and online trolling',
        'Inappropriate content sharing',
        'Violation of platform terms of service'
      ],
      prevention: [
        'Think before posting on social media',
        'Verify information before sharing',
        'Maintain professional online presence',
        'Use privacy settings appropriately',
        'Report harassment and abuse'
      ],
      consequences: [
        'Professional reputation damage',
        'Employer background check issues',
        'Legal action for defamation',
        'Social media platform bans'
      ]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: BookOpen },
    { value: 'government', label: 'Government Jobs', icon: Shield },
    { value: 'it', label: 'IT Sector', icon: Briefcase },
    { value: 'general', label: 'General Career', icon: GraduationCap }
  ];

  const filteredGuides = selectedCategory === 'all' 
    ? legalGuides 
    : legalGuides.filter(guide => guide.category === selectedCategory);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-amber-600 bg-amber-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <XCircle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'low': return <Info className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Education Hub</h1>
          <p className="text-xl text-gray-600">
            Essential legal awareness for career development and compliance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Shield className="h-10 w-10 text-blue-500 mx-auto mb-3" />
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-gray-600">Legal Topics</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-3" />
            <p className="text-2xl font-bold text-gray-900">15</p>
            <p className="text-gray-600">Common Violations</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
            <p className="text-2xl font-bold text-gray-900">25</p>
            <p className="text-gray-600">Prevention Tips</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Briefcase className="h-10 w-10 text-purple-500 mx-auto mb-3" />
            <p className="text-2xl font-bold text-gray-900">100%</p>
            <p className="text-gray-600">Career Protection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value as any)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                        selectedCategory === category.value
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{category.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!selectedGuide ? (
              <div className="space-y-6">
                {filteredGuides.map((guide) => (
                  <div key={guide.id} className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                       onClick={() => setSelectedGuide(guide)}>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">{guide.description}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getSeverityColor(guide.severity)}`}>
                          {getSeverityIcon(guide.severity)}
                          <span className="capitalize">{guide.severity} Risk</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            {guide.category === 'government' && '🏛️ Government'}
                            {guide.category === 'it' && '💻 IT Sector'}
                            {guide.category === 'general' && '🎓 General'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {guide.examples.length} violations covered
                          </span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Learn More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedGuide.title}</h2>
                    <p className="text-gray-600">{selectedGuide.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedGuide(null)}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ← Back
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Common Violations */}
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                      <XCircle className="h-5 w-5 mr-2" />
                      Common Violations
                    </h3>
                    <ul className="space-y-2">
                      {selectedGuide.examples.map((example, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention Tips */}
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Prevention Tips
                    </h3>
                    <ul className="space-y-2">
                      {selectedGuide.prevention.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Consequences */}
                  <div>
                    <h3 className="text-lg font-semibold text-amber-700 mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Consequences
                    </h3>
                    <ul className="space-y-2">
                      {selectedGuide.consequences.map((consequence, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{consequence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">💡 Remember</h4>
                  <p className="text-blue-800">
                    Prevention is always better than cure. Stay informed about legal requirements 
                    in your field and maintain ethical practices throughout your career journey.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        {!selectedGuide && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Need Personalized Legal Guidance?</h3>
            <p className="text-blue-100 mb-6">
              Our AI Legal Counsel can provide specific advice for your situation with multilingual support.
            </p>
            <button 
              onClick={() => window.location.href = '/legal-counsel'}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get AI Legal Counsel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationPage;