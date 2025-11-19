import React from 'react';
import { useStore } from '../../store/useStore';
import { Palette, LayoutTemplate, Type } from 'lucide-react';

const ColorInput: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
}> = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
        </label>
        <div className="flex gap-3 items-center bg-slate-50 p-2 rounded-xl border border-transparent focus-within:bg-white focus-within:ring-4 focus-within:ring-purple-500/10 transition-all">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 shadow-sm ring-1 ring-black/5">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 p-0 text-sm font-medium text-slate-600 uppercase"
            />
        </div>
    </div>
);

const GOOGLE_FONTS = [
    'Geist Sans',
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Poppins',
    'Montserrat',
    'Oswald',
    'Raleway',
    'Nunito',
    'Ubuntu'
];

export const StylingStep: React.FC = () => {
    const { config, updateConfig } = useStore();

    return (
        <div className="space-y-8">
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Palette size={16} />
                    Colors
                </h3>

                <div className="grid grid-cols-2 gap-6">
                    <ColorInput
                        label="Primary Color"
                        value={config.style.primaryColor}
                        onChange={(v) => updateConfig('style.primaryColor', v)}
                    />
                    <ColorInput
                        label="Secondary Color"
                        value={config.style.secondaryColor}
                        onChange={(v) => updateConfig('style.secondaryColor', v)}
                    />
                    <ColorInput
                        label="Background Color"
                        value={config.style.backgroundColor}
                        onChange={(v) => updateConfig('style.backgroundColor', v)}
                    />
                    <ColorInput
                        label="Font Color"
                        value={config.style.fontColor}
                        onChange={(v) => updateConfig('style.fontColor', v)}
                    />
                </div>
            </section>

            <div className="h-px bg-slate-100" />

            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Type size={16} />
                    Typography
                </h3>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Font Family
                    </label>
                    <select
                        value={config.style.fontFamily}
                        onChange={(e) => updateConfig('style.fontFamily', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all font-medium text-slate-600 appearance-none cursor-pointer"
                    >
                        {GOOGLE_FONTS.map(font => (
                            <option key={font} value={font}>{font}</option>
                        ))}
                    </select>
                    <p className="mt-2 text-xs text-slate-400">
                        Selected font will be automatically loaded from Google Fonts.
                    </p>
                </div>
            </section>

            <div className="h-px bg-slate-100" />

            <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <LayoutTemplate size={16} />
                    Layout
                </h3>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                        Widget Position
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => updateConfig('style.position', 'left')}
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 group ${config.style.position === 'left'
                                ? 'border-purple-600 bg-purple-50/50 text-purple-700'
                                : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            <div className="w-20 h-14 bg-white border border-slate-200 rounded-lg shadow-sm relative overflow-hidden group-hover:shadow-md transition-shadow">
                                <div className={`absolute bottom-2 left-2 w-4 h-4 rounded-full opacity-50 transition-colors ${config.style.position === 'left' ? 'bg-purple-500' : 'bg-slate-300'
                                    }`} />
                            </div>
                            <span className="text-sm font-semibold">Bottom Left</span>
                        </button>

                        <button
                            onClick={() => updateConfig('style.position', 'right')}
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 group ${config.style.position === 'right'
                                ? 'border-purple-600 bg-purple-50/50 text-purple-700'
                                : 'border-slate-100 hover:border-slate-200 text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            <div className="w-20 h-14 bg-white border border-slate-200 rounded-lg shadow-sm relative overflow-hidden group-hover:shadow-md transition-shadow">
                                <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-full opacity-50 transition-colors ${config.style.position === 'right' ? 'bg-purple-500' : 'bg-slate-300'
                                    }`} />
                            </div>
                            <span className="text-sm font-semibold">Bottom Right</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
