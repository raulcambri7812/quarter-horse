/* Service worker: la app funciona sin conexión y se actualiza sola cuando hay internet */
const V='qh-1795667157';
const SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/apple-touch-icon.png','peerjs.min.js','img/cuadra.webp','img/carreras.webp','img/crianza.webp','img/mercado.webp','img/pista.webp','img/parejeras.webp','img/pista_carrera.webp','img/foto_cuadra.webp','img/foto_semental.webp','img/foto_ganador.webp','img/foto_yegua.webp','img/foto_potro.webp','img/foto_venta.webp','img/mask_semental.png','img/mask_venta.png','img/mask_yegua.png','img/mask_potro.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return; /* fuentes externas: red normal */
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
});
