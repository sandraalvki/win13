class Windows13 {
    constructor() {
        this.currentUser = 'User';
        this.currentFontSize = 'medium';
        this.openWindows = [];
        this.windowZIndex = 1000;
        this.activeWindow = null;
        this.draggedWindow = null;
        this.virtualKeyboardVisible = false;
        this.startMenuVisible = false;
        
        this.init();
    }

    init() {
        this.startupSequence();
        this.setupEventListeners();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    startupSequence() {
        const startupScreen = document.getElementById('startup-screen');
        const loginScreen = document.getElementById('login-screen');
        
        // Simulate startup loading
        setTimeout(() => {
            startupScreen.classList.add('hidden');
            loginScreen.classList.remove('hidden');
        }, 4000);
    }

    setupEventListeners() {
        // Login functionality
        document.getElementById('login-btn').addEventListener('click', () => this.login());
        document.getElementById('password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.login();
        });

        // Profile picture change
        document.getElementById('change-profile').addEventListener('click', () => {
            document.getElementById('profile-upload').click();
        });

        document.getElementById('profile-upload').addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('profile-img').src = e.target.result;
                    document.querySelector('.user-avatar').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Password toggle
        document.getElementById('toggle-password').addEventListener('click', () => {
            const passwordInput = document.getElementById('password');
            passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        });

        // Virtual keyboard
        document.getElementById('virtual-keyboard').addEventListener('click', () => {
            this.toggleVirtualKeyboard();
        });

        // Font size toggle
        document.getElementById('font-size').addEventListener('click', () => {
            this.cycleFontSize();
        });

        // Start menu
        document.getElementById('start-btn').addEventListener('click', () => {
            this.toggleStartMenu();
        });

        // Desktop icons
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('dblclick', () => {
                const app = icon.dataset.app;
                this.openApp(app);
            });
        });

        // App tiles
        document.querySelectorAll('.app-tile').forEach(tile => {
            tile.addEventListener('click', () => {
                const app = tile.dataset.app;
                this.openApp(app);
                this.toggleStartMenu();
            });
        });

        // App search
        document.getElementById('app-search').addEventListener('input', (e) => {
            this.searchApps(e.target.value);
        });

        // Virtual keyboard keys
        document.querySelectorAll('.key').forEach(key => {
            key.addEventListener('click', () => {
                this.handleVirtualKeyPress(key);
            });
        });

        // Click outside to close menus
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.start-menu') && !e.target.closest('.start-btn')) {
                if (this.startMenuVisible) {
                    this.toggleStartMenu();
                }
            }
        });

        // Window dragging
        document.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-header')) {
                this.startDragging(e);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.draggedWindow) {
                this.dragWindow(e);
            }
        });

        document.addEventListener('mouseup', () => {
            this.stopDragging();
        });
    }

    login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username.trim()) {
            this.currentUser = username;
            document.querySelector('.user-name').textContent = username;
            document.querySelector('.username-display').textContent = username;
            
            // Hide login screen and show desktop
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('desktop').classList.remove('hidden');
            
            // Welcome notification
            this.showNotification(`Welcome back, ${username}!`);
        }
    }

    toggleVirtualKeyboard() {
        const keyboard = document.getElementById('virtual-keyboard');
        this.virtualKeyboardVisible = !this.virtualKeyboardVisible;
        
        if (this.virtualKeyboardVisible) {
            keyboard.classList.remove('hidden');
        } else {
            keyboard.classList.add('hidden');
        }
    }

    cycleFontSize() {
        const sizes = ['small', 'medium', 'large'];
        const currentIndex = sizes.indexOf(this.currentFontSize);
        const nextIndex = (currentIndex + 1) % sizes.length;
        this.currentFontSize = sizes[nextIndex];
        
        document.body.className = `font-${this.currentFontSize}`;
        this.showNotification(`Font size: ${this.currentFontSize}`);
    }

    toggleStartMenu() {
        const startMenu = document.getElementById('start-menu');
        this.startMenuVisible = !this.startMenuVisible;
        
        if (this.startMenuVisible) {
            startMenu.classList.remove('hidden');
        } else {
            startMenu.classList.add('hidden');
        }
    }

    searchApps(query) {
        const appTiles = document.querySelectorAll('.app-tile');
        const categories = document.querySelectorAll('.app-category');
        
        if (!query.trim()) {
            appTiles.forEach(tile => tile.style.display = 'flex');
            categories.forEach(cat => cat.style.display = 'block');
            return;
        }
        
        appTiles.forEach(tile => {
            const appName = tile.querySelector('.app-name').textContent.toLowerCase();
            const matches = appName.includes(query.toLowerCase());
            tile.style.display = matches ? 'flex' : 'none';
        });
        
        categories.forEach(category => {
            const visibleTiles = category.querySelectorAll('.app-tile[style*="flex"]');
            category.style.display = visibleTiles.length > 0 ? 'block' : 'none';
        });
    }

    handleVirtualKeyPress(key) {
        const activeElement = document.activeElement;
        const keyText = key.textContent;
        
        if (keyText === 'Space') {
            this.insertText(' ');
        } else if (keyText === 'Enter') {
            if (activeElement.tagName === 'INPUT') {
                activeElement.form?.submit();
            }
        } else if (keyText === '⌫') {
            this.deleteText();
        } else if (keyText === 'Shift') {
            // Toggle shift state
            key.classList.toggle('active');
        } else {
            this.insertText(keyText);
        }
    }

    insertText(text) {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
            const start = activeElement.selectionStart;
            const end = activeElement.selectionEnd;
            const value = activeElement.value;
            
            activeElement.value = value.substring(0, start) + text + value.substring(end);
            activeElement.setSelectionRange(start + text.length, start + text.length);
        }
    }

    deleteText() {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
            const start = activeElement.selectionStart;
            const end = activeElement.selectionEnd;
            const value = activeElement.value;
            
            if (start === end && start > 0) {
                activeElement.value = value.substring(0, start - 1) + value.substring(end);
                activeElement.setSelectionRange(start - 1, start - 1);
            } else if (start !== end) {
                activeElement.value = value.substring(0, start) + value.substring(end);
                activeElement.setSelectionRange(start, start);
            }
        }
    }

    openApp(appName) {
        const existingWindow = this.openWindows.find(w => w.appName === appName);
        if (existingWindow) {
            this.focusWindow(existingWindow);
            return;
        }

        const window = this.createWindow(appName);
        this.openWindows.push(window);
        this.addToTaskbar(window);
        this.focusWindow(window);
    }

    createWindow(appName) {
        const windowsContainer = document.getElementById('windows-container');
        const window = document.createElement('div');
        window.className = 'window';
        window.style.left = `${50 + this.openWindows.length * 30}px`;
        window.style.top = `${50 + this.openWindows.length * 30}px`;
        window.style.width = '800px';
        window.style.height = '600px';
        window.style.zIndex = ++this.windowZIndex;

        const app = window13Apps[appName] || window13Apps.default;
        
        window.innerHTML = `
            <div class="window-header">
                <div class="window-title">
                    <span>${app.icon}</span>
                    <span>${app.title}</span>
                </div>
                <div class="window-controls">
                    <button class="window-control minimize" onclick="windows13.minimizeWindow(this)"></button>
                    <button class="window-control maximize" onclick="windows13.maximizeWindow(this)"></button>
                    <button class="window-control close" onclick="windows13.closeWindow(this)"></button>
                </div>
            </div>
            <div class="window-content">
                ${app.content}
            </div>
        `;

        windowsContainer.appendChild(window);

        const windowObj = {
            element: window,
            appName: appName,
            title: app.title,
            icon: app.icon,
            minimized: false,
            maximized: false
        };

        // Initialize app-specific functionality
        if (app.init) {
            app.init(window);
        }

        return windowObj;
    }

    focusWindow(windowObj) {
        this.activeWindow = windowObj;
        windowObj.element.style.zIndex = ++this.windowZIndex;
        
        // Update taskbar
        document.querySelectorAll('.taskbar-app').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const taskbarBtn = document.querySelector(`[data-window="${windowObj.appName}"]`);
        if (taskbarBtn) {
            taskbarBtn.classList.add('active');
        }
    }

    minimizeWindow(btn) {
        const window = btn.closest('.window');
        const windowObj = this.openWindows.find(w => w.element === window);
        
        if (windowObj) {
            windowObj.minimized = true;
            window.style.display = 'none';
            
            const taskbarBtn = document.querySelector(`[data-window="${windowObj.appName}"]`);
            if (taskbarBtn) {
                taskbarBtn.classList.remove('active');
            }
        }
    }

    maximizeWindow(btn) {
        const window = btn.closest('.window');
        const windowObj = this.openWindows.find(w => w.element === window);
        
        if (windowObj) {
            windowObj.maximized = !windowObj.maximized;
            
            if (windowObj.maximized) {
                window.classList.add('maximized');
            } else {
                window.classList.remove('maximized');
            }
        }
    }

    closeWindow(btn) {
        const window = btn.closest('.window');
        const windowObj = this.openWindows.find(w => w.element === window);
        
        if (windowObj) {
            this.removeFromTaskbar(windowObj);
            this.openWindows = this.openWindows.filter(w => w !== windowObj);
            window.remove();
        }
    }

    addToTaskbar(windowObj) {
        const taskbarApps = document.getElementById('taskbar-apps');
        const button = document.createElement('button');
        button.className = 'taskbar-app';
        button.dataset.window = windowObj.appName;
        button.innerHTML = `
            <span>${windowObj.icon}</span>
            <span>${windowObj.title}</span>
        `;
        
        button.addEventListener('click', () => {
            if (windowObj.minimized) {
                windowObj.minimized = false;
                windowObj.element.style.display = 'block';
                this.focusWindow(windowObj);
            } else {
                this.focusWindow(windowObj);
            }
        });
        
        taskbarApps.appendChild(button);
    }

    removeFromTaskbar(windowObj) {
        const taskbarBtn = document.querySelector(`[data-window="${windowObj.appName}"]`);
        if (taskbarBtn) {
            taskbarBtn.remove();
        }
    }

    startDragging(e) {
        const window = e.target.closest('.window');
        if (window && !window.classList.contains('maximized')) {
            this.draggedWindow = window;
            this.dragOffset = {
                x: e.clientX - window.offsetLeft,
                y: e.clientY - window.offsetTop
            };
            
            const windowObj = this.openWindows.find(w => w.element === window);
            if (windowObj) {
                this.focusWindow(windowObj);
            }
        }
    }

    dragWindow(e) {
        if (this.draggedWindow) {
            const newX = e.clientX - this.dragOffset.x;
            const newY = e.clientY - this.dragOffset.y;
            
            this.draggedWindow.style.left = `${Math.max(0, newX)}px`;
            this.draggedWindow.style.top = `${Math.max(0, newY)}px`;
        }
    }

    stopDragging() {
        this.draggedWindow = null;
        this.dragOffset = null;
    }

    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        const dateString = now.toLocaleDateString([], { 
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        
        document.getElementById('clock').innerHTML = `
            <div>${timeString}</div>
            <div style="font-size: 0.7rem; opacity: 0.8;">${dateString}</div>
        `;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.windows13 = new Windows13();
});

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .font-small {
        font-size: 0.9rem;
    }
    
    .font-medium {
        font-size: 1rem;
    }
    
    .font-large {
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);

