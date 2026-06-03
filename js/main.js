const apps = [
    { name: "TikTok", url: "https://tiktok.com", category: "social", icon: "https://www.logo.wine/a/logo/TikTok/TikTok-Logo.wine.svg" },
    { name: "X (Twitter)", url: "https://x.com", category: "social", icon: "https://pngimg.com/uploads/x_logo/x_logo_PNG14.png" },
    { name: "YouTube", url: "https://youtube.com", category: "streaming", icon: "https://picsum.photos/id/1018/300/200" },
    { name: "Cookie Clicker", url: "https://orteil.dashnet.org/cookieclicker/", category: "games", icon: "https://picsum.photos/id/102/300/200" },
    { name: "1v1.lol", url: "https://1v1.lol", category: "games", icon: "https://picsum.photos/id/133/300/200" },
    { name: "BasketBros", url: "https://basketbros.io", category: "games", icon: "https://picsum.photos/id/201/300/200" },
    { name: "Neal.fun", url: "https://neal.fun", category: "games", icon: "https://picsum.photos/id/237/300/200" },
    { name: "Geometry Dash", url: "https://geometrydash.io", category: "games", icon: "https://picsum.photos/id/180/300/200" },
    { name: "Discord", url: "https://discord.com/app", category: "social", icon: "https://picsum.photos/id/201/300/200" },
    { name: "Instagram", url: "https://instagram.com", category: "social", icon: "https://picsum.photos/id/1011/300/200" },
    { name: "Twitch", url: "https://twitch.tv", category: "streaming", icon: "https://picsum.photos/id/251/300/200" },
    { name: "Roblox", url: "https://roblox.com", category: "games", icon: "https://picsum.photos/id/180/300/200" }
];

function renderApps(filteredApps) {
    const grid = document.getElementById('appsGrid');
    grid.innerHTML = '';

    filteredApps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <img src="${app.icon}" alt="${app.name}">
            <div class="app-info">
                <h4>${app.name}</h4>
            </div>
        `;
        card.addEventListener('click', () => openApp(app));
        grid.appendChild(card);
    });
}

function openApp(app) {
    const modal = document.getElementById('iframeModal');
    const frame = document.getElementById('appFrame');
    const title = document.getElementById('modalTitle');

    title.textContent = app.name;
    frame.src = app.url;
    modal.style.display = 'flex';
}

document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('iframeModal');
    const frame = document.getElementById('appFrame');
    modal.style.display = 'none';
    frame.src = ''; // Clear iframe
});

// Search functionality
document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        const frame = document.getElementById('appFrame');
        const modal = document.getElementById('iframeModal');
        document.getElementById('modalTitle').textContent = "Custom Site";
        frame.src = query.startsWith('http') ? query : 'https://' + query;
        modal.style.display = 'flex';
    }
});

// Category filtering
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;
        const filtered = category === 'all' ? apps : apps.filter(app => app.category === category);
        renderApps(filtered);
    });
});

// Initialize
renderApps(apps);
