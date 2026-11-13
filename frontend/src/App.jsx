import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BeneficiarioDetail from './components/BeneficiarioDetail';
import EducatorProfile from './components/EducatorProfile';
import BranchRoster from './components/BranchRoster';
import BeneficiarioForm from './components/BeneficiarioForm.jsx';
import ProgramaView from './components/ProgramaView.jsx';
import Events from './components/Events.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedBeneficiario, setSelectedBeneficiario] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  if (!user) {
    return <Login onLoginSuccess={(userData) => setUser(userData)} />;
  }

  if (currentView === 'profile') {
    return <EducatorProfile user={user} onBack={() => setCurrentView('dashboard')} onNavigateHome={() => setCurrentView('dashboard')} onNavigatePrograma={() => setCurrentView('programa')} />;
  }

  if (currentView === 'programa') {
    return (
      <ProgramaView 
        user={user}
        onBack={() => setCurrentView('dashboard')}
        onNavigateHome={() => setCurrentView('dashboard')}
        onNavigateProfile={() => setCurrentView('profile')}
      />
    );
  }

  if (currentView === 'branch' && selectedBranch) {
    return (
      <BranchRoster 
        rama={selectedBranch}
        onBack={() => setCurrentView('dashboard')}
        onSelectBeneficiario={(b) => { setSelectedBeneficiario(b); setCurrentView('beneficiario'); }}
        onNuevoBeneficiario={() => setCurrentView('nuevo_beneficiario')}
        onNavigateEvents={() => setCurrentView('programa')}
        onNavigateProfile={() => setCurrentView('profile')}
      />
    );
  }

  if (currentView === 'beneficiario' && selectedBeneficiario) {
    return (
      <BeneficiarioDetail 
        beneficiario={selectedBeneficiario} 
        onBack={() => setCurrentView('branch')} 
      />
    );
  }

  if (currentView === 'nuevo_beneficiario') {
    return (
      <BeneficiarioForm 
        ramaInicial={selectedBranch}
        onBack={() => setCurrentView('branch')}
        onSuccess={() => setCurrentView('branch')}
      />
    );
  }

  if (currentView === 'events') {
    return (
      <Events 
        user={user}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

 return (
    <Dashboard 
      user={user} 
      onSelectBeneficiario={(b) => { setSelectedBeneficiario(b); setCurrentView('beneficiario'); }}
      onSelectBranch={(rama) => { setSelectedBranch(rama); setCurrentView('branch'); }}
      onNavigateProfile={() => setCurrentView('profile')}
      onNavigateEvents={() => setCurrentView('events')}       
      onNavigatePrograma={() => setCurrentView('programa')}   
    />
  );

}

export default App;