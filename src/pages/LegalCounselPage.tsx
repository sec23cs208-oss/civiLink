import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, Bot, User, Languages } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const LegalCounselPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI Legal Counsel assistant. I can help you with legal guidance in Tamil, English, and other regional languages. You can type your questions or use voice input. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ta', name: 'Tamil', flag: '🏴󠁩󠁮󠁴󠁮󠁿' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', flag: '🏴󠁩󠁮󠁡󠁰󠁿' },
    { code: 'kn', name: 'Kannada', flag: '🏴󠁩󠁮󠁫󠁡󠁿' },
    { code: 'ml', name: 'Malayalam', flag: '🏴󠁩󠁮󠁫󠁬󠁿' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateLegalResponse = async (userQuery: string): Promise<string> => {
    // Mock AI response - in real implementation, this would call an AI service
    const responses: { [key: string]: string } = {
      'property': 'For property disputes, the Transfer of Property Act, 1882 and Registration Act, 1908 are key legislations. You should maintain proper documentation including sale deed, property cards, and tax receipts. For any property transactions, ensure proper due diligence and legal verification.',
      'employment': 'Employment matters are governed by various labor laws including the Industrial Disputes Act, 1947, and Labour Code on Wages, 2019. For wrongful termination, you can approach Labor Courts. Maintain employment contracts, salary slips, and correspondence as evidence.',
      'family': 'Family matters are governed by personal laws - Hindu Marriage Act for Hindus, Indian Christian Marriage Act for Christians, and Muslim Personal Law for Muslims. For divorce, maintenance, or child custody issues, family courts have jurisdiction.',
      'consumer': 'Consumer rights are protected under the Consumer Protection Act, 2019. You can file complaints in District Consumer Forums for disputes up to ₹1 crore. Keep purchase receipts, warranty cards, and correspondence with sellers as evidence.',
      'criminal': 'For criminal matters, the Indian Penal Code (IPC) and Criminal Procedure Code (CrPC) apply. Always report crimes to police immediately. For serious offenses, engage a criminal lawyer. You have the right to bail and legal representation.',
      'default': 'I understand you need legal guidance. Could you please provide more specific details about your legal issue? I can help with property law, employment law, family law, consumer rights, criminal law, and other legal matters. Please describe your situation in more detail.'
    };

    // Simple keyword matching for demo
    const query = userQuery.toLowerCase();
    let response = responses.default;
    
    if (query.includes('property') || query.includes('house') || query.includes('land')) {
      response = responses.property;
    } else if (query.includes('job') || query.includes('employment') || query.includes('salary')) {
      response = responses.employment;
    } else if (query.includes('marriage') || query.includes('divorce') || query.includes('family')) {
      response = responses.family;
    } else if (query.includes('consumer') || query.includes('product') || query.includes('service')) {
      response = responses.consumer;
    } else if (query.includes('crime') || query.includes('police') || query.includes('theft')) {
      response = responses.criminal;
    }

    // Add language-specific responses
    if (selectedLanguage === 'ta') {
      response += '\n\n(தமிழில்: இந்த சட்ட வழிகாட்டுதல் உங்கள் மொழியில் கிடைக்கும். மேலும் உதவிக்காக தமிழ் மொழி வழக்கறிஞரை அணுகவும்.)';
    }

    return response;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(async () => {
      const botResponse = await generateLegalResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = selectedLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Legal Counsel</h1>
          <p className="text-xl text-gray-600">
            Get intelligent legal guidance with multilingual voice support
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with language selector */}
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Legal Assistant</h2>
                  <p className="text-blue-100 text-sm">Multilingual AI Counsel</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Languages className="h-5 w-5 text-white" />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code} className="text-gray-900">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <Bot className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    )}
                    {message.type === 'user' && (
                      <User className="h-5 w-5 text-white mt-0.5 flex-shrink-0 order-2" />
                    )}
                    <div className={message.type === 'user' ? 'order-1' : ''}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      {message.type === 'bot' && (
                        <button
                          onClick={() => speakText(message.content)}
                          className="mt-2 inline-flex items-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Volume2 className="h-3 w-3 mr-1" />
                          Listen
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t bg-gray-50 p-6">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your legal question or use voice input..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              </div>
              
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-3 text-center">
              Disclaimer: This AI provides general legal information only. For specific legal advice, consult a qualified lawyer.
            </p>
          </div>
        </div>

        {/* Quick Topics */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Legal Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Property Disputes',
              'Employment Rights',
              'Family Law',
              'Consumer Protection',
              'Criminal Law',
              'Contract Law'
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setInputValue(`I need help with ${topic.toLowerCase()}`)}
                className="text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <span className="text-gray-900 font-medium">{topic}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalCounselPage;