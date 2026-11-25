/* addons.js — المحادثة، التقييم، التقرير النهائي، الإشراف، محرر البطاقة، العمل دون إنترنت، تيليغرام وفيسبوك */
try{
(function(){
if(window.__x2)return;window.__x2=1;
const X={m:mk(today()),th:'',at:null},CH={u:null,m:[]};
const tgt=()=>+DB.cfg.tgt||20,dtg=()=>+DB.cfg.dtg||4,col=o=>o>=80?'#14803c':o>=60?'#C69C3A':'#C81D25';
const gr=o=>o>=90?'ممتاز':o>=80?'جيد جداً':o>=70?'جيد':o>=60?'متوسط':'ضعيف';
window.XS=(k,v)=>{X[k]=v;render()};
/* ===== التقييم ===== */
function sc(e,m){let P=0,Ab=0;daysOf(m,e).forEach(d=>{const s=st(d,e);if(s==='حاضر')P++;else if(s==='غياب')Ab++});
 const n=DB.tasks.filter(x=>x.e===e&&mk(x.d)===m).length,nd=DB.duties.filter(x=>x.e===e&&mk(x.d)===m).length,
 a=P+Ab?P/(P+Ab)*100:100,t=Math.min(100,n/tgt()*100),d=Math.min(100,nd/dtg()*100);
 return{P,Ab,n,nd,a:Math.round(a),t:Math.round(t),d:Math.round(d),o:Math.round(a*.4+t*.4+d*.2)}}
const bar=(l,v)=>`<div class="mut">${l} — ${v}%</div><div style="height:10px;background:var(--bd);border-radius:6px;overflow:hidden;margin-bottom:6px"><i style="display:block;height:100%;width:${v}%;background:${col(v)}"></i></div>`;
const msel=()=>`<label>الشهر</label><select onchange="XS('m',this.value)">${months().map(x=>`<option value="${x}" ${x===X.m?'selected':''}>${ML(x)}</option>`).join('')}</select>`;
function chart(L,m){const w=Math.max(300,L.length*64+20);return`<div class="tbl"><svg viewBox="0 0 ${w} 260" width="${w}" style="max-width:none">${L.map((e,i)=>{const o=sc(e.id,m).o,h=o*1.9,x=i*64+14;return`<rect x="${x}" y="${220-h}" width="36" height="${h}" rx="5" fill="${col(o)}"/><text x="${x+18}" y="${212-h}" font-size="12" text-anchor="middle" fill="currentColor">${o}</text><text x="${x+18}" y="240" font-size="10" text-anchor="middle" fill="currentColor">${esc((e.name||'').split(' ')[0].slice(0,9))}</text>`}).join('')}<line x1="0" y1="220" x2="${w}" y2="220" stroke="#999"/></svg></div>`}
V.eval=()=>{const m=X.m,L=isAdmin()?DB.emps:[EMP(ME)];
 return`<h2>تقييم المنتسبين</h2><div class="card">${msel()}<p class="mut">التقييم = الحضور 40% + الإنجازات 40% (الهدف ${tgt()} شهرياً) + الواجبات 20% (الهدف ${dtg()}).</p>${chart(L,m)}</div>`+L.map(e=>{const s=sc(e.id,m);return`<div class="card"><div class="prof">${av(e)}<div style="flex:1"><b>${esc(e.name)}</b><div class="mut">${esc(e.title)}</div></div><div class="stat"><b style="color:${col(s.o)}">${s.o}%</b><span>${gr(s.o)}</span></div></div>${bar('الحضور ('+s.P+' حضور / '+s.Ab+' غياب)',s.a)}${bar('الإنجازات ('+s.n+' من '+tgt()+')',s.t)}${bar('الواجبات ('+s.nd+' من '+dtg()+')',s.d)}<button class="btn gold" style="margin-top:8px" onclick="XPE('${e.id}')">طباعة بطاقة التقييم</button></div>`}).join('')};
const PCSS="body{font-family:Cairo,Tahoma,Arial;color:#17262a;margin:18px;-webkit-print-color-adjust:exact;print-color-adjust:exact}table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:10px}th{background:#0B4F56;color:#fff}th,td{border:1px solid #ccc;padding:5px;text-align:center}h1,h2{color:#0B4F56}.hd{display:flex;align-items:center;gap:12px;border-bottom:4px solid #C69C3A;padding-bottom:8px}.hd img{width:70px}.bar{height:14px;background:#e3eaec;border-radius:7px;overflow:hidden;margin-bottom:8px}.bar i{display:block;height:100%}";
function prt(b,t){const h='<!DOCTYPE html><html dir="rtl" lang="ar"><head><meta charset="utf-8"><title>'+t+'</title><style>'+PCSS+'</style></head><body>'+b+'</body></html>';
 let w=null;try{w=window.open('','_blank')}catch(e){}
 if(w){w.document.write(h+'<scr'+'ipt>window.onload=function(){setTimeout(function(){window.print()},400)}</scr'+'ipt>');w.document.close();return}
 const f=document.createElement('iframe');f.style.cssText='position:fixed;width:0;height:0;border:0';document.body.appendChild(f);const d=f.contentWindow.document;d.open();d.write(h);d.close();setTimeout(()=>{f.contentWindow.focus();f.contentWindow.print();setTimeout(()=>f.remove(),4000)},600)}
const HD=(t,m)=>`<div class="hd"><img src="${LOGO}"><div><h1 style="margin:0">${t}</h1><div>مديرية الشهداء والمضحين — قسم الإعلام · ${ML(m)}</div></div></div>`;
window.XPE=id=>{const e=EMP(id),m=X.m,s=sc(id,m),c=col(s.o),B=(l,v)=>`<p>${l}: <b>${v}%</b></p><div class="bar"><i style="width:${v}%;background:${col(v)}"></i></div>`;
 prt(HD('بطاقة تقييم منتسب',m)+`<div style="display:flex;gap:24px;align-items:center;margin:18px 0">${e.photo?`<img src="${e.photo}" style="width:150px;height:150px;border-radius:50%;object-fit:cover;border:4px solid #C69C3A">`:''}<div style="flex:1"><h2 style="margin:0">${esc(e.name)}</h2><div>${esc(e.title)} ${esc(e.spec)}</div><div>${esc(e.phone)}</div></div><svg width="160" height="160" viewBox="0 0 160 160"><circle cx="80" cy="80" r="60" fill="none" stroke="#e3eaec" stroke-width="14"/><circle cx="80" cy="80" r="60" fill="none" stroke="${c}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${s.o*3.77} 377" transform="rotate(-90 80 80)"/><text x="80" y="88" text-anchor="middle" font-size="36" font-weight="700" fill="${c}">${s.o}</text><text x="80" y="112" text-anchor="middle" font-size="14">${gr(s.o)}</text></svg></div>`+B('الالتزام بالحضور',s.a)+B('الالتزام بالإنجازات والمهام',s.t)+B('الالتزام بالواجبات',s.d)+`<table><tr><th>أيام الحضور</th><th>أيام الغياب</th><th>الإنجازات</th><th>الواجبات</th><th>التقدير</th></tr><tr><td>${s.P}</td><td>${s.Ab}</td><td>${s.n} / ${tgt()}</td><td>${s.nd} / ${dtg()}</td><td><b>${gr(s.o)}</b></td></tr></table><div style="display:flex;justify-content:space-around;margin-top:60px"><div>توقيع المشرف</div><div>توقيع المدير</div></div><p style="text-align:center;color:#5d7176">إعداد المهندس حسين الزيدي</p>`,'تقييم')};
/* ===== الإنجاز التفصيلي ===== */
V.ach=()=>{const L=[...mine('tasks')].sort((a,b)=>(b.d+(b.tm||'')).localeCompare(a.d+(a.tm||''))).slice(0,40);
 return`<h2>تسجيل إنجاز تفصيلي</h2><div class="card"><div class="row"><div><label>التاريخ</label><input type="date" id="kd" value="${today()}"></div><div><label>الوقت</label><input type="time" id="kt" value="${hm(new Date())}"></div></div><label>نوع العمل</label><select id="ky">${opt(DB.cfg.types)}</select><label>المكان</label><input id="kp"><label>وصف الإنجاز</label><input id="kx"><label>ملاحظات</label><input id="kn"><button class="btn" onclick="XAch()">حفظ الإنجاز</button></div><h2>آخر الإنجازات</h2>`+(L.map(t=>`<div class="card row"><div><b>${esc(t.x)}</b><div class="mut">${t.d}${t.tm?' · '+t.tm:''}${t.ty?' · '+esc(t.ty):''}${t.pl?' · 📍'+esc(t.pl):''}${t.n?' · '+esc(t.n):''}</div></div>${isAdmin()?`<span style="flex:0;white-space:nowrap"><button class="btn ghost sm" onclick="XEdit('${t.id}')">تعديل</button> <button class="btn ghost sm" onclick="del('tasks','${t.id}')">حذف</button></span>`:''}</div>`).join('')||'<div class="empty">لا توجد إنجازات</div>')};
window.XAch=()=>{const x=$('kx').value.trim();if(!x)return toast('اكتب وصف الإنجاز');DB.tasks.push({id:uid(),e:DB.cur,d:$('kd').value,tm:$('kt').value,ty:$('ky').value,pl:$('kp').value.trim(),x,n:$('kn').value.trim()});save();toast('تم الحفظ');render()};
window.XEdit=async id=>{if(!adm())return;const r=DB.tasks.find(x=>x.id===id);if(!r)return;for(const[k,l]of[['x','الإنجاز'],['pl','المكان'],['tm','الوقت HH:MM'],['d','التاريخ YYYY-MM-DD'],['ty','نوع العمل'],['n','ملاحظات']]){const v=await askP(l,r[k]||'');if(v===null)break;r[k]=v.trim()}save();render()};
/* ===== التقرير النهائي للمدير ===== */
const fT=m=>DB.tasks.filter(t=>mk(t.d)===m).sort((a,b)=>(a.d+(a.tm||'')).localeCompare(b.d+(b.tm||'')));
const cnt=(L,f)=>{const o={};L.forEach(t=>{const k=f(t)||'غير محدد';o[k]=(o[k]||0)+1});return Object.entries(o).sort((a,b)=>b[1]-a[1])};
const tb=(h,R)=>`<table><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr>${R.map(r=>`<tr>${r.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</table>`;
function fHtml(m){const T=fT(m),n=T.length||1;
 return`<p><b>إجمالي الإنجازات: ${T.length}</b> · أيام النشاط: ${new Set(T.map(t=>t.d)).size} · موظفون منجزون: ${new Set(T.map(t=>t.e)).size} من ${DB.emps.length}</p><h2>حسب نوع العمل</h2>${tb(['النوع','العدد','النسبة'],cnt(T,t=>t.ty).map(([k,v])=>[k,v,Math.round(v/n*100)+'%']))}<h2>حسب المكان</h2>${tb(['المكان','العدد'],cnt(T,t=>t.pl))}<h2>حسب الموظف</h2>${tb(['الموظف','الإنجازات','التقييم'],DB.emps.map(e=>[e.name,T.filter(t=>t.e===e.id).length,sc(e.id,m).o+'%']))}<h2>التفاصيل (الزمان والمكان ونوع العمل)</h2>${tb(['التاريخ','الوقت','الموظف','نوع العمل','المكان','الإنجاز','ملاحظات'],T.map(t=>[t.d,t.tm||'—',EMP(t.e).name,t.ty,t.pl||'—',t.x,t.n||'']))}`}
V.fin=()=>{if(!isAdmin())return'<div class="card empty">للمدير الرئيسي فقط</div>';
 return`<h2>التقرير النهائي للإنجازات الشهرية</h2><div class="card">${msel()}<div class="row" style="margin-top:8px"><button class="btn gold" onclick="XFP()">طباعة / PDF</button><button class="btn" onclick="XFX()">Excel</button></div></div><div class="card tbl">${fHtml(X.m)}</div>`};
window.XFP=()=>prt(HD('التقرير النهائي للإنجازات الشهرية',X.m)+fHtml(X.m)+'<p style="text-align:center;color:#5d7176">إعداد المهندس حسين الزيدي</p>','تقرير');
window.XFX=async()=>{if(!window.ExcelJS)return toast('تعذّر تحميل مكتبة Excel');const m=X.m,T=fT(m),wb=new ExcelJS.Workbook(),v={views:[{rightToLeft:true}]},a=wb.addWorksheet('الملخص',v),b=wb.addWorksheet('التفاصيل',v);
 a.addRow(['تقرير الإنجازات الشهري',ML(m)]);a.addRow(['إجمالي الإنجازات',T.length]);a.addRow([]);a.addRow(['نوع العمل','العدد']);cnt(T,t=>t.ty).forEach(r=>a.addRow(r));a.addRow([]);a.addRow(['المكان','العدد']);cnt(T,t=>t.pl).forEach(r=>a.addRow(r));a.addRow([]);a.addRow(['الموظف','الإنجازات','التقييم']);DB.emps.forEach(e=>a.addRow([e.name,T.filter(t=>t.e===e.id).length,sc(e.id,m).o]));
 b.addRow(['التاريخ','الوقت','الموظف','نوع العمل','المكان','الإنجاز','ملاحظات']);T.forEach(t=>b.addRow([t.d,t.tm||'',EMP(t.e).name,t.ty,t.pl||'',t.x,t.n||'']));
 b.getRow(1).font={bold:true};b.getRow(1).fill={type:'pattern',pattern:'solid',fgColor:{argb:'FFC69C3A'}};[12,9,18,16,18,40,24].forEach((w,i)=>b.getColumn(i+1).width=w);a.getColumn(1).width=26;
 try{await saveFile({filename:'تقرير_الإنجازات_'+m+'.xlsx',data:await wb.xlsx.writeBuffer()});toast('تم حفظ الملف')}catch(e){toast('تعذّر الحفظ')}};
/* ===== لوحة الإشراف ===== */
V.sup=()=>{if(!isAdmin())return'<div class="card empty">للمدير الرئيسي فقط</div>';const t=today(),m=mk(t),np=DB.emps.filter(e=>(A(t,e.id)||{}).in).length;
 const go=(v,l)=>`<button class="btn ghost" onclick="view='${v}';render()">${l}</button>`;
 return`<h2>لوحة إشراف المدير</h2><div class="grid"><div class="card stat"><b>${DB.emps.length}</b><span>موظفون</span></div><div class="card stat g"><b>${np}</b><span>حاضرون اليوم</span></div><div class="card stat"><b>${fT(m).length}</b><span>إنجازات الشهر</span></div><div class="card stat r"><b>${pc()}</b><span>طلبات معلّقة</span></div></div>
 <div class="card"><div class="row">${go('emp','الموظفون')}${go('set','الإعدادات')}${go('req','الطلبات')}${go('ann','التبليغات')}${go('chat','المحادثة')}${go('fin','التقرير النهائي')}</div></div>
 <div class="card tbl"><table><tr><th>الموظف</th><th>اليوم</th><th>دخول</th><th>خروج</th><th>التقييم</th><th></th></tr>${DB.emps.map(e=>{const a=A(t,e.id)||{},s=st(t,e.id);return`<tr><td>${esc(e.name)}</td><td><span class="tag ${tagc(s)}">${s||'—'}</span></td><td>${a.in||'—'}</td><td>${a.out||'—'}</td><td style="color:${col(sc(e.id,m).o)}"><b>${sc(e.id,m).o}%</b></td><td><button class="btn ghost sm" onclick="DB.cur='${e.id}';save();view='bal';render()">تعديل السجل</button></td></tr>`}).join('')}</table></div>
 <div class="card"><b>معايير التقييم</b><div class="row"><div><label>هدف الإنجازات الشهري</label><input type="number" min="1" value="${tgt()}" onchange="DB.cfg.tgt=+this.value||20;save()"></div><div><label>هدف الواجبات الشهري</label><input type="number" min="1" value="${dtg()}" onchange="DB.cfg.dtg=+this.value||4;save()"></div></div><button class="btn gold" onclick="XTy()">إضافة أنواع أعمال إعلامية جاهزة</button></div>`};
window.XTy=()=>{if(!adm())return;['بث مباشر','تغطية مؤتمر','إنتاج فيديو','بودكاست','رصد إعلامي','أرشفة','تصميم بطاقة','نشر على المنصات'].forEach(x=>{if(!DB.cfg.types.includes(x))DB.cfg.types.push(x)});save();toast('تمت الإضافة');render()};
/* ===== المحادثة ===== */
function chatStart(){if(CH.u||!fbDb)return;const c=fbDb.collection('chat'),q=isAdmin()?c:c.where('e','==',ME);CH.u=q.onSnapshot(s=>{s.docChanges().forEach(x=>{const i=CH.m.findIndex(y=>y.id===x.doc.id);if(x.type==='removed'){if(i>=0)CH.m.splice(i,1)}else if(i<0)CH.m.push(x.doc.data());else CH.m[i]=x.doc.data()});chL()},e=>toast('تعذّر قراءة المحادثة ('+((e&&e.code)||'')+')'))}
function chL(){const bx=$('chL');if(!bx)return;const th=isAdmin()?X.th:ME,me=isAdmin()?'admin':ME;
 bx.innerHTML=CH.m.filter(x=>x.e===th).sort((p,q)=>p.ts-q.ts).map(x=>{const o=x.from===me;return`<div style="display:flex;justify-content:${o?'flex-start':'flex-end'};margin:6px 0"><div style="max-width:84%;padding:8px 12px;border-radius:12px;background:${o?'var(--teal)':'var(--bg)'};color:${o?'#fff':'var(--tx)'};border:1px solid var(--bd)"><div style="font-size:11px;opacity:.75">${x.from==='admin'?'المدير':esc(EMP(x.from).name)} · ${new Date(x.ts).toLocaleString('ar',{hour:'2-digit',minute:'2-digit',day:'numeric',month:'numeric'})}${isAdmin()?` <a href="#" onclick="XCD('${x.id}');return false" style="color:inherit">✕</a>`:''}</div>${x.x?`<div style="white-space:pre-wrap">${esc(x.x)}</div>`:''}${x.img?`<img src="${x.img}" style="max-width:100%;border-radius:8px;margin-top:4px">`:''}${x.fd?`<a href="${x.fd}" download="${esc(x.fn)}" style="color:inherit">📎 ${esc(x.fn)}</a>`:''}</div></div>`}).join('')||'<div class="empty">لا توجد رسائل</div>';bx.scrollTop=bx.scrollHeight}
V.chat=()=>{if(isAdmin()&&!X.th)X.th=(DB.emps[0]||{}).id||'';
 return`<h2>المحادثة</h2><div class="card">${isAdmin()?`<select onchange="XS('th',this.value)">${DB.emps.map(e=>`<option value="${e.id}" ${e.id===X.th?'selected':''}>${esc(e.name||'موظف')}</option>`).join('')}</select>`:'<p class="mut">محادثة مباشرة مع المدير</p>'}<div id="chL" style="height:50vh;overflow-y:auto;padding:4px"></div><textarea id="chT" rows="2" placeholder="اكتب رسالة..."></textarea><div class="row"><span class="pk btn gold">📷 صورة<input type="file" accept="image/*" onchange="XF(this,1)"></span><span class="pk btn ghost">📎 ملف<input type="file" onchange="XF(this,0)"></span><button class="btn" onclick="XSend()">إرسال</button></div><div class="mut" id="chA"></div></div>`};
window.XF=(i,im)=>{const f=i.files[0];i.value='';if(!f)return;const r=new FileReader();r.onload=()=>{if(im){const g=new Image();g.onload=()=>{const k=Math.min(1,900/Math.max(g.width,g.height)),c=document.createElement('canvas');c.width=g.width*k;c.height=g.height*k;c.getContext('2d').drawImage(g,0,0,c.width,c.height);X.at={img:c.toDataURL('image/jpeg',.7)};$('chA').textContent='📷 صورة مرفقة'};g.src=r.result}else{if(f.size>600000)return toast('الحد الأقصى للملف 600 كيلوبايت');X.at={fn:f.name,fd:r.result};$('chA').textContent='📎 '+f.name}};r.readAsDataURL(f)};
window.XSend=()=>{const x=$('chT').value.trim(),a=X.at;if(!x&&!a)return;const id=uid(),d={id,e:isAdmin()?X.th:ME,from:isAdmin()?'admin':ME,x,ts:Date.now(),...(a||{})};fbDb.doc('chat/'+id).set(d).catch(e=>toast('تعذّر الإرسال ('+((e&&e.code)||'')+')'));X.at=null;$('chT').value='';$('chA').textContent=''};
window.XCD=id=>{if(adm())fbDb.doc('chat/'+id).delete().catch(()=>toast('تعذّر الحذف'))};
/* ===== تحسينات بطاقة الشهيد ===== */
const TP=[['ذهبي ملكي','#0b0b0b','#2a2108','#e6c15a','#fff7e0'],['علم العراق','#0a0a0a','#7a0f17','#ffffff','#ffffff'],['الحشد الأخضر','#06210f','#0f4a22','#c9e265','#f2fbe9'],['أبيض حديث','#f5f2ea','#ffffff','#9a7421','#1d2b30'],['أزرق نيون','#050b1f','#0f2a5e','#4fd1ff','#eaf6ff'],['بنفسجي ملكي','#140a26','#35176b','#e0b3ff','#f6eeff']];
const sy=document.createElement('style');sy.textContent="#mcCard.sh-r .m-pic{border-radius:90px}#mcCard.sh-r .m-stage:before{border-radius:110px}#mcCard.sh-r .m-stage:after{border-radius:130px}#mcCard.sh-s .m-pic,#mcCard.sh-s .m-stage:before,#mcCard.sh-s .m-stage:after{border-radius:0}#mcCard.sh-h .m-pic{border-radius:0;clip-path:polygon(25% 3%,75% 3%,100% 50%,75% 97%,25% 97%,0 50%)}#mcCard.sh-h .m-stage:before,#mcCard.sh-h .m-stage:after{display:none}#mcCard.gl .m-pic{box-shadow:0 0 70px var(--gold)}#mcCard.gl .m-name{text-shadow:0 0 28px var(--gold)}";document.head.appendChild(sy);
function cardX(){const r=document.getElementById('mcApp');if(!r||r.querySelector('#xE'))return;const q=i=>r.querySelector('#'+i);
 const d=document.createElement('details');d.className='card';d.id='xE';d.open=true;
 d.innerHTML=`<summary>✨ محرر الصورة والقوالب الحديثة</summary><div class="row" style="margin-top:8px"><span class="pk btn gold">اختيار صورة للقص<input type="file" accept="image/*" id="xF"></span><select id="xS"><option value="c">دائرة</option><option value="r">مربع مدوّر</option><option value="s">مربع</option><option value="h">سداسي</option></select><select id="xT"><option value="">قوالب حديثة...</option>${TP.map((t,i)=>`<option value="${i}">${t[0]}</option>`).join('')}</select><label style="flex:0;white-space:nowrap"><input type="checkbox" id="xG" style="width:auto"> توهج</label></div>`+[['xz','تكبير/قص',1,3,.05,1],['xx','يمين/يسار',-100,100,1,0],['xy','أعلى/أسفل',-100,100,1,0],['xb','السطوع',-60,60,1,0],['xc','التباين',-60,60,1,0],['xa','التشبع',0,200,1,100],['xh','توضيح',0,100,1,0],['xw','حجم الصورة',300,560,5,480]].map(a=>`<div class="row"><span class="mut" style="min-width:90px;flex:0 0 90px">${a[1]}</span><input type="range" id="${a[0]}" min="${a[2]}" max="${a[3]}" step="${a[4]}" value="${a[5]}" style="flex:1;width:auto"></div>`).join('');
 r.insertBefore(d,r.children[1]);
 let IMG=null,busy=0;const cd=()=>r.querySelector('#mcCard');
 function draw(){busy=0;if(!IMG)return;const S=720,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d'),k=Math.min(IMG.width,IMG.height)/+q('xz').value,sx=(IMG.width-k)/2*(1+q('xx').value/100),sy=(IMG.height-k)/2*(1+q('xy').value/100);
  g.drawImage(IMG,sx,sy,k,k,0,0,S,S);const im=g.getImageData(0,0,S,S),p=im.data,b=+q('xb').value*2.55,ct=1+q('xc').value/100,sa=q('xa').value/100,hh=q('xh').value/100;
  for(let i=0;i<p.length;i+=4){const l=.3*p[i]+.59*p[i+1]+.11*p[i+2];for(let j=0;j<3;j++)p[i+j]=(l+(p[i+j]-l)*sa-128)*ct+128+b}
  if(hh){const o=new Uint8ClampedArray(p);for(let y=1;y<S-1;y++)for(let x=1;x<S-1;x++){const i=(y*S+x)*4;for(let j=0;j<3;j++)p[i+j]=o[i+j]+hh*(4*o[i+j]-o[i-4+j]-o[i+4+j]-o[i-S*4+j]-o[i+S*4+j])}}
  g.putImageData(im,0,0);const pc2=r.querySelector('.m-pic');pc2.style.backgroundImage='url('+c.toDataURL('image/jpeg',.9)+')';pc2.innerHTML=''}
 q('xF').onchange=e=>{const f=e.target.files[0];if(!f)return;const g=new Image();g.onload=()=>{IMG=g;draw()};g.src=URL.createObjectURL(f);e.target.value=''};
 ['xz','xx','xy','xb','xc','xa','xh'].forEach(i=>q(i).oninput=()=>{if(!busy){busy=1;requestAnimationFrame(draw)}});
 q('xw').oninput=e=>{const s=r.querySelector('.m-stage');s.style.width=s.style.height=e.target.value+'px'};
 q('xS').onchange=e=>{const c=cd();c.classList.remove('sh-c','sh-r','sh-s','sh-h');c.classList.add('sh-'+e.target.value)};
 q('xG').onchange=e=>cd().classList.toggle('gl',e.target.checked);
 q('xT').onchange=e=>{const t=TP[e.target.value];if(!t)return;const c=cd();['--bg','--bg2','--gold','--iv'].forEach((k,i)=>c.style.setProperty(k,t[i+1]))}}
/* ===== الربط بالتطبيق ===== */
TABS.splice(Math.max(0,TABS.findIndex(t=>t[0]==='emp')),0,['chat','💬','المحادثة'],['ach','✅','إنجاز'],['eval','📊','التقييم'],['fin','📑','التقرير'],['sup','🛡','الإشراف']);
const _r=render;render=function(){_r();
 if(!authed&&CH.u){CH.u();CH.u=null;CH.m=[]}
 if(!authed||!ready)return;
 if(!isAdmin())document.querySelectorAll('#nav button').forEach(b=>{if(/'(fin|sup)'/.test(b.getAttribute('onclick')||''))b.remove()});
 if(view==='chat'){chatStart();chL()}
 if(view==='card')setTimeout(cardX,0)};
render();
})();
}catch(e){console.error("addons module 1",e);try{toast("خطأ في إحدى الإضافات: "+e.message)}catch(_){}}
try{
(function(){
if(window.__x3)return;window.__x3=1;
const LS=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},SS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){toast('مساحة التخزين ممتلئة')}};
/* ===== العمل بدون إنترنت وتثبيت الوقت ===== */
let SK=null;
async function ping(){SK=null;try{const t=Date.now(),r=await fetch(location.href.split('#')[0],{method:'HEAD',cache:'no-store'}),d=r.headers.get('Date');if(d)SK=new Date(d).getTime()-(t+Date.now())/2}catch(e){}}
const _rec=rec;rec=function(k,d,man){_rec(k,d,man);const a=DB.att[DB.cur+'|'+today()];if(!a)return;const n=Date.now();if(k==='in'&&!a.pt)a.pt=n;if(k==='out')a.po=n;if(!navigator.onLine)a.off=1;render()};
const pend=()=>Object.values(DB.att).filter(v=>v.off&&!v.cf).length;
async function cf(){if(!authed||!ready||!navigator.onLine)return;const P=Object.entries(DB.att).filter(([k,v])=>v.off&&!v.cf&&(isAdmin()||k.startsWith(ME+'|')));if(!P.length)return;await ping();const t=nowTs();
 P.forEach(([k,v])=>{v.cf=t;if(SK!=null){v.sk=Math.round(SK/1000);if(Math.abs(SK)>300000)v.sus=1}});save();toast('✅ تم تثبيت وقت '+P.length+' تسجيل بعد عودة الاتصال');render()}
addEventListener('online',()=>{render();setTimeout(cf,1500);setTimeout(XQf,2500)});addEventListener('offline',render);
setInterval(cf,60000);
/* ===== منصات المديرية: تيليغرام وفيسبوك ===== */
const SC=()=>LS('xSoc',{tt:'',tc:'',fp:'',ft:''}),QL=()=>LS('xQ',[]),LG=()=>LS('xLg',[]);
let XI=null,busyQ=0;
V.soc=()=>{if(!isAdmin())return'<div class="card empty">للمدير الرئيسي فقط</div>';const c=SC(),q=QL(),l=LG();
 return`<h2>منصات المديرية</h2><div class="card"><b>ربط الحسابات</b><p class="mut">المفاتيح تُحفظ على جهازك أنت فقط ولا تُرفع للسحابة.</p><label>Telegram Bot Token</label><input id="st1" type="password" dir="ltr" value="${esc(c.tt)}"><label>معرّف القناة (@channel أو رقم)</label><input id="st2" dir="ltr" value="${esc(c.tc)}"><label>Facebook Page ID</label><input id="sf1" dir="ltr" value="${esc(c.fp)}"><label>Facebook Page Access Token</label><input id="sf2" type="password" dir="ltr" value="${esc(c.ft)}"><div class="row"><button class="btn" onclick="XSv()">حفظ</button><button class="btn ghost" onclick="XTest()">اختبار الاتصال</button></div></div>
 <div class="card"><b>منشور جديد</b><textarea id="sx" rows="5" placeholder="نص المنشور"></textarea><div class="row"><span class="pk btn ghost">📷 صورة<input type="file" accept="image/*" onchange="XSI(this)"></span><span class="mut" id="si"></span></div><div class="row"><label style="flex:0;white-space:nowrap"><input type="checkbox" id="sT" checked style="width:auto"> Telegram</label><label style="flex:0;white-space:nowrap"><input type="checkbox" id="sF" checked style="width:auto"> Facebook</label></div><label>جدولة (اختياري — يُرسل والتطبيق مفتوح)</label><input type="datetime-local" id="sd"><button class="btn gold" onclick="XPost()">نشر</button><p class="mut">بدون إنترنت: يُحفظ المنشور ويُرسل تلقائياً عند عودة الاتصال.</p></div>
 ${q.length?`<div class="card"><b>بانتظار الإرسال (${q.length})</b>${q.map(p=>`<div class="mut">${esc((p.x||'📷').slice(0,50))} ${p.at?'· '+esc(p.at):''}</div>`).join('')}<button class="btn sm" onclick="XQ()">إرسال الآن</button></div>`:''}
 <h2>سجل المنشورات</h2>${l.map((p,i)=>{const ok=(p.t&&p.t.ok)||(p.f&&p.f.ok),r=(n,o)=>o?(o.ok?(o.u?`<a href="${esc(o.u)}" target="_blank">${n} ✓</a>`:n+' ✓'):n+' ✗ '+esc(o.e)):'';return`<div class="card"><div class="mut">${esc(p.ts)} · ${r('تيليغرام',p.t)} ${r('فيسبوك',p.f)}</div><div style="white-space:pre-wrap">${esc((p.x||'📷').slice(0,200))}</div>${ok?`<button class="btn ghost sm" onclick="XDel(${i})">حذف من المنصات</button>`:''}</div>`}).join('')||'<div class="empty">لا توجد منشورات</div>'}`};
window.XSv=()=>{if(!adm())return;SS('xSoc',{tt:$('st1').value.trim(),tc:$('st2').value.trim(),fp:$('sf1').value.trim(),ft:$('sf2').value.trim()});toast('تم الحفظ على هذا الجهاز')};
window.XSI=i=>{const f=i.files[0];i.value='';if(!f)return;const r=new FileReader();r.onload=()=>{const g=new Image();g.onload=()=>{const k=Math.min(1,1280/Math.max(g.width,g.height)),c=document.createElement('canvas');c.width=g.width*k;c.height=g.height*k;c.getContext('2d').drawImage(g,0,0,c.width,c.height);XI=c.toDataURL('image/jpeg',.85);$('si').textContent='📷 صورة مرفقة'};g.src=r.result};r.readAsDataURL(f)};
const blob=u=>fetch(u).then(r=>r.blob());
async function sendT(c,x,img){const b='https://api.telegram.org/bot'+c.tt+'/';let r;
 if(img){const f=new FormData();f.append('chat_id',c.tc);f.append('caption',x.slice(0,1024));f.append('photo',await blob(img),'p.jpg');r=await fetch(b+'sendPhoto',{method:'POST',body:f})}
 else r=await fetch(b+'sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:c.tc,text:x.slice(0,4096)})});
 const j=await r.json();if(!j.ok)throw new Error(j.description||'خطأ');const id=j.result.message_id;return{ok:1,id,u:/^@/.test(c.tc)?'https://t.me/'+c.tc.slice(1)+'/'+id:''}}
async function sendF(c,x,img){const f=new FormData();f.append('access_token',c.ft);let ep='feed';
 if(img){ep='photos';f.append('caption',x);f.append('source',await blob(img),'p.jpg')}else f.append('message',x);
 const r=await fetch('https://graph.facebook.com/v19.0/'+c.fp+'/'+ep,{method:'POST',body:f}),j=await r.json();if(j.error)throw new Error(j.error.message);const id=j.post_id||j.id;return{ok:1,id,u:'https://facebook.com/'+id}}
window.XPost=async()=>{if(!adm())return;const x=$('sx').value.trim();if(!x&&!XI)return toast('اكتب نص المنشور');if(!$('sT').checked&&!$('sF').checked)return toast('اختر منصة');
 const q=QL();q.push({x,img:XI,T:$('sT').checked,F:$('sF').checked,at:$('sd').value});SS('xQ',q);XI=null;$('sx').value='';$('si').textContent='';await XQf();render()};
async function XQf(){if(busyQ||!isAdmin()||!navigator.onLine)return;busyQ=1;const c=SC(),keep=[],lg=LG();
 try{for(const p of QL()){if(p.at&&new Date(p.at)>new Date()){keep.push(p);continue}
  const o={ts:nowTs(),x:p.x};let net=0;
  for(const[k,en,fn,ok]of[['t',p.T,sendT,c.tt&&c.tc],['f',p.F,sendF,c.fp&&c.ft]]){if(!en)continue;if(!ok){o[k]={e:'غير مربوط'};continue}
   try{o[k]=await fn(c,p.x,p.img)}catch(e){if(e instanceof TypeError)net=1;o[k]={e:e.message}}}
  if(net)keep.push(p);else{lg.unshift(o);toast('تم النشر')}}}
 finally{SS('xQ',keep);SS('xLg',lg.slice(0,40));busyQ=0;if(view==='soc')render()}}
window.XQ=XQf;setInterval(XQf,30000);
window.XDel=async i=>{if(!adm())return;const l=LG(),p=l[i],c=SC();if(!p||!await askC('حذف المنشور من المنصات؟'))return;
 try{if(p.t&&p.t.ok)await fetch('https://api.telegram.org/bot'+c.tt+'/deleteMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:c.tc,message_id:p.t.id})});
  if(p.f&&p.f.ok)await fetch('https://graph.facebook.com/v19.0/'+p.f.id+'?access_token='+encodeURIComponent(c.ft),{method:'DELETE'});
  l.splice(i,1);SS('xLg',l);toast('تم الحذف');render()}catch(e){toast('تعذّر الحذف: '+e.message)}};
window.XTest=async()=>{const c=SC();let m=[];
 try{if(c.tt){const j=await(await fetch('https://api.telegram.org/bot'+c.tt+'/getMe')).json();m.push(j.ok?'تيليغرام: @'+j.result.username:'تيليغرام ✗')}}catch(e){m.push('تيليغرام: لا اتصال')}
 try{if(c.fp&&c.ft){const j=await(await fetch('https://graph.facebook.com/v19.0/'+c.fp+'?fields=name&access_token='+encodeURIComponent(c.ft))).json();m.push(j.name?'فيسبوك: '+j.name:'فيسبوك ✗ '+((j.error||{}).message||''))}}catch(e){m.push('فيسبوك: لا اتصال')}
 toast(m.join(' · ')||'أدخل المفاتيح أولاً')};
/* ===== الربط بالتطبيق ===== */
TABS.splice(Math.max(0,TABS.findIndex(t=>t[0]==='emp')),0,['soc','📣','المنصات']);
const _r3=render;render=function(){_r3();if(!authed||!ready)return;
 if(!isAdmin())document.querySelectorAll('#nav button').forEach(b=>{if(/'soc'/.test(b.getAttribute('onclick')||''))b.remove()});
 const v=$('v');if(!v)return;
 if(!navigator.onLine||pend())v.insertAdjacentHTML('afterbegin',`<div class="card" style="border:2px solid ${navigator.onLine?'var(--gold)':'var(--ruby)'}">${navigator.onLine?'🔄 جارٍ تثبيت وقت '+pend()+' تسجيل':'📴 غير متصل — التطبيق يعمل، وتُحفظ تسجيلاتك على الجهاز ويُثبَّت وقتها عند عودة الاتصال'}</div>`);
 if(isAdmin()&&view==='sup'){const S=Object.entries(DB.att).filter(([k,x])=>x.sus);if(S.length)v.insertAdjacentHTML('beforeend',`<div class="card"><b>⚠ تسجيلات ساعة جهازها غير مطابقة للوقت الحقيقي</b>${S.map(([k,x])=>{const[e,d]=k.split('|');return`<div class="mut">${esc(EMP(e).name)} · ${d} · ${x.in||''} · الفرق ${Math.round(x.sk/60)} دقيقة</div>`}).join('')}</div>`)}};
render();
})();
}catch(e){console.error("addons module 2",e);try{toast("خطأ في إحدى الإضافات: "+e.message)}catch(_){}}
/* === حفظ الجلسة والدخول المباشر بدون إنترنت (محدث) === */
(function(){
  const SK_U = 'muhandis_offline_session';

  document.addEventListener('click', function(e) {
    const btn = e.target.closest('button');
    if (btn && btn.textContent.includes('تسجيل الدخول')) {
      const inputs = document.querySelectorAll('input');
      const u = inputs[0] ? inputs[0].value.trim() : '';
      const p = inputs[1] ? inputs[1].value.trim() : '';
      if (u && p && navigator.onLine) {
        localStorage.setItem(SK_U, JSON.stringify({ u: u, p: p, ts: Date.now() }));
      }
    }
  }, true);

  function bypassLoginOffline() {
    if (!navigator.onLine) {
      const saved = JSON.parse(localStorage.getItem(SK_U) || 'null');
      if (saved && saved.u) {
        document.querySelectorAll('div, section, form').forEach(el => {
          if (el.innerText && el.innerText.includes('تسجيل الدخول') && el.querySelector('input[type="password"]')) {
            el.style.display = 'none';
          }
        });
        const appMain = document.getElementById('app') || document.querySelector('.app-container, main');
        if (appMain) appMain.style.display = 'block';
        try { if (typeof render === 'function') render(); } catch(_) {}
      }
    }
  }

  setTimeout(bypassLoginOffline, 800);
  setTimeout(bypassLoginOffline, 2000);
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('button');
    if (btn && btn.textContent.includes('تسجيل الدخول') && !navigator.onLine) {
      e.preventDefault();
      e.stopPropagation();
      bypassLoginOffline();
    }
  }, true);
})();
