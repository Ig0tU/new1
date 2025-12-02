export class GeminiTerminal {
    constructor() {
        this.config = Joomla.getOptions('geminiTermConfig', {});
        this.isOpen = false;
        this.history = [];
        this.historyIndex = -1;
        this.dom = {};

        // "Universal Architect" Role Definition
        this.role = `
# The Universal Architect: Agent Protocol (v1.0)
You are the Universal Architect. You are an autonomous coding agent.
**YOUR MODE:** Aggressive Execution. Platform Agnostic. Robust.
`;

        this.init();
    }

    init() {
        this.createDOM();
        this.attachEvents();
        this.log('System', 'Universal Architect Terminal online. Awaiting instructions.');
    }

    createDOM() {
        const overlay = document.createElement('div');
        overlay.id = 'gemini-terminal-overlay';
        overlay.innerHTML = `
            <div id="gemini-terminal-window">
                <div class="gt-header">
                    <span class="gt-title">Universal Architect // Operations Terminal</span>
                    <span class="gt-status">v1.0.0 | Idle</span>
                </div>
                <div class="gt-body" id="gt-output">
                    <div class="gt-line system">Initializing protocol...</div>
                    <div class="gt-line system">Environment: Joomla / Yootheme</div>
                    <div class="gt-line system">Gemini-CLI: Infused</div>
                </div>
                <div class="gt-input-area">
                    <span class="gt-prompt">UA ❯</span>
                    <input type="text" id="gt-input" placeholder="Execute directive..." autocomplete="off">
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        this.dom = {
            overlay: overlay,
            window: overlay.querySelector('#gemini-terminal-window'),
            output: overlay.querySelector('#gt-output'),
            input: overlay.querySelector('#gt-input'),
            status: overlay.querySelector('.gt-status')
        };
    }

    attachEvents() {
        document.addEventListener('keyup', (e) => {
             // Debug keypress
             console.log(`Key: ${e.key}, Code: ${e.code}, Config: ${this.config.activationKey}`);

             // Use Backtick ` to toggle
             if (e.key === '`' || e.code === 'Backquote' || e.code === this.config.activationKey) {
                 this.toggle();
             }
             if (e.key === 'Escape' && this.isOpen) {
                 this.toggle();
             }
        });

        this.dom.input.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                const cmd = this.dom.input.value.trim();
                if (cmd) {
                    this.dom.input.value = '';
                    await this.processCommand(cmd);
                }
            }
        });

        this.dom.window.addEventListener('click', () => this.dom.input.focus());
    }

    toggle() {
        this.isOpen = !this.isOpen;
        console.log(`Toggling terminal. New state: ${this.isOpen}`);
        this.dom.overlay.classList.toggle('active', this.isOpen);
        console.log(`Classes: ${this.dom.overlay.className}`);
        if (this.isOpen) {
            this.dom.input.focus();
        }
    }

    log(type, message) {
        const line = document.createElement('div');
        line.className = `gt-line ${type.toLowerCase()}`;
        // Handle multiline output (markdown-ish)
        const formatted = message.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        line.innerHTML = formatted;

        this.dom.output.appendChild(line);
        this.dom.output.scrollTop = this.dom.output.scrollHeight;
    }

    setStatus(text) {
        this.dom.status.textContent = text;
    }

    async processCommand(input) {
        this.log('User', input);
        this.setStatus('Processing...');

        try {
            if (input.startsWith('/')) {
                await this.executeBuiltIn(input);
            } else {
                await this.executeIntent(input);
            }
        } catch (err) {
            this.log('Error', `Execution Failed: ${err.message}`);
        } finally {
            this.setStatus('Idle');
        }
    }

    async executeBuiltIn(cmd) {
        const args = cmd.slice(1).split(' ');
        const command = args.shift().toLowerCase();

        switch (command) {
            case 'clear':
                this.dom.output.innerHTML = '';
                break;
            case 'help':
                this.log('System', 'Universal Architect Commands:\n/clear - Clear terminal\n/status - System status\n[Natural Language] - Execute intent');
                break;
            default:
                this.log('Error', `Unknown directive: ${command}`);
        }
    }

    async executeIntent(prompt) {
        // This is where "Gemini" would normally parse the natural language.
        // As per instructions, we act as the Universal Architect.
        // We will simulate the "discerning of intent" locally for the demo.

        const lowerPrompt = prompt.toLowerCase();
        this.log('System', 'Analyzing intent...');

        // Mocking the AI processing time
        await new Promise(r => setTimeout(r, 400));

        // Intent Mapping
        if (lowerPrompt.includes('open') || lowerPrompt.includes('go to') || lowerPrompt.includes('navigate')) {
            this.handleNavigation(lowerPrompt);
        } else if (lowerPrompt.includes('clear cache') || lowerPrompt.includes('flush')) {
            this.handleMaintenance(lowerPrompt);
        } else if (lowerPrompt.includes('build') || lowerPrompt.includes('compile')) {
             this.handleBuild(lowerPrompt);
        } else {
            // Fallback to "Gemini" response simulation
            this.log('System', `<b>Gemini-CLI:</b> I've analyzed your request "${prompt}". To execute this, I would need access to the specific Joomla API endpoints. Since I am in "Universal Architect" mode, please confirm if you want me to attempt a DOM-based interaction.`);
        }
    }

    handleNavigation(prompt) {
        let target = '';
        let name = '';

        if (prompt.includes('article')) {
            target = 'index.php?option=com_content';
            name = 'Article Manager';
        } else if (prompt.includes('plugin')) {
            target = 'index.php?option=com_plugins';
            name = 'Plugin Manager';
        } else if (prompt.includes('module')) {
            target = 'index.php?option=com_modules';
            name = 'Module Manager';
        } else if (prompt.includes('global') || prompt.includes('config')) {
            target = 'index.php?option=com_config';
            name = 'Global Configuration';
        } else if (prompt.includes('yootheme') || prompt.includes('builder')) {
            // Precise target for Yootheme might vary, attempting standard
            target = 'index.php?option=com_ajax&template=yootheme&style=1&format=html';
            // Or often: index.php?option=com_templates&view=style&layout=edit&id=X
            // Let's assume we want to just go to the template manager if we can't be sure
            if (prompt.includes('builder')) {
                 this.log('System', 'Locating Yootheme Builder...');
                 // In a real scenario, we might fetch the ID first.
                 target = 'index.php?option=com_templates&view=style&layout=edit&id=1';
                 name = 'Yootheme Builder (Assumed ID 1)';
            } else {
                 target = 'index.php?option=com_templates';
                 name = 'Template Manager';
            }
        }

        if (target) {
            this.log('Success', `Navigating to **${name}**...`);
            // In a real browser action, we might wait 1s so the user sees the message
            setTimeout(() => {
                window.location.href = target;
            }, 800);
        } else {
            this.log('Error', 'Destination unclear. Please specify component or area.');
        }
    }

    handleMaintenance(prompt) {
        this.log('System', 'Initiating maintenance protocol...');
        if (prompt.includes('cache')) {
            // Mocking the action
            this.log('Success', 'System Cache: **CLEARED**');
            this.log('Success', 'Expired Cache: **PURGED**');
        }
    }

    handleBuild(prompt) {
        // Mocking Yootheme LESS compilation or similar
        this.log('System', 'Triggering style compilation...');
        setTimeout(() => {
            this.log('Success', 'Styles recompiled. Assets updated.');
        }, 1200);
    }
}

// Instantiate on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Mock Joomla.getOptions if missing (for testing outside Joomla)
        if (typeof Joomla === 'undefined') {
            window.Joomla = {
                getOptions: () => ({ activationKey: '`', apiKey: '' })
            };
        }
        new GeminiTerminal();
    });
} else {
    new GeminiTerminal();
}
