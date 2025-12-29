
import React from 'react';
import { LayoutDashboard, MessageSquare, TrendingUp, Settings, LogOut, Wallet } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onReset: () => void;
  profileName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onReset, profileName }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Strategies', icon: LayoutDashboard },
    { id: 'chat', label: 'Consultation', icon: MessageSquare },
    { id: 'market', label: 'Market Trends', icon: TrendingUp },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
      <div className="p-6 flex items-center space-x-3">
        <div className="p-2 bg-emerald-500 rounded-lg">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">WealthWise</span>
      </div>

      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="px-4 py-3 bg-slate-800 rounded-xl">
          <p className="text-xs text-slate-500 mb-1">Signed in as</p>
          <p className="text-sm font-semibold truncate">{profileName}</p>
        </div>
        <button 
          onClick={onReset}
          className="w-full flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-red-400 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Reset Profile</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
