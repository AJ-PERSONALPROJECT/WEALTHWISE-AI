
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ChevronRight, ChevronLeft, Target, Briefcase, Clock, MapPin, DollarSign } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    skills: [],
    weeklyHours: 10,
    availableCapital: 100,
    location: '',
    interests: []
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill) 
        : [...prev.skills, skill]
    }));
  };

  const commonSkills = ['Writing', 'Coding', 'Design', 'Marketing', 'Sales', 'Data Entry', 'Language Translation', 'Driving', 'Handyman', 'Teaching'];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-emerald-600 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Build Your Plan</h2>
          <p className="text-emerald-100">WealthWise needs some context to find your perfect income strategies.</p>
          <div className="mt-6 flex space-x-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? 'bg-white' : 'bg-emerald-800'}`} />
            ))}
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What's your name?</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Where are you located?</label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="e.g. London, UK"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Select your core skills:</label>
              <div className="grid grid-cols-2 gap-3">
                {commonSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      formData.skills.includes(skill)
                        ? 'bg-emerald-600 text-white border-transparent'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Weekly hours available?</label>
                <input
                  type="range"
                  name="weeklyHours"
                  min="1"
                  max="40"
                  value={formData.weeklyHours}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="mt-2 text-center text-emerald-700 font-bold">{formData.weeklyHours} hours/week</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Starting capital ($)?</label>
                <input
                  type="number"
                  name="availableCapital"
                  value={formData.availableCapital}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <Target className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold">Ready to strategize?</h3>
                <p className="text-gray-600 mt-2">I will analyze your {formData.skills.length} skills against the current {formData.location} market.</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <ul className="text-sm text-emerald-800 space-y-2">
                  <li>• Targeted Side Hustles</li>
                  <li>• High-Value Skill Gaps</li>
                  <li>• Career Optimization Paths</li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center text-gray-500 font-medium hover:text-gray-700">
                <ChevronLeft className="w-5 h-5 mr-1" /> Back
              </button>
            ) : <div />}
            
            <button
              onClick={step === 4 ? () => onComplete(formData) : nextStep}
              className="flex items-center px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition active:scale-95"
            >
              {step === 4 ? 'Launch WealthWise' : 'Continue'}
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
