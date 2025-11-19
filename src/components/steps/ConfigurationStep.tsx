import React from 'react';
import { useStore } from '../../store/useStore';
import { Link, MessageSquare, Globe } from 'lucide-react';

export const ConfigurationStep: React.FC = () => {
    const { config, updateConfig } = useStore();

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Link size={16} />
                    Connection
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Webhook URL
                        </label>
                        <input
                            type="text"
                            value={config.webhook.url}
                            onChange={(e) => updateConfig('webhook.url', e.target.value)}
                            placeholder="https://your-n8n-instance.com/webhook/..."
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600 placeholder:text-slate-400"
                        />
                        <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-slate-400" />
                            The Production Webhook URL from your n8n workflow
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Route (Optional)
                        </label>
                        <input
                            type="text"
                            value={config.webhook.route}
                            onChange={(e) => updateConfig('webhook.route', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600"
                        />
                    </div>
                </div>
            </section>

            <div className="h-px bg-slate-100" />

            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare size={16} />
                    Identity
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Bot Name
                        </label>
                        <input
                            type="text"
                            value={config.branding.name}
                            onChange={(e) => updateConfig('branding.name', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Logo URL
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={config.branding.logo}
                                onChange={(e) => updateConfig('branding.logo', e.target.value)}
                                placeholder="https://..."
                                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600 placeholder:text-slate-400"
                            />
                            <div className="w-12 h-12 rounded-xl border border-slate-100 p-1 bg-white shrink-0 shadow-sm flex items-center justify-center">
                                {config.branding.logo ? (
                                    <img
                                        src={config.branding.logo}
                                        alt="Preview"
                                        className="w-full h-full object-contain rounded-lg"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-50 rounded-lg" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="h-px bg-slate-100" />

            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Globe size={16} />
                    Attribution
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Powered By Text
                        </label>
                        <input
                            type="text"
                            value={config.branding.poweredBy.text}
                            onChange={(e) => updateConfig('branding.poweredBy.text', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Link
                        </label>
                        <input
                            type="text"
                            value={config.branding.poweredBy.link}
                            onChange={(e) => updateConfig('branding.poweredBy.link', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
