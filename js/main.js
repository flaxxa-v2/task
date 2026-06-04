const PROXY_BASE = "https://flaxxa-proxy.saddiqalhajba.workers.dev/";

const apps = [
    { name: "TikTok", url: "https://tiktok.com", category: "social", icon: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" },
    { name: "X", url: "https://x.com", category: "social", icon: "https://upload.wikimedia.org/wikipedia/commons/6/60/Twitter_Logo_2021.svg" },
    { name: "YouTube", url: "https://youtube.com", category: "streaming", icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" },
    { name: "Cookie Clicker", url: "https://orteil.dashnet.org/cookieclicker/", category: "games", icon: "https://picsum.photos/id/102/300/200" },
    { name: "1v1.lol", url: "https://1v1.lol", category: "games", icon: "https://picsum.photos/id/133/300/200" },
    { name: "BasketBros", url: "https://basketbros.io", category: "games", icon: "https://picsum.photos/id/201/300/200" },
    { name: "Neal.fun", url: "https://neal.fun", category: "games", icon: "https://picsum.photos/id/237/300/200" },
    { name: "Krunker.io", url: "https://krunker.io", category: "games", icon: "https://picsum.photos/id/180/300/200" },
    { name: "Slope", url: "https://slope-game.io", category: "games", icon: "https://picsum.photos/id/251/300/200" },
    { name: "Discord", url: "https://discord.com/app", category: "social", icon: "https://upload.wikimedia.org/wikipedia/commons/7/75/Discord_icon.svg" }
];

function renderApps(filteredApps) {
    const grid = document.getElementById('appsGrid');
    grid.innerHTML = '';

    filteredApps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <img src="${app.icon}" alt="${app.name}" onerror="this.src='https://picsum.photos/id/180/300/200'">
            <div class="app-info">
                <h4>${app.name}</h4>
            </div>
        `;
        card.addEventListener('click', () => openApp(app));
        grid.appendChild(card);
    });
}

function openApp(app) {
    const proxiedUrl = PROXY_BASE + "proxy/" + encodeURIComponent(app.url);
    const modal = document.getElementById('iframeModal');
    const frame = document.getElementById('appFrame');
    const title = document.getElementById('modalTitle');

    title.textContent = app.name;
    frame.src = proxiedUrl;
    modal.style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('iframeModal');
    const frame = document.getElementById('appFrame');
    modal.style.display = 'none';
    frame.src = '';
});

// Search
document.getElementById('searchBtn').addEventListener('click', () => {
    let query = document.getElementById('searchInput').value.trim();
    if (query) {
        if (!query.startsWith('http')) query = 'https://' + query;
        const proxiedUrl = PROXY_BASE + "proxy/" + encodeURIComponent(query);
        const win = window.open("about:blank", "_blank");
        win.document.write(`<iframe src="${proxiedUrl}" style="width:100vw;height:100vh;border:none;"></iframe>`);
    }
});

function setupFilters() {
    document.querySelectorAll('.nav-item, .category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item, .category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            const filtered = category === 'all' ? apps : apps.filter(app => app.category === category);
            renderApps(filtered);
        });
    });
}

// Custom Cursor Follow
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('customCursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Keyboard Shortcut
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'u') {
        const url = prompt("Enter URL:");
        if (url) {
            const clean = url.startsWith('http') ? url : 'https://' + url;
            const proxiedUrl = PROXY_BASE + "proxy/" + encodeURIComponent(clean);
            const win = window.open("about:blank", "_blank");
            win.document.write(`<iframe src="${proxiedUrl}" style="width:100vw;height:100vh;border:none;"></iframe>`);
        }
    }
});

setupFilters();
renderApps(apps);
