import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import SchemesPage from './pages/SchemesPage';
import LegalCounselPage from './pages/LegalCounselPage';
import EducationPage from './pages/EducationPage';
import { UserProvider } from './context/UserContext';
import './index.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/schemes" element={<SchemesPage />} />
              <Route path="/legal-counsel" element={<LegalCounselPage />} />
              <Route path="/education" element={<EducationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;