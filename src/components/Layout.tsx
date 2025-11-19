import React, { useState } from 'react';
import { Preview } from './Preview';
import { useStore } from '../store/useStore';
import { Settings, MessageSquare, Palette, Code, ChevronRight, Sparkles, Save, Check } from 'lucide-react';

const steps = [
    { id: 0, name: 'Configuration', icon: Settings, description: 'Connect your n8n workflow' },
    { id: 1, name: 'Content', icon: MessageSquare, description: 'Customize messages & FAQs' },
    { id: 2, name: 'Appearance', icon: Palette, description: 'Match your brand identity' },
    { id: 3, name: 'Export', icon: Code, description: 'Get your embed code' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { activeStep, setActiveStep } = useStore();
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        // Simulate API call/save delay
        setTimeout(() => setSaving(false), 1000);
    };

    return (
        <div className="h-screen bg-jungle-50 flex font-sans text-slate-900 p-4 gap-4 overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 flex flex-col flex-shrink-0 overflow-hidden">
                <div className="p-8 pb-6">
                    <div className="flex items-center gap-3 font-bold text-xl text-jungle-900 mb-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-jungle-600 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-jungle-200">
                            <Sparkles size={20} />
                        </div>
                        ChatWoot
                    </div>
                    <p className="text-xs text-jungle-600/60 ml-14 font-medium">Builder v2.0</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        const isActive = activeStep === step.id;
                        return (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(step.id)}
                                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all duration-300 group ${isActive
                                        ? 'bg-jungle-50 text-jungle-900 shadow-sm ring-1 ring-jungle-100'
                                        : 'text-slate-500 hover:bg-white/50 hover:text-jungle-700'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-white text-jungle-600 shadow-sm' : 'bg-slate-100/50 text-slate-400 group-hover:bg-white group-hover:text-jungle-500'
                                    }`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="font-semibold text-sm">{step.name}</div>
                                    <div className="text-xs text-slate-400 font-medium mt-0.5 group-hover:text-jungle-600/60 transition-colors">{step.description}</div>
                                </div>
                                {isActive && <ChevronRight size={16} className="text-jungle-600" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-6 mt-auto">
                    <button
                        onClick={handleSave}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 mb-4 ${saving
                                ? 'bg-jungle-100 text-jungle-700 shadow-lg shadow-jungle-100'
                                : 'bg-jungle-900 text-white shadow-lg shadow-jungle-200 hover:bg-jungle-800'
                            }`}
                    >
                        {saving ? <Check size={18} /> : <Save size={18} />}
                        {saving ? 'Saved!' : 'Save Changes'}
                    </button>
                    <div className="bg-jungle-50/50 rounded-2xl p-4 border border-jungle-100/50">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-semibold text-jungle-800">System Status</span>
                        </div>
                        <p className="text-xs text-jungle-600/70 leading-relaxed">
                            All systems operational.
                            <br />
                            Ready to deploy.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Config Panel */}
                <div className="w-[480px] bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 flex flex-col flex-shrink-0 overflow-hidden">
                    <div className="p-8 border-b border-slate-50">
                        <h1 className="text-2xl font-bold text-slate-900">{steps[activeStep].name}</h1>
                        <p className="text-slate-500 text-sm mt-1">Configure your chatbot settings.</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {children}
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 bg-white/60 backdrop-blur-md rounded-3xl shadow-sm border border-white/50 p-8 flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />

                    <div className="relative z-10 flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-slate-100">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-xs font-medium text-slate-600">Live Preview</span>
                        </div>
                    </div>

                    <div className="flex-1 relative bg-white rounded-2xl shadow-2xl shadow-jungle-900/5 border border-slate-100 overflow-hidden">
                        <Preview />
                    </div>
                </div>
            </div>
        </div>
    );
};
