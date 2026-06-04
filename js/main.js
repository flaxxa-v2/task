const PROXY_BASE = "https://flaxxa-proxy.saddiqalhajba.workers.dev/";

const apps = [
    { name: "TikTok", url: "https://tiktok.com", category: "social", icon: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" },
    { name: "X (Twitter)", url: "https://x.com", category: "social", icon: "https://upload.wikimedia.org/wikipedia/commons/6/60/Twitter_Logo_2021.svg" },
    { name: "YouTube", url: "https://youtube.com", category: "streaming", icon: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" },
    { name: "Cookie Clicker", url: "https://orteil.dashnet.org/cookieclicker/", category: "games", icon: "https://picsum.photos/id/102/300/200" },
    { name: "1v1.lol", url: "https://1v1.lol", category: "games", icon: "https://picsum.photos/id/133/300/200" },
    { name: "BasketBros", url: "https://basketbros.io", category: "games", icon: "https://picsum.photos/id/201/300/200" },
    { name: "Krunker", url: "https://krunker.io", category: "games", icon: "https://picsum.photos/id/180/300/200" },
    { name: "Slope", url: "https://slope-game.io", category: "games", icon: "https://picsum.photos/id/251/300/200" }
];

function renderApps(filteredApps) {
    const grid = document.getElementById('appsGrid');
    grid.innerHTML = '';
    filteredApps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <img src="${app.icon}" alt="${app.name}" onerror="this.src='https://picsum.photos/id/180/300/200'">
            <div class="app-info"><h4>${app.name}</h4></div>
        `;
        card.addEventListener('click', () => openApp(app));
        grid.appendChild(card);
    });
}

function openApp(app) {
    const proxiedUrl = PROXY_BASE + "proxy/" + encodeURIComponent(app.url);
    document.getElementById('modalTitle').textContent = app.name;
    document.getElementById('appFrame').src = proxiedUrl;
    document.getElementById('iframeModal').style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('iframeModal').style.display = 'none';
    document.getElementById('appFrame').src = '';
});

document.getElementById('searchBtn').addEventListener('click', () => {
    let query = document.getElementById('searchInput').value.trim();
    if (query) {
        if (!query.startsWith('http')) query = 'https://' + query;
        const url = PROXY_BASE + "proxy/" + encodeURIComponent(query);
        const win = window.open("about:blank", "_blank");
        win.document.write(`<iframe src="${url}" style="width:100vw;height:100vh;border:none;"></iframe>`);
    }
});

function setupFilters() {
    document.querySelectorAll('.nav-item, .category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-item, .category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.category;
            const filtered = cat === 'all' ? apps : apps.filter(a => a.category === cat);
            renderApps(filtered);
        });
    });
}

setupFilters();
renderApps(apps);
