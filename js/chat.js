class ChatWidget {
    constructor() {
        this.init();
    }

    init() {
        this.injectHTML();
        this.bindEvents();
    }

    injectHTML() {
        const container = document.createElement('div');
        container.className = 'chat-widget-container';
        container.innerHTML = `
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-[20px]">smart_toy</span>
                        <span class="font-bold text-sm">Asistente Virtual</span>
                    </div>
                    <button id="closeChatFn" class="text-white hover:text-gray-200">
                        <span class="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot">
                        ¡Hola! Soy el asistente virtual de Aaron. ¿En qué puedo ayudarte hoy?
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chatInput" class="chat-input" placeholder="Escribe tu mensaje..." autocomplete="off">
                    <button id="sendBtn" class="send-btn">
                        <span class="material-symbols-outlined text-[20px]">send</span>
                    </button>
                </div>
            </div>
            <button id="toggleChatBtn" class="chat-toggle-btn">
                <span class="material-symbols-outlined text-[28px]" id="toggleIcon">chat_bubble</span>
            </button>
        `;
        document.body.appendChild(container);

        this.chatWindow = document.getElementById('chatWindow');
        this.toggleBtn = document.getElementById('toggleChatBtn');
        this.toggleIcon = document.getElementById('toggleIcon');
        this.closeBtn = document.getElementById('closeChatFn');
        this.messagesContainer = document.getElementById('chatMessages');
        this.input = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendBtn');
    }

    bindEvents() {
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.toggleChat());

        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSend();
        });
    }

    toggleChat() {
        const isOpen = this.chatWindow.classList.contains('open');
        if (isOpen) {
            this.chatWindow.classList.remove('open');
            this.toggleIcon.textContent = 'chat_bubble';
        } else {
            this.chatWindow.classList.add('open');
            this.toggleIcon.textContent = 'close';
            setTimeout(() => this.input.focus(), 300);
        }
    }

    handleSend() {
        const text = this.input.value.trim();
        if (!text) return;

        // User Message
        this.addMessage(text, 'user');
        this.input.value = '';

        // Simulate Bot Response (Placeholder for Backend)
        this.showTypingIndicator();
        setTimeout(() => {
            this.removeTypingIndicator();
            this.addMessage("Esta es una respuesta simulada. El backend aún no está conectado.", 'bot');
        }, 1500);
    }

    addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.textContent = text;
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.textContent = 'Escribiendo...';
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const typingDiv = document.getElementById('typingIndicator');
        if (typingDiv) typingDiv.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
});
