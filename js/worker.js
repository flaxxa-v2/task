// worker.js - FLAXXA HUB V2 Proxy Backend
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    
    // Proxy routes
    if (url.pathname.startsWith('/proxy/') || url.pathname.startsWith('/uv/')) {
        return handleUltraviolet(request);
    }
    
    // Serve static files from your GitHub Pages
    return fetch(request);
}

async function handleUltraviolet(request) {
    const url = new URL(request.url);
    let targetUrl = url.searchParams.get('url') || url.pathname.replace('/proxy/', '');
    
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    // Basic Ultraviolet-like rewriting (simplified for Worker)
    const response = await fetch(targetUrl, {
        headers: {
            'User-Agent': request.headers.get('User-Agent'),
            'Referer': targetUrl,
        }
    });

    const modifiedHeaders = new Headers(response.headers);
    modifiedHeaders.set('X-Frame-Options', 'ALLOWALL');
    modifiedHeaders.delete('Content-Security-Policy');
    modifiedHeaders.delete('X-Content-Security-Policy');

    let body = await response.text();

    // Basic rewrite for relative links
    body = body.replace(/(href|src|action)=["']\/([^"']*)["']/gi, 
        (match, p1, p2) => `${p1}="/proxy/${new URL(targetUrl).origin}/${p2}"`);

    return new Response(body, {
        status: response.status,
        headers: modifiedHeaders
    });
}
