import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, MessageSquare, Code, ArrowRight } from 'lucide-react';

export const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-jungle-900">
                        <div className="w-8 h-8 bg-gradient-to-br from-jungle-600 to-emerald-600 rounded-lg flex items-center justify-center text-white shadow-md">
                            <Sparkles size={16} />
                        </div>
                        ChatWoot
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-jungle-600 transition-colors">
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-jungle-600 hover:bg-jungle-700 text-white rounded-lg text-sm font-semibold shadow-lg shadow-jungle-200 transition-all"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-jungle-50/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-jungle-100 mb-8 animate-fade-in-up">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-medium text-jungle-700">Powered by BenAI</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-jungle-900 tracking-tight mb-6 leading-tight">
                        Build Intelligent Chatbots <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-jungle-600 to-emerald-500">
                            Without Writing Code
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                        Create, customize, and deploy stunning n8n-powered chat widgets in minutes.
                        Engage your visitors with proactive messages and instant answers.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/signup"
                            className="w-full sm:w-auto px-8 py-4 bg-jungle-600 hover:bg-jungle-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-jungle-200 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                        >
                            Start Building Free
                            <ArrowRight size={20} />
                        </Link>
                        <a
                            href="#features"
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
                        >
                            View Features
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-jungle-900 mb-4">Everything you need</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Packed with powerful features to help you capture leads and support customers automatically.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="text-amber-500" size={24} />,
                                title: 'Proactive Pop-ups',
                                desc: 'Grab attention with animated message bubbles that appear automatically.',
                            },
                            {
                                icon: <MessageSquare className="text-blue-500" size={24} />,
                                title: 'Instant FAQ',
                                desc: 'Deflect common questions with a built-in knowledge base directly in the chat.',
                            },
                            {
                                icon: <Code className="text-purple-500" size={24} />,
                                title: 'Easy Embed',
                                desc: 'Copy and paste a single line of code to add the widget to any website.',
                            },
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-jungle-100 hover:shadow-lg transition-all group">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-jungle-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-jungle-500 rounded-full blur-3xl opacity-20"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to upgrade your support?
                        </h2>
                        <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
                            Join thousands of businesses using ChatWoot to automate conversations and delight customers.
                        </p>
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-jungle-900 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl"
                        >
                            Get Started Now
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-slate-100 text-center text-slate-400 text-sm">
                <p>© 2024 ChatWoot. Powered by BenAI.</p>
            </footer>
        </div>
    );
};
