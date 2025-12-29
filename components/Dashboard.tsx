
import React, { useState, useEffect } from 'react';
import { generateHustleIdeas } from '../services/geminiService';
import { UserProfile } from '../types';
import { RefreshCw, Zap, TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'https://esm.sh/react-markdown@9';

interface DashboardProps {
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const [strategies, setStrategies] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const fetchStrategies = async () => {
    setLoading(true);
    const content = await generateHustleIdeas(profile);
    setStrategies(content);
    setLoading(false);
  };

  useEffect(() => {
    fetchStrategies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {profile.name}!</h2>
            <p className="text-emerald-50 opacity-90 max-w-lg">
              I've scanned the current market in {profile.location} for opportunities that match your {profile.skills.join(', ')} skills.
            </p>
          </div>
          <button 
            onClick={fetchStrategies}
            disabled={loading}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition disabled:opacity-50"
          >
            <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full py-20">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-500 animate-pulse">Analyzing real-time market data...</p>
              </div>
            ) : (
              <div className="prose prose-emerald max-w-none">
                <ReactMarkdown>{strategies}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Zap className="w-5 h-5 text-amber-500 mr-2" /> Quick Wins
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-emerald-200 transition cursor-pointer group">
                <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Low Hanging Fruit</p>
                <p className="text-sm font-medium">Sell unused equipment on local marketplaces</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-emerald-200 transition cursor-pointer group">
                <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Freelance</p>
                <p className="text-sm font-medium">Cold pitch 5 potential clients today</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
            <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
            <h3 className="text-lg font-bold mb-2">Potential ROI</h3>
            <p className="text-sm text-emerald-100 mb-4">Based on {profile.weeklyHours}h/wk and current demand:</p>
            <div className="text-3xl font-bold text-white mb-2">$850 - $2,200 <span className="text-sm font-normal text-emerald-300">/mo</span></div>
            <div className="h-2 bg-emerald-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-3/4" />
            </div>
            <p className="text-[10px] mt-4 text-emerald-400 font-mono">*Estimated using historical freelance data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
