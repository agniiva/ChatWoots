import React from 'react';
import { useStore } from '../../store/useStore';
import { MessageCircle, HelpCircle, Plus, Trash2, Zap } from 'lucide-react';

export const ContentStep: React.FC = () => {
    const { config, updateConfig } = useStore();

    const addFAQ = () => {
        updateConfig('faq', [...config.faq, { question: '', answer: '' }]);
    };

    const removeFAQ = (index: number) => {
        const newFAQ = [...config.faq];
        newFAQ.splice(index, 1);
        updateConfig('faq', newFAQ);
    };

    const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
        const newFAQ = [...config.faq];
        newFAQ[index][field] = value;
        updateConfig('faq', newFAQ);
    };

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <MessageCircle size={16} />
                    Welcome Screen
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Welcome Message
                        </label>
                        <textarea
                            value={config.branding.welcomeText}
                            onChange={(e) => updateConfig('branding.welcomeText', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Response Time Text
                        </label>
                        <input
                            type="text"
                            value={config.branding.responseTimeText}
                            onChange={(e) => updateConfig('branding.responseTimeText', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600"
                        />
                    </div>
                </div>
            </section>

            <div className="h-px bg-slate-100" />

            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Zap size={16} />
                    Proactive Behavior
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">
                            Open by Default
                        </label>
                        <button
                            onClick={() => updateConfig('behavior.isOpenByDefault', !config.behavior.isOpenByDefault)}
                            className={`w-11 h-6 rounded-full transition-colors relative ${config.behavior.isOpenByDefault ? 'bg-purple-600' : 'bg-slate-200'
                                }`}
                        >
                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${config.behavior.isOpenByDefault ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                        </button>
                    </div>

                    {!config.behavior.isOpenByDefault && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    Pop-up Message
                                </label>
                                <input
                                    type="text"
                                    value={config.behavior.popupMessage}
                                    onChange={(e) => updateConfig('behavior.popupMessage', e.target.value)}
                                    placeholder="👋 Can I help you?"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Delay (seconds)
                                    </label>
                                    <input
                                        type="number"
                                        value={config.behavior.autoOpenDelay}
                                        onChange={(e) => updateConfig('behavior.autoOpenDelay', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Animation
                                    </label>
                                    <select
                                        value={config.behavior.animation}
                                        onChange={(e) => updateConfig('behavior.animation', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600 appearance-none cursor-pointer"
                                    >
                                        <option value="fade">Fade</option>
                                        <option value="slide">Slide</option>
                                        <option value="bounce">Bounce</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Play Sound Effect
                                </label>
                                <button
                                    onClick={() => updateConfig('behavior.soundEnabled', !config.behavior.soundEnabled)}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${config.behavior.soundEnabled ? 'bg-purple-600' : 'bg-slate-200'
                                        }`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${config.behavior.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                                        }`} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <div className="h-px bg-slate-100" />

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <HelpCircle size={16} />
                        Quick Answers (FAQ)
                    </h3>
                    <button
                        onClick={addFAQ}
                        className="text-xs flex items-center gap-1 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
                    >
                        <Plus size={14} />
                        Add Question
                    </button>
                </div>

                <div className="space-y-3">
                    {config.faq.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 text-sm bg-slate-50/50">
                            No FAQs added yet. Click "Add Question" to get started.
                        </div>
                    )}

                    {config.faq.map((item, index) => (
                        <div key={index} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm space-y-3 relative group hover:border-purple-100 transition-colors">
                            <button
                                onClick={() => removeFAQ(index)}
                                className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={14} />
                            </button>

                            <div>
                                <input
                                    type="text"
                                    value={item.question}
                                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                    placeholder="Question (e.g. What is your return policy?)"
                                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-purple-500/10 outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                                />
                            </div>
                            <div>
                                <textarea
                                    value={item.answer}
                                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                    placeholder="Answer..."
                                    rows={2}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-purple-500/10 outline-none text-sm text-slate-600 resize-none placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
