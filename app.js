
let PRODUCTS = [];
const FALLBACK_PRODUCTS = [
  {
    "id": 101,
    "name": "מערכת לקריאה למעליות",
    "price": 650,
    "category": "בטיחות",
    "image": "assets/products/elev-call.svg",
    "description": "כולל התקנה ומנוי חודשי. הוספת קומה: 50 ₪ לקומה."
  },
  {
    "id": 102,
    "name": "קסדה חכמה G4",
    "price": 500,
    "category": "בטיחות",
    "image": "assets/products/g4-helmet.svg",
    "description": "השכרה חודשית 500 ₪. דיבור דו־כיווני, תיעוד, צילום אירועים. הדרכת הטמעה חד־פעמית: 750 ₪."
  },
  {
    "id": 103,
    "name": "מד רוח IOT אלחוטי",
    "price": 1500,
    "category": "ציוד שטח",
    "image": "assets/products/anemometer.svg",
    "description": "התקנה: 1500 ₪. השכרה חודשית: 450 ₪. אלחוטי לחלוטין, אפליקציה וממשק מחשב, התראות מדויקות."
  },
  {
    "id": 104,
    "name": "REOLINK PTZ Plus",
    "price": 2100,
    "category": "מצלמות",
    "image": "assets/products/ptz-plus.svg",
    "description": "רכישה: 2100 ₪. מנוי: 100 ₪/חודש. התקנה עד 6 מ': 450 ₪; מעל 6 מ': 750 ₪ (כולל עגורן). סוללה פנימית, פאנל סולארי וכרטיס זיכרון."
  },
  {
    "id": 105,
    "name": "REOLINK GO Plus",
    "price": 1600,
    "category": "מצלמות",
    "image": "assets/products/go-plus.svg",
    "description": "רכישה: 1600 ₪. פאנל סולארי: 300 ₪. מנוי: 100 ₪/חודש. התקנה עד 6 מ': 450 ₪; מעל 6 מ': 750 ₪ (כולל עגורן)."
  },
  {
    "id": 106,
    "name": "VISIONNET 4G",
    "price": 1600,
    "category": "מצלמות",
    "image": "assets/products/visionnet-4g.svg",
    "description": "רכישה: 1600 ₪. מנוי: 100 ₪/חודש. התקנה עד 6 מ': 450 ₪; מעל 6 מ': 750 ₪ (כולל עגורן). הקלטה 24/7 ואנליטיקה מתקדמת."
  },
  {
    "id": 107,
    "name": "VISIONNET 4G OPTIC 16 (Zoom)",
    "price": 2500,
    "category": "מצלמות",
    "image": "assets/products/visionnet-zoom.svg",
    "description": "רכישה: 2500 ₪. מנוי: 100 ₪/חודש. התקנה עד 6 מ': 450 ₪; מעל 6 מ': 750 ₪ (כולל עגורן). זום אופטי מורגש בשטח."
  },
  {
    "id": 108,
    "name": "קיט ערכת חשמל למצלמה (סולארי)",
    "price": 4000,
    "category": "אביזרים",
    "image": "assets/products/solar-kit.svg",
    "description": "עלות הקיט: 4000 ₪. התקנה: 1000 ₪. טעינה וניהול מתח רציף בתנאי שטח."
  },
  {
    "id": 109,
    "name": "מצלמת עגורן מקצועית (אלחוטית)",
    "price": 13000,
    "category": "מצלמות",
    "image": "assets/products/crane-cam.svg",
    "description": "רכישה: 13,000 ₪ + סים/ענן 100 ₪/חודש. השכרה חודשית: 1450 ₪. התקנה: 2500 ₪. דוושת זום אלחוטית ויציאת 4G."
  },
  {
    "id": 110,
    "name": "גלאי עשן IOT",
    "price": 400,
    "category": "בטיחות",
    "image": "assets/products/smoke-iot.svg",
    "description": "רכישה: 400 ₪ + סים 35 ₪/חודש. או השכרה חודשית: 120 ₪. אמינות גבוהה, עמיד לאבק, ללא צורך בחשמל/רשת."
  }
];
const CART_KEY = 'si_cart_he_final';
async function loadProducts(){
  try{ const res = await fetch('content/products.json', {cache:'no-store'});
       const data = await res.json(); PRODUCTS = data.items || data; }
  catch(e){ PRODUCTS = FALLBACK_PRODUCTS; }
}
function readCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || [] } catch(e){ return [] } }
function writeCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); updateCartBadge(); }
function addToCart(id){ const items = readCart(); const i = items.findIndex(x=>x.id===id);
  if(i>=0) items[i].qty+=1; else items.push({id,qty:1}); writeCart(items); alert('נוסף לעגלה!'); }
function removeFromCart(id){ writeCart(readCart().filter(x=>x.id!==id)); if(window.renderCart) renderCart(); }
function setQty(id, q){ const items = readCart(); const it = items.find(x=>x.id===id); if(!it) return;
  it.qty=Math.max(1,q|0); writeCart(items); if(window.renderCart) renderCart(); }
function calcCartSummary(){ const items=readCart(); const enriched=items.map(it=>({...it,product:PRODUCTS.find(p=>p.id===it.id)})).filter(x=>x.product);
  const total=enriched.reduce((s,x)=>s+x.product.price*x.qty,0); return {items:enriched,total}; }
function updateCartBadge(){ const b=document.querySelector('[data-cart-count]'); if(!b) return;
  b.textContent = readCart().reduce((s,x)=>s+x.qty,0); }
function money(n){ return new Intl.NumberFormat('he-IL',{style:'currency',currency:'ILS'}).format(n); }
async function mountCatalog(){ const grid=document.querySelector('[data-grid]'); if(!grid) return;
  const search=document.querySelector('[data-search]'); const cat=document.querySelector('[data-cat]');
  const min=document.querySelector('[data-min]'); const max=document.querySelector('[data-max]');
  function filter(){ const q=(search.value||'').trim(); const c=cat.value; const mn=parseFloat(min.value||0); const mx=parseFloat(max.value||Infinity);
    return PRODUCTS.filter(p=>{ const okQ=!q||p.name.includes(q)||p.description.includes(q); const okC=!c||p.category===c; const okP=p.price>=mn&&p.price<=mx; return okQ&&okC&&okP; }); }
  function render(){ const items=filter(); grid.innerHTML=items.map(p=>`
    <div class="card">
      <div class="thumb"><img src="${p.image}" alt=""></div>
      <div class="body">
        <div class="tag">${p.category}</div>
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:center">
          <div><div style="font-weight:700">${p.name}</div><div class="meta">${p.description}</div></div>
          <div class="price">${money(p.price)}</div>
        </div>
        <button class="btn" onclick="addToCart(${p.id})">הוספה לעגלה</button>
      </div>
    </div>`).join(''); }
  [search,cat,min,max].forEach(el=>el&&el.addEventListener('input',render)); render(); }
function mountCart(){ const t=document.querySelector('[data-cart-table]'); const tot=document.querySelector('[data-total]'); if(!t||!tot) return;
  window.renderCart=function(){ const {items,total}=calcCartSummary();
    if(!items.length){ t.innerHTML='<tr><td colspan="5" class="meta">העגלה ריקה</td></tr>'; tot.textContent=money(0); return; }
    t.innerHTML=items.map(x=>`
      <tr>
        <td style="width:80px"><img src="${x.product.image}" style="width:80px;border-radius:8px;border:1px solid #1f2937"></td>
        <td><div style="font-weight:600">${x.product.name}</div><div class="meta">${x.product.description}</div></td>
        <td>${money(x.product.price)}</td>
        <td><div style="display:flex;gap:8px;align-items:center">
            <button class="btn secondary" onclick="setQty(${x.id}, ${x.qty-1})">-</button>
            <span class="badge" style="min-width:34px;text-align:center">${x.qty}</span>
            <button class="btn secondary" onclick="setQty(${x.id}, ${x.qty+1})">+</button></div></td>
        <td><button class="btn" style="background:var(--danger)" onclick="removeFromCart(${x.id})">הסרה</button></td>
      </tr>`).join(''); tot.textContent=money(total); }; renderCart(); }
function mountCheckout(){ const list=document.querySelector('[data-checkout-items]'); const tot=document.querySelector('[data-ck-total]'); const form=document.querySelector('[data-ck-form]');
  if(!list||!tot||!form) return; const {items,total}=calcCartSummary();
  list.innerHTML = items.length?items.map(x=>`<li style="display:flex;justify-content:space-between;gap:12px"><span>${x.product.name} × ${x.qty}</span><span>${money(x.product.price*x.qty)}</span></li>`).join(''):'<li class="meta">העגלה ריקה</li>';
  tot.textContent = money(total);
  form.addEventListener('submit',e=>{e.preventDefault(); if(!items.length){alert('העגלה ריקה');return;} alert('תשלום דמו הושלם!'); writeCart([]); location.href='index.html';});
}
document.addEventListener('DOMContentLoaded', async ()=>{ await loadProducts(); updateCartBadge(); mountCatalog(); mountCart(); mountCheckout(); });
