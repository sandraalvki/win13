// Windows 13 Applications
const window13Apps = {
    'calculator': {
        title: 'Calculator',
        icon: '🔢',
        content: `
            <div class="calculator">
                <div class="calc-display">
                    <div class="calc-screen">0</div>
                </div>
                <div class="calc-buttons">
                    <button class="calc-btn clear">C</button>
                    <button class="calc-btn">±</button>
                    <button class="calc-btn">%</button>
                    <button class="calc-btn operator">÷</button>
                    <button class="calc-btn number">7</button>
                    <button class="calc-btn number">8</button>
                    <button class="calc-btn number">9</button>
                    <button class="calc-btn operator">×</button>
                    <button class="calc-btn number">4</button>
                    <button class="calc-btn number">5</button>
                    <button class="calc-btn number">6</button>
                    <button class="calc-btn operator">−</button>
                    <button class="calc-btn number">1</button>
                    <button class="calc-btn number">2</button>
                    <button class="calc-btn number">3</button>
                    <button class="calc-btn operator">+</button>
                    <button class="calc-btn number zero">0</button>
                    <button class="calc-btn">.</button>
                    <button class="calc-btn operator">=</button>
                </div>
                <style>
                    .calculator {
                        max-width: 300px;
                        margin: 0 auto;
                        background: #2d2d2d;
                        border-radius: 15px;
                        padding: 20px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    }
                    .calc-display {
                        background: #000;
                        border-radius: 10px;
                        margin-bottom: 15px;
                        padding: 20px;
                    }
                    .calc-screen {
                        color: white;
                        font-size: 2rem;
                        text-align: right;
                        font-weight: 300;
                        min-height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .calc-buttons {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 10px;
                    }
                    .calc-btn {
                        aspect-ratio: 1;
                        border: none;
                        border-radius: 50%;
                        font-size: 1.2rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s;
                        background: #666;
                        color: white;
                    }
                    .calc-btn:hover {
                        transform: scale(1.05);
                    }
                    .calc-btn.operator {
                        background: #ff9500;
                    }
                    .calc-btn.clear {
                        background: #a6a6a6;
                        color: black;
                    }
                    .calc-btn.zero {
                        grid-column: span 2;
                        border-radius: 25px;
                    }
                </style>
            </div>
        `,
        init: function(window) {
            const screen = window.querySelector('.calc-screen');
            const buttons = window.querySelectorAll('.calc-btn');
            let currentValue = '0';
            let operator = null;
            let previousValue = null;
            let waitingForNewValue = false;

            function updateScreen() {
                screen.textContent = currentValue;
            }

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.textContent;
                    
                    if (button.classList.contains('number')) {
                        if (waitingForNewValue) {
                            currentValue = value;
                            waitingForNewValue = false;
                        } else {
                            currentValue = currentValue === '0' ? value : currentValue + value;
                        }
                    } else if (button.classList.contains('operator')) {
                        if (value === '=') {
                            if (operator && previousValue !== null) {
                                const prev = parseFloat(previousValue);
                                const current = parseFloat(currentValue);
                                
                                switch (operator) {
                                    case '+':
                                        currentValue = String(prev + current);
                                        break;
                                    case '−':
                                        currentValue = String(prev - current);
                                        break;
                                    case '×':
                                        currentValue = String(prev * current);
                                        break;
                                    case '÷':
                                        currentValue = String(prev / current);
                                        break;
                                }
                                
                                operator = null;
                                previousValue = null;
                                waitingForNewValue = true;
                            }
                        } else {
                            operator = value;
                            previousValue = currentValue;
                            waitingForNewValue = true;
                        }
                    } else if (button.classList.contains('clear')) {
                        currentValue = '0';
                        operator = null;
                        previousValue = null;
                        waitingForNewValue = false;
                    } else if (value === '.') {
                        if (currentValue.indexOf('.') === -1) {
                            currentValue += '.';
                        }
                    } else if (value === '±') {
                        currentValue = String(-parseFloat(currentValue));
                    } else if (value === '%') {
                        currentValue = String(parseFloat(currentValue) / 100);
                    }
                    
                    updateScreen();
                });
            });
        }
    },

    'notepad': {
        title: 'Notepad',
        icon: '📝',
        content: `
            <div class="notepad">
                <div class="notepad-toolbar">
                    <button class="toolbar-btn" onclick="this.parentElement.nextElementSibling.querySelector('textarea').value=''">New</button>
                    <button class="toolbar-btn" onclick="window.print()">Print</button>
                    <button class="toolbar-btn" onclick="document.execCommand('undo')">Undo</button>
                    <button class="toolbar-btn" onclick="document.execCommand('redo')">Redo</button>
                </div>
                <textarea class="notepad-content" placeholder="Start typing..."></textarea>
                <style>
                    .notepad {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    .notepad-toolbar {
                        display: flex;
                        gap: 10px;
                        padding: 10px;
                        background: #f5f5f5;
                        border-bottom: 1px solid #ddd;
                    }
                    .toolbar-btn {
                        padding: 8px 16px;
                        border: 1px solid #ddd;
                        background: white;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .toolbar-btn:hover {
                        background: #e9e9e9;
                    }
                    .notepad-content {
                        flex: 1;
                        padding: 20px;
                        border: none;
                        outline: none;
                        font-family: 'Courier New', monospace;
                        font-size: 14px;
                        line-height: 1.5;
                        resize: none;
                    }
                </style>
            </div>
        `
    },

    'file-explorer': {
        title: 'File Explorer',
        icon: '📁',
        content: `
            <div class="file-explorer">
                <div class="explorer-toolbar">
                    <button class="nav-btn" onclick="explorerGoBack()">← Back</button>
                    <button class="nav-btn" onclick="explorerGoForward()">Forward →</button>
                    <button class="nav-btn" onclick="explorerGoUp()">↑ Up</button>
                    <div class="address-bar">
                        <input type="text" value="C:\\Users\\${window.windows13?.currentUser || 'User'}\\Documents" readonly>
                    </div>
                </div>
                <div class="explorer-content">
                    <div class="explorer-sidebar">
                        <div class="sidebar-item" onclick="explorerNavigate('desktop')">
                            <span class="folder-icon">🖥️</span>
                            <span>Desktop</span>
                        </div>
                        <div class="sidebar-item" onclick="explorerNavigate('documents')">
                            <span class="folder-icon">📁</span>
                            <span>Documents</span>
                        </div>
                        <div class="sidebar-item" onclick="explorerNavigate('downloads')">
                            <span class="folder-icon">📥</span>
                            <span>Downloads</span>
                        </div>
                        <div class="sidebar-item" onclick="explorerNavigate('pictures')">
                            <span class="folder-icon">📷</span>
                            <span>Pictures</span>
                        </div>
                        <div class="sidebar-item" onclick="explorerNavigate('music')">
                            <span class="folder-icon">🎵</span>
                            <span>Music</span>
                        </div>
                        <div class="sidebar-item" onclick="explorerNavigate('videos')">
                            <span class="folder-icon">🎬</span>
                            <span>Videos</span>
                        </div>
                    </div>
                    <div class="explorer-main">
                        <div class="file-grid" id="file-grid">
                            <div class="file-item folder" onclick="explorerOpenFolder('Projects')">
                                <div class="file-icon">📁</div>
                                <div class="file-name">Projects</div>
                            </div>
                            <div class="file-item folder" onclick="explorerOpenFolder('Photos')">
                                <div class="file-icon">📁</div>
                                <div class="file-name">Photos</div>
                            </div>
                            <div class="file-item file">
                                <div class="file-icon">📄</div>
                                <div class="file-name">README.txt</div>
                            </div>
                            <div class="file-item file">
                                <div class="file-icon">📊</div>
                                <div class="file-name">Budget.xlsx</div>
                            </div>
                            <div class="file-item file">
                                <div class="file-icon">🖼️</div>
                                <div class="file-name">vacation.jpg</div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    .file-explorer {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    .explorer-toolbar {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 10px;
                        background: #f5f5f5;
                        border-bottom: 1px solid #ddd;
                    }
                    .nav-btn {
                        padding: 8px 12px;
                        border: 1px solid #ddd;
                        background: white;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.2s;
                    }
                    .nav-btn:hover {
                        background: #e9e9e9;
                    }
                    .address-bar {
                        flex: 1;
                        margin-left: 10px;
                    }
                    .address-bar input {
                        width: 100%;
                        padding: 8px 12px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        background: white;
                    }
                    .explorer-content {
                        flex: 1;
                        display: flex;
                    }
                    .explorer-sidebar {
                        width: 200px;
                        background: #f9f9f9;
                        border-right: 1px solid #ddd;
                        padding: 10px;
                    }
                    .sidebar-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 8px 12px;
                        cursor: pointer;
                        border-radius: 4px;
                        transition: all 0.2s;
                    }
                    .sidebar-item:hover {
                        background: #e9e9e9;
                    }
                    .folder-icon {
                        font-size: 1.2rem;
                    }
                    .explorer-main {
                        flex: 1;
                        padding: 20px;
                        overflow-y: auto;
                    }
                    .file-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                        gap: 20px;
                    }
                    .file-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: all 0.2s;
                        text-align: center;
                    }
                    .file-item:hover {
                        background: #f0f0f0;
                    }
                    .file-icon {
                        font-size: 2.5rem;
                        margin-bottom: 8px;
                    }
                    .file-name {
                        font-size: 0.9rem;
                        word-break: break-word;
                    }
                </style>
            </div>
        `
    },

    'browser': {
        title: 'Windows Browser',
        icon: '🌐',
        content: `
            <div class="browser">
                <div class="browser-toolbar">
                    <button class="nav-btn" onclick="browserGoBack()">←</button>
                    <button class="nav-btn" onclick="browserGoForward()">→</button>
                    <button class="nav-btn" onclick="browserRefresh()">↻</button>
                    <div class="address-bar">
                        <input type="text" id="browser-url" value="https://www.example.com" 
                               onkeypress="if(event.key==='Enter') browserNavigate()">
                    </div>
                    <button class="nav-btn" onclick="browserNavigate()">Go</button>
                </div>
                <div class="browser-content" id="browser-content">
                    <div class="web-page">
                        <div class="page-header">
                            <h1>Welcome to Windows 13 Browser</h1>
                            <p>Your gateway to the simulated web</p>
                        </div>
                        <div class="page-content">
                            <div class="bookmark-section">
                                <h2>Quick Links</h2>
                                <div class="bookmark-grid">
                                    <div class="bookmark" onclick="browserLoadPage('search')">
                                        <div class="bookmark-icon">🔍</div>
                                        <div class="bookmark-name">Search</div>
                                    </div>
                                    <div class="bookmark" onclick="browserLoadPage('news')">
                                        <div class="bookmark-icon">📰</div>
                                        <div class="bookmark-name">News</div>
                                    </div>
                                    <div class="bookmark" onclick="browserLoadPage('weather')">
                                        <div class="bookmark-icon">🌤️</div>
                                        <div class="bookmark-name">Weather</div>
                                    </div>
                                    <div class="bookmark" onclick="browserLoadPage('social')">
                                        <div class="bookmark-icon">👥</div>
                                        <div class="bookmark-name">Social</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    .browser {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    .browser-toolbar {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 10px;
                        background: #f5f5f5;
                        border-bottom: 1px solid #ddd;
                    }
                    .nav-btn {
                        padding: 8px 12px;
                        border: 1px solid #ddd;
                        background: white;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.2s;
                        font-size: 1rem;
                    }
                    .nav-btn:hover {
                        background: #e9e9e9;
                    }
                    .address-bar {
                        flex: 1;
                        margin: 0 10px;
                    }
                    .address-bar input {
                        width: 100%;
                        padding: 8px 12px;
                        border: 1px solid #ddd;
                        border-radius: 20px;
                        background: white;
                        font-size: 1rem;
                    }
                    .browser-content {
                        flex: 1;
                        overflow-y: auto;
                        background: white;
                    }
                    .web-page {
                        padding: 40px;
                        max-width: 1200px;
                        margin: 0 auto;
                    }
                    .page-header {
                        text-align: center;
                        margin-bottom: 40px;
                    }
                    .page-header h1 {
                        font-size: 2.5rem;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    .page-header p {
                        font-size: 1.2rem;
                        color: #666;
                    }
                    .bookmark-section h2 {
                        margin-bottom: 20px;
                        color: #333;
                    }
                    .bookmark-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        gap: 20px;
                    }
                    .bookmark {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 30px;
                        border: 2px solid #e0e0e0;
                        border-radius: 12px;
                        cursor: pointer;
                        transition: all 0.3s;
                        text-decoration: none;
                        color: #333;
                    }
                    .bookmark:hover {
                        border-color: #4ecdc4;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    }
                    .bookmark-icon {
                        font-size: 2.5rem;
                        margin-bottom: 10px;
                    }
                    .bookmark-name {
                        font-weight: 500;
                        font-size: 1.1rem;
                    }
                </style>
            </div>
        `
    },

    'media-player': {
        title: 'Media Player',
        icon: '🎵',
        content: `
            <div class="media-player">
                <div class="player-header">
                    <h2>🎵 Media Player</h2>
                    <div class="player-controls">
                        <button class="control-btn" onclick="mediaPlayerPrevious()">⏮️</button>
                        <button class="control-btn play-pause" onclick="mediaPlayerToggle()">▶️</button>
                        <button class="control-btn" onclick="mediaPlayerNext()">⏭️</button>
                    </div>
                </div>
                <div class="now-playing">
                    <div class="album-art">🎨</div>
                    <div class="track-info">
                        <div class="track-title">No track selected</div>
                        <div class="track-artist">Select a song to play</div>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <div class="time-info">
                    <span class="current-time">0:00</span>
                    <span class="total-time">0:00</span>
                </div>
                <div class="playlist">
                    <h3>Playlist</h3>
                    <div class="playlist-items">
                        <div class="playlist-item" onclick="mediaPlayerPlay(0)">
                            <div class="track-icon">🎵</div>
                            <div class="track-details">
                                <div class="track-name">Demo Song 1</div>
                                <div class="track-artist">Sample Artist</div>
                            </div>
                            <div class="track-duration">3:45</div>
                        </div>
                        <div class="playlist-item" onclick="mediaPlayerPlay(1)">
                            <div class="track-icon">🎵</div>
                            <div class="track-details">
                                <div class="track-name">Demo Song 2</div>
                                <div class="track-artist">Sample Artist</div>
                            </div>
                            <div class="track-duration">4:12</div>
                        </div>
                        <div class="playlist-item" onclick="mediaPlayerPlay(2)">
                            <div class="track-icon">🎵</div>
                            <div class="track-details">
                                <div class="track-name">Demo Song 3</div>
                                <div class="track-artist">Sample Artist</div>
                            </div>
                            <div class="track-duration">3:28</div>
                        </div>
                    </div>
                </div>
                <style>
                    .media-player {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 20px;
                    }
                    .player-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 30px;
                    }
                    .player-header h2 {
                        margin: 0;
                        font-size: 1.5rem;
                    }
                    .player-controls {
                        display: flex;
                        gap: 10px;
                    }
                    .control-btn {
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        padding: 10px 15px;
                        border-radius: 50%;
                        cursor: pointer;
                        font-size: 1.2rem;
                        transition: all 0.3s;
                    }
                    .control-btn:hover {
                        background: rgba(255,255,255,0.3);
                        transform: scale(1.05);
                    }
                    .now-playing {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                        margin-bottom: 20px;
                        padding: 20px;
                        background: rgba(255,255,255,0.1);
                        border-radius: 15px;
                    }
                    .album-art {
                        width: 80px;
                        height: 80px;
                        background: rgba(255,255,255,0.2);
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2rem;
                    }
                    .track-info {
                        flex: 1;
                    }
                    .track-title {
                        font-size: 1.2rem;
                        font-weight: 600;
                        margin-bottom: 5px;
                    }
                    .track-artist {
                        opacity: 0.8;
                    }
                    .progress-bar {
                        height: 4px;
                        background: rgba(255,255,255,0.2);
                        border-radius: 2px;
                        margin-bottom: 10px;
                        overflow: hidden;
                    }
                    .progress-fill {
                        height: 100%;
                        background: white;
                        transition: width 0.3s;
                    }
                    .time-info {
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.9rem;
                        opacity: 0.8;
                        margin-bottom: 30px;
                    }
                    .playlist {
                        flex: 1;
                        overflow-y: auto;
                    }
                    .playlist h3 {
                        margin: 0 0 15px 0;
                        font-size: 1.1rem;
                    }
                    .playlist-items {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .playlist-item {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 15px;
                        background: rgba(255,255,255,0.1);
                        border-radius: 10px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .playlist-item:hover {
                        background: rgba(255,255,255,0.2);
                    }
                    .track-icon {
                        font-size: 1.5rem;
                    }
                    .track-details {
                        flex: 1;
                    }
                    .track-name {
                        font-weight: 500;
                        margin-bottom: 2px;
                    }
                    .track-artist {
                        font-size: 0.9rem;
                        opacity: 0.8;
                    }
                    .track-duration {
                        font-size: 0.9rem;
                        opacity: 0.8;
                    }
                </style>
            </div>
        `
    },

    'email': {
        title: 'Mail',
        icon: '📧',
        content: `
            <div class="email-client">
                <div class="email-sidebar">
                    <button class="compose-btn" onclick="emailCompose()">✉️ Compose</button>
                    <div class="email-folders">
                        <div class="folder-item active" onclick="emailShowFolder('inbox')">
                            📥 Inbox <span class="unread-count">3</span>
                        </div>
                        <div class="folder-item" onclick="emailShowFolder('sent')">
                            📤 Sent
                        </div>
                        <div class="folder-item" onclick="emailShowFolder('drafts')">
                            📝 Drafts
                        </div>
                        <div class="folder-item" onclick="emailShowFolder('trash')">
                            🗑️ Trash
                        </div>
                    </div>
                </div>
                <div class="email-main">
                    <div class="email-list" id="email-list">
                        <div class="email-item unread" onclick="emailOpen(0)">
                            <div class="email-sender">Windows Team</div>
                            <div class="email-subject">Welcome to Windows 13!</div>
                            <div class="email-preview">Thank you for choosing Windows 13. Here's what's new...</div>
                            <div class="email-time">2 hours ago</div>
                        </div>
                        <div class="email-item unread" onclick="emailOpen(1)">
                            <div class="email-sender">System Administrator</div>
                            <div class="email-subject">System Update Available</div>
                            <div class="email-preview">A new system update is ready to install...</div>
                            <div class="email-time">5 hours ago</div>
                        </div>
                        <div class="email-item unread" onclick="emailOpen(2)">
                            <div class="email-sender">Newsletter</div>
                            <div class="email-subject">Weekly Tech News</div>
                            <div class="email-preview">This week's top technology stories...</div>
                            <div class="email-time">1 day ago</div>
                        </div>
                        <div class="email-item" onclick="emailOpen(3)">
                            <div class="email-sender">Support Team</div>
                            <div class="email-subject">Your Question Answered</div>
                            <div class="email-preview">Thank you for contacting support. Here's the answer...</div>
                            <div class="email-time">2 days ago</div>
                        </div>
                    </div>
                </div>
                <style>
                    .email-client {
                        height: 100%;
                        display: flex;
                    }
                    .email-sidebar {
                        width: 200px;
                        background: #f8f9fa;
                        border-right: 1px solid #e9ecef;
                        padding: 20px;
                    }
                    .compose-btn {
                        width: 100%;
                        padding: 12px;
                        background: #007bff;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 1rem;
                        margin-bottom: 20px;
                        transition: all 0.3s;
                    }
                    .compose-btn:hover {
                        background: #0056b3;
                    }
                    .email-folders {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                    }
                    .folder-item {
                        padding: 10px 15px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.3s;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .folder-item:hover {
                        background: #e9ecef;
                    }
                    .folder-item.active {
                        background: #007bff;
                        color: white;
                    }
                    .unread-count {
                        background: #dc3545;
                        color: white;
                        border-radius: 50%;
                        padding: 2px 6px;
                        font-size: 0.8rem;
                        font-weight: bold;
                    }
                    .email-main {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                    .email-list {
                        flex: 1;
                        overflow-y: auto;
                    }
                    .email-item {
                        padding: 15px 20px;
                        border-bottom: 1px solid #e9ecef;
                        cursor: pointer;
                        transition: all 0.3s;
                        display: grid;
                        grid-template-columns: 1fr 100px;
                        grid-template-rows: auto auto;
                        gap: 5px;
                    }
                    .email-item:hover {
                        background: #f8f9fa;
                    }
                    .email-item.unread {
                        background: #fff3cd;
                        font-weight: 600;
                    }
                    .email-sender {
                        font-weight: 600;
                        color: #333;
                    }
                    .email-subject {
                        font-size: 1.1rem;
                        color: #333;
                        margin-bottom: 5px;
                    }
                    .email-preview {
                        color: #666;
                        font-size: 0.9rem;
                        grid-column: 1;
                    }
                    .email-time {
                        color: #999;
                        font-size: 0.8rem;
                        text-align: right;
                        grid-column: 2;
                        grid-row: 1;
                    }
                </style>
            </div>
        `
    },

    'solitaire': {
        title: 'Solitaire',
        icon: '🃏',
        content: `
            <div class="solitaire-game">
                <div class="game-header">
                    <h2>🃏 Solitaire</h2>
                    <div class="game-controls">
                        <button class="game-btn" onclick="solitaireNewGame()">New Game</button>
                        <button class="game-btn" onclick="solitaireUndo()">Undo</button>
                        <div class="score">Score: <span id="solitaire-score">0</span></div>
                    </div>
                </div>
                <div class="game-board">
                    <div class="top-row">
                        <div class="deck-area">
                            <div class="deck-slot" id="deck">🂠</div>
                            <div class="deck-slot" id="waste">🃁</div>
                        </div>
                        <div class="foundation-area">
                            <div class="foundation-slot" id="foundation-1">🃁</div>
                            <div class="foundation-slot" id="foundation-2">🃁</div>
                            <div class="foundation-slot" id="foundation-3">🃁</div>
                            <div class="foundation-slot" id="foundation-4">🃁</div>
                        </div>
                    </div>
                    <div class="tableau-area">
                        <div class="tableau-column" id="tableau-1">
                            <div class="card">🂡</div>
                        </div>
                        <div class="tableau-column" id="tableau-2">
                            <div class="card face-down">🂠</div>
                            <div class="card">🂢</div>
                        </div>
                        <div class="tableau-column" id="tableau-3">
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card">🂣</div>
                        </div>
                        <div class="tableau-column" id="tableau-4">
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card">🂤</div>
                        </div>
                        <div class="tableau-column" id="tableau-5">
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card">🂥</div>
                        </div>
                        <div class="tableau-column" id="tableau-6">
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card">🂦</div>
                        </div>
                        <div class="tableau-column" id="tableau-7">
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card face-down">🂠</div>
                            <div class="card">🂧</div>
                        </div>
                    </div>
                </div>
                <style>
                    .solitaire-game {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                        color: white;
                        padding: 20px;
                    }
                    .game-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 30px;
                    }
                    .game-header h2 {
                        margin: 0;
                        font-size: 1.5rem;
                    }
                    .game-controls {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }
                    .game-btn {
                        padding: 8px 16px;
                        background: rgba(255,255,255,0.2);
                        border: none;
                        border-radius: 6px;
                        color: white;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .game-btn:hover {
                        background: rgba(255,255,255,0.3);
                    }
                    .score {
                        font-weight: 600;
                        font-size: 1.1rem;
                    }
                    .game-board {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        gap: 30px;
                    }
                    .top-row {
                        display: flex;
                        justify-content: space-between;
                    }
                    .deck-area {
                        display: flex;
                        gap: 20px;
                    }
                    .foundation-area {
                        display: flex;
                        gap: 20px;
                    }
                    .deck-slot, .foundation-slot {
                        width: 80px;
                        height: 110px;
                        border: 2px dashed rgba(255,255,255,0.3);
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 2rem;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .deck-slot:hover, .foundation-slot:hover {
                        border-color: rgba(255,255,255,0.6);
                        background: rgba(255,255,255,0.1);
                    }
                    .tableau-area {
                        display: flex;
                        gap: 20px;
                        flex: 1;
                    }
                    .tableau-column {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                    }
                    .card {
                        width: 80px;
                        height: 110px;
                        background: white;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.8rem;
                        cursor: pointer;
                        transition: all 0.3s;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    }
                    .card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    }
                    .card.face-down {
                        background: #4a90e2;
                        color: white;
                    }
                    .card.selected {
                        border: 2px solid #ffc107;
                        transform: translateY(-5px);
                    }
                </style>
            </div>
        `
    },

    'minesweeper': {
        title: 'Minesweeper',
        icon: '💣',
        content: `
            <div class="minesweeper-game">
                <div class="game-header">
                    <h2>💣 Minesweeper</h2>
                    <div class="game-info">
                        <div class="mine-count">💣 <span id="mine-count">10</span></div>
                        <button class="game-btn" onclick="minesweeperNewGame()">😊 New Game</button>
                        <div class="timer">⏰ <span id="timer">000</span></div>
                    </div>
                </div>
                <div class="game-board" id="minesweeper-board">
                    <!-- Grid will be generated by JavaScript -->
                </div>
                <div class="game-controls">
                    <label>
                        Difficulty:
                        <select id="difficulty" onchange="minesweeperChangeDifficulty()">
                            <option value="easy">Easy (9x9, 10 mines)</option>
                            <option value="medium">Medium (16x16, 40 mines)</option>
                            <option value="hard">Hard (30x16, 99 mines)</option>
                        </select>
                    </label>
                </div>
                <style>
                    .minesweeper-game {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
                        color: white;
                        padding: 20px;
                        overflow: auto;
                    }
                    .game-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    .game-header h2 {
                        margin: 0;
                        font-size: 1.5rem;
                    }
                    .game-info {
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    }
                    .mine-count, .timer {
                        font-weight: 600;
                        font-size: 1.1rem;
                    }
                    .game-btn {
                        padding: 8px 16px;
                        background: rgba(255,255,255,0.2);
                        border: none;
                        border-radius: 6px;
                        color: white;
                        cursor: pointer;
                        transition: all 0.3s;
                        font-size: 1.1rem;
                    }
                    .game-btn:hover {
                        background: rgba(255,255,255,0.3);
                    }
                    .game-board {
                        display: grid;
                        grid-template-columns: repeat(9, 1fr);
                        gap: 2px;
                        background: #333;
                        padding: 10px;
                        border-radius: 10px;
                        justify-content: center;
                        max-width: fit-content;
                        margin: 0 auto;
                    }
                    .mine-cell {
                        width: 30px;
                        height: 30px;
                        background: #bbb;
                        border: 2px outset #bbb;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        font-weight: bold;
                        font-size: 0.9rem;
                        user-select: none;
                    }
                    .mine-cell:hover {
                        background: #ccc;
                    }
                    .mine-cell.revealed {
                        background: #eee;
                        border: 1px inset #eee;
                        cursor: default;
                    }
                    .mine-cell.flagged {
                        background: #ffeb3b;
                        color: #d32f2f;
                    }
                    .mine-cell.mine {
                        background: #f44336;
                        color: white;
                    }
                    .mine-cell.number-1 { color: #2196f3; }
                    .mine-cell.number-2 { color: #4caf50; }
                    .mine-cell.number-3 { color: #ff9800; }
                    .mine-cell.number-4 { color: #9c27b0; }
                    .mine-cell.number-5 { color: #795548; }
                    .mine-cell.number-6 { color: #607d8b; }
                    .mine-cell.number-7 { color: #000; }
                    .mine-cell.number-8 { color: #424242; }
                    .game-controls {
                        margin-top: 20px;
                        text-align: center;
                    }
                    .game-controls label {
                        font-weight: 500;
                    }
                    .game-controls select {
                        margin-left: 10px;
                        padding: 5px;
                        border-radius: 4px;
                        border: none;
                    }
                </style>
            </div>
        `
    },

    'settings': {
        title: 'Settings',
        icon: '⚙️',
        content: `
            <div class="settings-app">
                <div class="settings-sidebar">
                    <div class="settings-nav">
                        <div class="nav-item active" onclick="settingsShowPanel('system')">
                            <span class="nav-icon">💻</span>
                            <span>System</span>
                        </div>
                        <div class="nav-item" onclick="settingsShowPanel('personalization')">
                            <span class="nav-icon">🎨</span>
                            <span>Personalization</span>
                        </div>
                        <div class="nav-item" onclick="settingsShowPanel('apps')">
                            <span class="nav-icon">📱</span>
                            <span>Apps</span>
                        </div>
                        <div class="nav-item" onclick="settingsShowPanel('accounts')">
                            <span class="nav-icon">👤</span>
                            <span>Accounts</span>
                        </div>
                        <div class="nav-item" onclick="settingsShowPanel('time')">
                            <span class="nav-icon">⏰</span>
                            <span>Time & Language</span>
                        </div>
                        <div class="nav-item" onclick="settingsShowPanel('privacy')">
                            <span class="nav-icon">🔒</span>
                            <span>Privacy</span>
                        </div>
                        <div class="nav-item" onclick="settingsShowPanel('update')">
                            <span class="nav-icon">🔄</span>
                            <span>Windows Update</span>
                        </div>
                    </div>
                </div>
                <div class="settings-content">
                    <div class="settings-panel" id="system-panel">
                        <h1>System</h1>
                        <div class="settings-group">
                            <h3>About</h3>
                            <div class="setting-item">
                                <div class="setting-label">Device name</div>
                                <div class="setting-value">WINDOWS13-PC</div>
                            </div>
                            <div class="setting-item">
                                <div class="setting-label">Processor</div>
                                <div class="setting-value">Intel(R) Core(TM) i7-12700K</div>
                            </div>
                            <div class="setting-item">
                                <div class="setting-label">Installed RAM</div>
                                <div class="setting-value">16.0 GB</div>
                            </div>
                            <div class="setting-item">
                                <div class="setting-label">System type</div>
                                <div class="setting-value">64-bit operating system</div>
                            </div>
                            <div class="setting-item">
                                <div class="setting-label">Windows edition</div>
                                <div class="setting-value">Windows 13 Pro</div>
                            </div>
                        </div>
                    </div>
                    <div class="settings-panel hidden" id="personalization-panel">
                        <h1>Personalization</h1>
                        <div class="settings-group">
                            <h3>Background</h3>
                            <div class="setting-item">
                                <div class="setting-label">Background type</div>
                                <select class="setting-control">
                                    <option>Picture</option>
                                    <option>Solid color</option>
                                    <option>Slideshow</option>
                                </select>
                            </div>
                        </div>
                        <div class="settings-group">
                            <h3>Colors</h3>
                            <div class="setting-item">
                                <div class="setting-label">Accent color</div>
                                <div class="color-picker">
                                    <div class="color-option" style="background: #0078d4"></div>
                                    <div class="color-option" style="background: #107c10"></div>
                                    <div class="color-option" style="background: #881798"></div>
                                    <div class="color-option" style="background: #d83b01"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="settings-panel hidden" id="apps-panel">
                        <h1>Apps</h1>
                        <div class="settings-group">
                            <h3>Apps & Features</h3>
                            <div class="app-list">
                                <div class="app-item">
                                    <div class="app-info">
                                        <div class="app-name">Calculator</div>
                                        <div class="app-size">2.1 MB</div>
                                    </div>
                                    <button class="app-action">Modify</button>
                                </div>
                                <div class="app-item">
                                    <div class="app-info">
                                        <div class="app-name">Notepad</div>
                                        <div class="app-size">1.5 MB</div>
                                    </div>
                                    <button class="app-action">Modify</button>
                                </div>
                                <div class="app-item">
                                    <div class="app-info">
                                        <div class="app-name">Media Player</div>
                                        <div class="app-size">15.2 MB</div>
                                    </div>
                                    <button class="app-action">Modify</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    .settings-app {
                        height: 100%;
                        display: flex;
                        background: #f5f5f5;
                    }
                    .settings-sidebar {
                        width: 250px;
                        background: #fff;
                        border-right: 1px solid #e0e0e0;
                        padding: 20px 0;
                    }
                    .settings-nav {
                        display: flex;
                        flex-direction: column;
                    }
                    .nav-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 12px 20px;
                        cursor: pointer;
                        transition: all 0.3s;
                        border-left: 3px solid transparent;
                    }
                    .nav-item:hover {
                        background: #f0f0f0;
                    }
                    .nav-item.active {
                        background: #e3f2fd;
                        border-left-color: #2196f3;
                        color: #2196f3;
                    }
                    .nav-icon {
                        font-size: 1.2rem;
                    }
                    .settings-content {
                        flex: 1;
                        padding: 30px;
                        overflow-y: auto;
                    }
                    .settings-panel h1 {
                        margin: 0 0 30px 0;
                        font-size: 2rem;
                        color: #333;
                    }
                    .settings-group {
                        margin-bottom: 30px;
                        background: white;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .settings-group h3 {
                        margin: 0 0 20px 0;
                        color: #333;
                        font-size: 1.2rem;
                    }
                    .setting-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px 0;
                        border-bottom: 1px solid #f0f0f0;
                    }
                    .setting-item:last-child {
                        border-bottom: none;
                    }
                    .setting-label {
                        font-weight: 500;
                        color: #333;
                    }
                    .setting-value {
                        color: #666;
                    }
                    .setting-control {
                        padding: 8px 12px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        background: white;
                    }
                    .color-picker {
                        display: flex;
                        gap: 10px;
                    }
                    .color-option {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        cursor: pointer;
                        border: 2px solid transparent;
                        transition: all 0.3s;
                    }
                    .color-option:hover {
                        border-color: #333;
                    }
                    .app-list {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }
                    .app-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px;
                        background: #f9f9f9;
                        border-radius: 6px;
                    }
                    .app-info {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                    }
                    .app-name {
                        font-weight: 500;
                        color: #333;
                    }
                    .app-size {
                        color: #666;
                        font-size: 0.9rem;
                    }
                    .app-action {
                        padding: 8px 16px;
                        border: 1px solid #ddd;
                        background: white;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    .app-action:hover {
                        background: #f0f0f0;
                    }
                </style>
            </div>
        `
    },

    'default': {
        title: 'Unknown App',
        icon: '❓',
        content: `
            <div class="default-app">
                <div class="app-icon">❓</div>
                <h2>Application Not Found</h2>
                <p>This application is not yet implemented in Windows 13.</p>
                <p>Please check back later for updates!</p>
                <style>
                    .default-app {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        color: #666;
                    }
                    .default-app .app-icon {
                        font-size: 4rem;
                        margin-bottom: 20px;
                    }
                    .default-app h2 {
                        margin-bottom: 10px;
                        color: #333;
                    }
                    .default-app p {
                        margin-bottom: 10px;
                        line-height: 1.6;
                    }
                </style>
            </div>
        `
    }
};

// Global functions for app interactions
function explorerGoBack() {
    console.log('Explorer: Go back');
}

function explorerGoForward() {
    console.log('Explorer: Go forward');
}

function explorerGoUp() {
    console.log('Explorer: Go up');
}

function explorerNavigate(location) {
    console.log('Explorer: Navigate to', location);
}

function explorerOpenFolder(folderName) {
    console.log('Explorer: Open folder', folderName);
}

function browserGoBack() {
    console.log('Browser: Go back');
}

function browserGoForward() {
    console.log('Browser: Go forward');
}

function browserRefresh() {
    console.log('Browser: Refresh');
}

function browserNavigate() {
    const url = document.getElementById('browser-url').value;
    console.log('Browser: Navigate to', url);
}

function browserLoadPage(page) {
    console.log('Browser: Load page', page);
}

function mediaPlayerPrevious() {
    console.log('Media Player: Previous track');
}

function mediaPlayerToggle() {
    const button = document.querySelector('.play-pause');
    if (button.textContent === '▶️') {
        button.textContent = '⏸️';
        console.log('Media Player: Play');
    } else {
        button.textContent = '▶️';
        console.log('Media Player: Pause');
    }
}

function mediaPlayerNext() {
    console.log('Media Player: Next track');
}

function mediaPlayerPlay(trackIndex) {
    console.log('Media Player: Play track', trackIndex);
}

function emailCompose() {
    console.log('Email: Compose new message');
}

function emailShowFolder(folder) {
    console.log('Email: Show folder', folder);
}

function emailOpen(emailIndex) {
    console.log('Email: Open email', emailIndex);
}

function solitaireNewGame() {
    console.log('Solitaire: New game');
}

function solitaireUndo() {
    console.log('Solitaire: Undo move');
}

function minesweeperNewGame() {
    console.log('Minesweeper: New game');
}

function minesweeperChangeDifficulty() {
    console.log('Minesweeper: Change difficulty');
}

function settingsShowPanel(panelId) {
    // Hide all panels
    document.querySelectorAll('.settings-panel').forEach(panel => {
        panel.classList.add('hidden');
    });
    
    // Show selected panel
    document.getElementById(panelId + '-panel').classList.remove('hidden');
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    event.target.closest('.nav-item').classList.add('active');
}

