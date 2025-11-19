import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WidgetConfig {
    webhook: {
        url: string;
        route: string;
    };
    branding: {
        logo: string;
        name: string;
        welcomeText: string;
        responseTimeText: string;
        poweredBy: {
            text: string;
            link: string;
        };
    };
    style: {
        primaryColor: string;
        secondaryColor: string;
        position: 'left' | 'right';
        backgroundColor: string;
        fontColor: string;
        fontFamily: string;
    };
    behavior: {
        isOpenByDefault: boolean;
        popupMessage: string;
        autoOpenDelay: number; // in seconds
        animation: 'fade' | 'slide' | 'bounce';
        soundEnabled: boolean;
    };
    faq: Array<{
        question: string;
        answer: string;
    }>;
}

interface Store {
    config: WidgetConfig;
    setConfig: (config: WidgetConfig) => void;
    updateConfig: (path: string, value: any) => void;
    activeStep: number;
    setActiveStep: (step: number) => void;
}

const defaultConfig: WidgetConfig = {
    webhook: {
        url: '',
        route: '',
    },
    branding: {
        logo: '',
        name: '',
        welcomeText: 'Hi there 👋',
        responseTimeText: 'We typically reply in a few minutes',
        poweredBy: {
            text: 'Powered by BenAI',
            link: 'https://n8n.partnerlinks.io/m8a94i19zhqq?utm_source=nocodecreative.io',
        },
    },
    style: {
        primaryColor: '#059669',
        secondaryColor: '#047857',
        position: 'right',
        backgroundColor: '#ffffff',
        fontColor: '#333333',
        fontFamily: 'Geist Sans',
    },
    behavior: {
        isOpenByDefault: false,
        popupMessage: '👋 Can I help you with something?',
        autoOpenDelay: 5,
        animation: 'fade',
        soundEnabled: true,
    },
    faq: [],
};

export const useStore = create<Store>()(
    persist(
        (set) => ({
            config: defaultConfig,
            activeStep: 0,
            setConfig: (config) => set({ config }),
            updateConfig: (path, value) =>
                set((state) => {
                    const newConfig = { ...state.config };
                    const parts = path.split('.');
                    let current: any = newConfig;
                    for (let i = 0; i < parts.length - 1; i++) {
                        current = current[parts[i]];
                    }
                    current[parts[parts.length - 1]] = value;
                    return { config: newConfig };
                }),
            setActiveStep: (step) => set({ activeStep: step }),
        }),
        {
            name: 'n8n-chat-builder-storage',
        }
    )
);
