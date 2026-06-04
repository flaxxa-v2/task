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

let currentUser = null;

// Fake Account System
document.getElementById('accountBtn').addEventListener('click', () => {
    const name = prompt("Enter username to sign in:");
    if (name) {
        currentUser = name;
        document.getElementById('accountBtn').textContent = `👤 ${name}`;
        alert(`Signed in as ${name}`);
    }
});

// Render Apps
function renderApps(filtered) {
    const grid = document.getElementById('appsGrid');
    grid.innerHTML = '';
    filtered.forEach(app => {
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
    const modal = document.getElementById('iframeModal');
    const frame = document.getElementById('appFrame');
    const title = document.getElementById('modalTitle');

    title.textContent = app.name;
    frame.src = proxiedUrl;
    modal.style.display = 'flex';
}

// Feedback with Webhook
document.getElementById('sendFeedback').addEventListener('click', async () => {
    const msg = document.getElementById('feedbackInput').value.trim();
    if (!msg) return;

    const payload = {
        embeds: [{
            title: "New Feedback - FLAXXA HUB V1",
            description: msg,
            color: 0x8b7cff,
            timestamp: new Date().toISOString()
        }]
    };

    await fetch("https://discord.com/api/webhooks/1511894501600526506/1giE7wUPTJPiQfiyM8c1mbE1d5xpSAUqx_yCCGKbKk4DqrhVh1b5FbJQAlKvARaveI4D", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    alert("Feedback sent. Thank you!");
    document.getElementById('feedbackInput').value = '';
});

// Search & Filters (same as before)
document.getElementById('searchBtn').addEventListener('click', () => {
    let q = document.getElementById('searchInput').value.trim();
    if (q) {
        if (!q.startsWith('http')) q = 'https://' + q;
        const url = PROXY_BASE + "proxy/" + encodeURIComponent(q);
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

// Glowing Cursor Trail
const trail = document.getElementById('cursorTrail');
document.addEventListener('mousemove', (e) => {
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('iframeModal').style.display = 'none';
    document.getElementById('appFrame').src = '';
});

setupFilters();
renderApps(apps);
