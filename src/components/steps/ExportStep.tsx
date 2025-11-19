import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Code, Copy, Check, Globe } from 'lucide-react';

export const ExportStep: React.FC = () => {
    const { config } = useStore();
    const [copied, setCopied] = useState(false);
    const [widgetUrl, setWidgetUrl] = useState('https://your-cdn.com/chat-widget.js');

    const generateCode = () => {
        const configJson = JSON.stringify(config, null, 4);
        return `<!-- n8n Chat Widget -->
<script>
    window.ChatWidgetConfig = ${configJson};
</script>
<script src="${widgetUrl}" defer></script>`;
    };

    const code = generateCode();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Globe size={16} />
                    Hosting
                </h3>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Widget Script URL
                    </label>
                    <input
                        type="text"
                        value={widgetUrl}
                        onChange={(e) => setWidgetUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600"
                    />
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        You must host the <code>chat-widget.js</code> file on a public server (e.g., CDN, GitHub Pages, or your own website) and paste the URL here.
                    </p>
                </div>
            </section>

            <div className="h-px bg-slate-100" />

            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Code size={16} />
                    Embed Code
                </h3>

                <div className="relative group">
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors backdrop-blur-sm border border-white/10"
                        >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                    </div>
                    <div className="bg-[#1E1E2E] rounded-2xl overflow-hidden shadow-xl border border-slate-800">
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#27273A] border-b border-slate-700/50">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        <pre className="p-6 overflow-x-auto font-mono text-sm leading-relaxed text-slate-300">
                            {code}
                        </pre>
                    </div>
                </div>
            </section>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <h4 className="text-blue-900 font-semibold mb-2 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Installation Tips
                </h4>
                <ul className="text-blue-700 text-sm space-y-1.5 list-none ml-3.5">
                    <li>• Place the code before the closing <code>&lt;/body&gt;</code> tag.</li>
                    <li>• Ensure your n8n webhook has CORS enabled for your domain.</li>
                    <li>• The widget will automatically initialize when the page loads.</li>
                </ul>
            </div>
        </div>
    );
};
