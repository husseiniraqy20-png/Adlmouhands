// ضعه بجانب ملف التطبيق (نفس المجلد) باسم sw.js — وغيّر V عند كل تحديث للتطبيق
const V='muhandis-v10';
const CORE=['./','./index.html','./manifest.webmanifest','./addons.js','./icon-192.png',
'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap',
'https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js',
'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js',
'https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js',
'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js',
'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js',
'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'];
const CDN=['cdn.jsdelivr.net','www.gstatic.com','fonts.googleapis.com','fonts.gstatic.com','cdnjs.cloudflare.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>0)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET')return;
 if(!(u.origin===location.origin||CDN.includes(u.hostname)))return; // Firestore/Auth/تيليغرام/فيسبوك تمر مباشرة
 if(r.mode==='navigate'){
  e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put(r,c));return x})
   .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./index.html')||caches.match('./'))));return}
 e.respondWith(caches.match(r).then(m=>{
  const f=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque'))caches.open(V).then(k=>k.put(r,x.clone()));return x}).catch(()=>m);
  return m||f}))});
