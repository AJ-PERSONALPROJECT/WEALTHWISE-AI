
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ChatSession from './components/ChatSession';
import Onboarding from './components/Onboarding';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'market'>('dashboard');

  // Check for existing profile in local storage
  useEffect(() => {
    const saved = localStorage.getItem('wealthwise_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleCompleteOnboarding = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('wealthwise_profile', JSON.stringify(newProfile));
  };

  const handleReset = () => {
    localStorage.removeItem('wealthwise_profile');
    setProfile(null);
  };

  if (!profile) {
    return <Onboarding onComplete={handleCompleteOnboarding} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onReset={handleReset} 
        profileName={profile.name}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold text-emerald-700 capitalize">
            {activeTab === 'dashboard' ? 'Income Strategies' : activeTab === 'chat' ? 'Strategy Session' : 'Market Pulse'}
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-500">WealthWise Agent v1.0</span>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              {profile.name[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto w-full flex-1">
          {activeTab === 'dashboard' && <Dashboard profile={profile} />}
          {activeTab === 'chat' && <ChatSession profile={profile} />}
          {activeTab === 'market' && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Market Pulse</h2>
              <p className="text-gray-600 mb-6">Real-time tracking of high-yield skills and market arbitrage opportunities coming soon.</p>
              <button 
                onClick={() => setActiveTab('chat')}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
              >
                Ask Agent About Trends
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
