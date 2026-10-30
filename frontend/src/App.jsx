import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BeneficiarioDetail from './components/BeneficiarioDetail';
import EducatorProfile from './components/EducatorProfile';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedBeneficiario, setSelectedBeneficiario] = useState(null);

  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  if (currentView === 'profile') {
    return <EducatorProfile user={user} onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'beneficiario' && selectedBeneficiario) {
    return (
      <BeneficiarioDetail 
        beneficiario={selectedBeneficiario} 
        onBack={() => {
          setSelectedBeneficiario(null);
          setCurrentView('dashboard');
        }} 
      />
    );
  }

  return (
    <Dashboard 
      user={user} 
      onSelectBeneficiario={(b) => {
        setSelectedBeneficiario(b);
        setCurrentView('beneficiario');
      }}
      onNavigateProfile={() => setCurrentView('profile')}
    />
  );
}

export default App;
