// Chat Widget Script
(function () {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #059669);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #047857);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: var(--n8n-chat-font-family, 'Geist Sans', sans-serif);
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(0, 0, 0, 0.1);
            overflow: hidden;
            font-family: inherit;
            transition: all 0.3s ease;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
            opacity: 1;
            transform: translateY(0);
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            background: var(--chat--color-background);
            z-index: 10;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s;
            font-size: 24px;
            opacity: 0.5;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 16px;
            font-weight: 600;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .home-view {
            padding: 24px;
            overflow-y: auto;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 28px;
            font-weight: 700;
            color: var(--chat--color-font);
            margin-bottom: 8px;
            line-height: 1.2;
            letter-spacing: -0.02em;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0 0 24px 0;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 14px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.2s, box-shadow 0.2s;
            font-weight: 600;
            font-family: inherit;
            margin-bottom: 32px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        .n8n-chat-widget .faq-section {
            margin-top: auto;
        }

        .n8n-chat-widget .faq-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .n8n-chat-widget .faq-item {
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            margin-bottom: 8px;
            background: var(--chat--color-background);
            overflow: hidden;
            transition: border-color 0.2s;
        }

        .n8n-chat-widget .faq-item:hover {
            border-color: rgba(0, 0, 0, 0.15);
        }

        .n8n-chat-widget .faq-question {
            width: 100%;
            padding: 12px 16px;
            text-align: left;
            background: none;
            border: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            color: var(--chat--color-font);
            font-family: inherit;
        }

        .n8n-chat-widget .faq-question svg {
            width: 16px;
            height: 16px;
            transition: transform 0.3s;
            opacity: 0.5;
        }

        .n8n-chat-widget .faq-item.active .faq-question svg {
            transform: rotate(180deg);
        }

        .n8n-chat-widget .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
            padding: 0 16px;
            font-size: 13px;
            line-height: 1.5;
            color: var(--chat--color-font);
            opacity: 0.8;
        }

        .n8n-chat-widget .faq-item.active .faq-answer {
            padding-bottom: 12px;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            border-radius: 12px;
            max-width: 85%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .n8n-chat-widget .chat-message.bot {
            background: rgba(0, 0, 0, 0.05);
            color: var(--chat--color-font);
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            display: flex;
            gap: 10px;
            align-items: flex-end;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.4;
            max-height: 100px;
            transition: border-color 0.2s;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 10px;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-input button svg {
            width: 20px;
            height: 20px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 999;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.1);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            font-size: 11px;
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-footer a {
            color: inherit;
            text-decoration: underline;
        }
    `;

    // Load Font dynamically
    const loadFont = (fontFamily) => {
        if (!fontFamily || fontFamily === 'Geist Sans') {
            const fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
            document.head.appendChild(fontLink);
            return;
        }

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;
        document.head.appendChild(fontLink);
    };

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: '',
            name: '',
            welcomeText: 'Hi there 👋',
            responseTimeText: 'We typically reply in a few minutes',
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333',
            fontFamily: 'Geist Sans'
        },
        behavior: {
            isOpenByDefault: false,
            popupMessage: '',
            autoOpenDelay: 0,
            animation: 'fade',
            soundEnabled: true,
            showInitialMessage: true,
            initialMessage: 'Hello! How can I help you today?'
        },
        faq: [] // Array of { question: string, answer: string }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ?
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style },
            behavior: { ...defaultConfig.behavior, ...window.ChatWidgetConfig.behavior },
            faq: window.ChatWidgetConfig.faq || defaultConfig.faq
        } : defaultConfig;

    loadFont(config.style.fontFamily);

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = localStorage.getItem('n8n-chat-session-id');
    if (!currentSessionId) {
        currentSessionId = crypto.randomUUID();
        localStorage.setItem('n8n-chat-session-id', currentSessionId);
    }

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';

    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);
    widgetContainer.style.setProperty('--n8n-chat-font-family', config.style.fontFamily);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;

    // Generate FAQ HTML
    const faqHTML = config.faq.length > 0 ? `
        <div class="faq-section">
            <div class="faq-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Quick answers
            </div>
            ${config.faq.map(item => `
                <div class="faq-item">
                    <button class="faq-question">
                        ${item.question}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <div class="faq-answer">${item.answer}</div>
                </div>
            `).join('')}
        </div>
    ` : '';

    const homeViewHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo || 'https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png'}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="home-view">
            <h2 class="welcome-text">${config.branding.welcomeText}</h2>
            <p class="response-text">${config.branding.responseTimeText}</p>
            
            <button class="new-chat-btn">
                <svg class="message-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Send us a message
            </button>
            
            ${faqHTML}
        </div>
        <div class="chat-footer">
            Powered by BenAI <a href="https://n8n.partnerlinks.io/m9g5u41hwszk" target="_blank">n8n</a>
        </div>
    `;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <button class="back-button" style="margin-right: 8px; background: none; border: none; cursor: pointer; color: var(--chat--color-font); display: flex; align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </button>
                <img src="${config.branding.logo || 'https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png'}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="close-button" style="margin-left: auto;">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="Type your message..." rows="1"></textarea>
                <button type="submit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </div>
            <div class="chat-footer">
                Powered by BenAI <a href="https://n8n.partnerlinks.io/m9g5u41hwszk" target="_blank">n8n</a>
            </div>
        </div>
    `;

    chatContainer.innerHTML = homeViewHTML + chatInterfaceHTML;

    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>`;

    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);

    // Proactive Popup
    if (config.behavior.popupMessage && !config.behavior.isOpenByDefault) {
        const popup = document.createElement('div');
        popup.className = `chat-popup ${config.behavior.animation}`;
        popup.innerHTML = `
            <span>${config.behavior.popupMessage}</span>
            <button class="close-popup">×</button>
        `;
        // Add styles for popup
        const popupStyles = `
            .chat-popup {
                position: absolute;
                bottom: 80px;
                ${config.style.position === 'left' ? 'left: 20px;' : 'right: 20px;'}
                background: white;
                padding: 12px 16px;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                font-size: 14px;
                font-weight: 500;
                color: #333;
                display: flex;
                align-items: center;
                gap: 8px;
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
                z-index: 9998;
                max-width: 250px;
            }
            .chat-popup.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .chat-popup .close-popup {
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                padding: 0;
                font-size: 16px;
                line-height: 1;
            }
            .chat-popup .close-popup:hover {
                color: #333;
            }
        `;
        const popupStyleSheet = document.createElement('style');
        popupStyleSheet.textContent = popupStyles;
        document.head.appendChild(popupStyleSheet);

        widgetContainer.appendChild(popup);

        window.n8nChatPopupTimer = setTimeout(() => {
            popup.classList.add('visible');
            if (config.behavior.soundEnabled) {
                const audio = new Audio('data:audio/mp3;base64,//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
                audio.volume = 0.5;
                audio.play().catch(e => console.log('Audio play failed due to user interaction policy', e));
            }
        }, config.behavior.autoOpenDelay * 1000);

        popup.querySelector('.close-popup').addEventListener('click', (e) => {
            e.stopPropagation();
            popup.remove();
        });

        popup.addEventListener('click', () => {
            chatContainer.classList.add('open');
            popup.remove();
        });
    }

    document.body.appendChild(widgetContainer);

    if (config.behavior.isOpenByDefault) {
        setTimeout(() => {
            chatContainer.classList.add('open');
        }, config.behavior.autoOpenDelay * 1000);
    }

    // Elements
    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const homeView = chatContainer.querySelector('.home-view');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');
    const backButton = chatContainer.querySelector('.back-button');

    function autoResizeTextarea() {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    async function startNewConversation() {
        // Switch view
        homeView.style.display = 'none';
        chatContainer.querySelector('.brand-header').style.display = 'none'; // Hide home header
        chatInterface.classList.add('active');

        // Reset messages
        messagesContainer.innerHTML = '';

        // Add initial bot message if enabled
        if (config.behavior.showInitialMessage) {
            const initialMessageDiv = document.createElement('div');
            initialMessageDiv.className = 'chat-message bot';
            initialMessageDiv.textContent = config.behavior.initialMessage || "Hello! How can I help you today?";
            messagesContainer.appendChild(initialMessageDiv);
        }

        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: {
                userId: ""
            }
        }];

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(responseData) ? responseData[0].output : responseData.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function sendMessage(message) {
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: ""
            }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });

            const data = await response.json();

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(data) ? data[0].output : data.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Event Listeners
    newChatBtn.addEventListener('click', startNewConversation);

    backButton.addEventListener('click', () => {
        chatInterface.classList.remove('active');
        homeView.style.display = 'flex';
        chatContainer.querySelector('.brand-header').style.display = 'flex';
    });

    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
            textarea.style.height = 'auto';
        }
    });

    textarea.addEventListener('input', autoResizeTextarea);

    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
                textarea.style.height = 'auto';
            }
        }
    });

    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');

        // Stop/Remove popup if chat is opened
        if (chatContainer.classList.contains('open')) {
            if (window.n8nChatPopupTimer) {
                clearTimeout(window.n8nChatPopupTimer);
                window.n8nChatPopupTimer = null;
            }
            const popup = widgetContainer.querySelector('.chat-popup');
            if (popup) {
                popup.remove();
            }
        }
    });

    // FAQ Accordion
    const faqQuestions = chatContainer.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other items
            chatContainer.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });
})();