// Increment APP_VERSION when deploying changed files.
const APP_VERSION='v1.0.0';
const CACHE_NAME='vocab-pwa-'+APP_VERSION;
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png','./icon-180.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)))});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const names=await caches.keys();await Promise.all(names.filter(name=>name.startsWith('vocab-pwa-')&&name!==CACHE_NAME).map(name=>caches.delete(name)));await self.clients.claim()})())});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET')return;const url=new URL(request.url);if(url.origin!==self.location.origin)return;const scope=new URL(self.registration.scope);if(!url.pathname.startsWith(scope.pathname))return;
// Always check for new HTML online, use cached shell when offline.
if(request.mode==='navigate'||url.pathname.endsWith('/index.html')){event.respondWith(fetch(request,{cache:'no-store'}).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy))}return response}).catch(async()=>await caches.match('./index.html')||await caches.match('./')));return}
// Local static assets: cache first, refresh on new SW version.
event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(request,copy))}return response})))
});
