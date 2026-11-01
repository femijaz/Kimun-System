import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BeneficiarioDetail from './components/BeneficiarioDetail';
import EducatorProfile from './components/EducatorProfile';
import Events from './components/Events';
import BranchRoster from './components/BranchRoster';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedBeneficiario, setSelectedBeneficiario] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Si no hay usuario logueado, muestra el Login
  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  // Vista de Perfil del Educador
  if (currentView === 'profile') {
    return (
      <EducatorProfile 
        user={user} 
        onBack={() => setCurrentView('dashboard')} 
        onNavigateHome={() => setCurrentView('dashboard')}
        onNavigateEvents={() => setCurrentView('events')}
      />
    );
  }

  // Vista de Eventos
  if (currentView === 'events') {
    return (
      <Events 
        onBack={() => setCurrentView('dashboard')}
        onNavigateHome={() => setCurrentView('dashboard')} 
        onNavigateProfile={() => setCurrentView('profile')} 
      />
    );
  }

  // Vista de Nómina por Rama
  if (currentView === 'branch' && selectedBranch) {
    return (
      <BranchRoster 
        rama={selectedBranch}
        onBack={() => setCurrentView('dashboard')}
        onSelectBeneficiario={(b) => {
          setSelectedBeneficiario(b);
          setCurrentView('beneficiario');
        }}
        onNavigateEvents={() => setCurrentView('events')}
        onNavigateProfile={() => setCurrentView('profile')}
      />
    );
  }

  // Vista de Detalle de Beneficiario
  if (currentView === 'beneficiario' && selectedBeneficiario) {
    return (
      <BeneficiarioDetail 
        beneficiario={selectedBeneficiario} 
        onBack={() => {
          setSelectedBeneficiario(null);
          setCurrentView('branch'); // Vuelve a la rama o al dashboard
        }} 
        onNavigateHome={() => setCurrentView('dashboard')}
        onNavigateEvents={() => setCurrentView('events')}
        onNavigateProfile={() => setCurrentView('profile')}
      />
    );
  }

  // muestra el Dashboard principal
  return (
    <Dashboard 
      user={user} 
      onSelectBeneficiario={(b) => {
        setSelectedBeneficiario(b);
        setCurrentView('beneficiario');
      }}
      onSelectBranch={(rama) => {
        setSelectedBranch(rama);
        setCurrentView('branch');
      }}
      onNavigateProfile={() => setCurrentView('profile')}
      onNavigateEvents={() => setCurrentView('events')}
    />
  );
}

export default App;
