const container = document.getElementById("petalsContainer");

const colors = ["green", "cream", "gold", "light"];

function createPetal() {
  const petal = document.createElement("div");

  petal.classList.add("petal");
  petal.classList.add(colors[Math.floor(Math.random() * colors.length)]);

  const size = Math.random() * 10 + 8;
  const left = Math.random() * 100;
  const duration = Math.random() * 9 + 9;
  const delay = Math.random() * 6;
  const moveX = Math.random() * 160 - 80;

  petal.style.left = `${left}%`;
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 0.65}px`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${delay}s`;
  petal.style.setProperty("--move-x", `${moveX}px`);

  container.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, (duration + delay) * 1000);
}

function startPetals() {
  setInterval(createPetal, 450);
}

startPetals();

for (let i = 0; i < 22; i++) {
  createPetal();
}




const bgC = document.getElementById('bgCanvas');
const bgX = bgC.getContext('2d');
 
function resizeBg(){
  bgC.width  = window.innerWidth;
  bgC.height = window.innerHeight;
}
resizeBg();
window.addEventListener('resize', resizeBg);
 
const orbs = Array.from({length:28}, () => ({
  x: Math.random(), y: Math.random(),
  r: 30 + Math.random() * 100,
  a: 0.025 + Math.random() * 0.065,
  c: Math.random() > 0.55 ? '185,60,85' : '195,140,55',
  sp: 0.00018 + Math.random() * 0.00032,
  ph: Math.random() * Math.PI * 2
}));
 
let T = 0;
function drawBg(ts){
  T = ts * 0.001;
  bgX.fillStyle = 'rgba(12,3,8,0.92)';
  bgX.fillRect(0,0,bgC.width,bgC.height);
 
  orbs.forEach(o => {
    const x = (o.x + Math.sin(T * o.sp + o.ph) * 0.06) * bgC.width;
    const y = (o.y + Math.cos(T * o.sp * 0.7 + o.ph) * 0.05) * bgC.height;
    const g = bgX.createRadialGradient(x,y,0,x,y,o.r);
    g.addColorStop(0, `rgba(${o.c},${o.a})`);
    g.addColorStop(1, 'transparent');
    bgX.fillStyle = g;
    bgX.beginPath();
    bgX.arc(x,y,o.r,0,Math.PI*2);
    bgX.fill();
  });
  requestAnimationFrame(drawBg);
}
requestAnimationFrame(drawBg);
 
 
/* ═══════════════════════════════════════
   FLOATING PETALS
═══════════════════════════════════════ */
const petalShapes = ['♥','✿','❀','❁','✾'];
for(let i=0;i<22;i++){
  const el = document.createElement('span');
  el.className = 'petal';
  const size = 8 + Math.random() * 10;
  el.style.cssText = `
    left:${Math.random()*100}vw;
    font-size:${size}px;
    color:rgba(${Math.random()>0.5?'210,120,140':'200,140,60'},${0.4+Math.random()*0.35});
    animation-duration:${8+Math.random()*14}s;
    animation-delay:${Math.random()*12}s;
  `;
  el.textContent = petalShapes[Math.floor(Math.random()*petalShapes.length)];
  document.body.appendChild(el);
}
 
 
/* ═══════════════════════════════════════
   WAX SEAL (CANVAS)
═══════════════════════════════════════ */
(function drawSeal(){
  const cv = document.getElementById('sealCanvas');
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const cx = W/2, cy = H/2;
  const R = 122; // base radius
 
  /* --- build organic wax path --- */
  function waxPath(){
    ctx.beginPath();
    const N = 180;
    for(let i=0;i<=N;i++){
      const a = (i/N)*Math.PI*2;
      const bump =
        Math.sin(a*7  + 1.1)*7   +
        Math.sin(a*11 + 0.9)*4.5 +
        Math.sin(a*19 + 2.2)*3   +
        Math.sin(a*3  + 0.4)*8   +
        Math.sin(a*29 + 1.5)*2;
      const r = R + bump;
      const x = cx + r*Math.cos(a);
      const y = cy + r*Math.sin(a);
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    }
    ctx.closePath();
  }
 
  /* --- outer drop shadow --- */
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.65)';
  ctx.shadowBlur  = 35;
  ctx.shadowOffsetY = 14;
  waxPath();
  ctx.fillStyle = '#2a0008';
  ctx.fill();
  ctx.restore();
 
  /* --- main wax fill --- */
  waxPath();
  ctx.save();
  const mg = ctx.createRadialGradient(cx-28,cy-32,8, cx,cy, R+18);
  mg.addColorStop(0,   '#d83858');
  mg.addColorStop(0.2, '#b02035');
  mg.addColorStop(0.5, '#880f22');
  mg.addColorStop(0.78,'#5e0915');
  mg.addColorStop(1,   '#320408');
  ctx.fillStyle = mg;
  ctx.fill();
 
  /* edge darkening ring */
  waxPath();
  const eg = ctx.createRadialGradient(cx,cy,R*0.55, cx,cy, R+14);
  eg.addColorStop(0,'transparent');
  eg.addColorStop(1,'rgba(0,0,0,0.55)');
  ctx.fillStyle = eg;
  ctx.fill();
  ctx.restore();
 
  /* --- inner decorations (clipped) --- */
  ctx.save();
  waxPath();
  ctx.clip();
 
  /* subtle warm inner reflection */
  const ig = ctx.createRadialGradient(cx-25,cy-30,0, cx-20,cy-24, 90);
  ig.addColorStop(0,'rgba(255,195,200,0.22)');
  ig.addColorStop(1,'transparent');
  ctx.fillStyle = ig;
  ctx.fillRect(0,0,W,H);
 
  /* inner circle groove (bevel) */
  for(const [inR,col,lw] of [
    [92,'rgba(0,0,0,0.30)',3],
    [91,'rgba(255,160,170,0.20)',1.2]
  ]){
    ctx.beginPath();ctx.arc(cx,cy,inR,0,Math.PI*2);
    ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.stroke();
  }
 
  /* beaded border ring at r=84 */
  for(let i=0;i<36;i++){
    const a=(i/36)*Math.PI*2;
    ctx.beginPath();
    ctx.arc(cx+84*Math.cos(a), cy+84*Math.sin(a), 2.8, 0, Math.PI*2);
    ctx.fillStyle='rgba(220,145,155,0.32)';
    ctx.fill();
  }
 
  /* inner rope ring */
  ctx.setLineDash([4,3.2]);
  ctx.beginPath();ctx.arc(cx,cy,76,0,Math.PI*2);
  ctx.strokeStyle='rgba(200,120,130,0.25)';ctx.lineWidth=1.2;ctx.stroke();
  ctx.setLineDash([]);
 
  /* ─── EMBOSSED DESIGN ─── */
  /* two passes: shadow (dark, offset down-right) then highlight (light, offset up-left) */
 
  function ringsPaths(ox,oy){
    ctx.save();ctx.translate(ox,oy);
    /* left ring */
    ctx.beginPath();ctx.arc(cx-18,cy, 28,0,Math.PI*2);ctx.stroke();
    /* right ring */
    ctx.beginPath();ctx.arc(cx+18,cy, 28,0,Math.PI*2);ctx.stroke();
    ctx.restore();
  }
 
  function heartPath(ox,oy, hx,hy,s){
    ctx.save();ctx.translate(ox,oy);
    ctx.beginPath();
    ctx.moveTo(hx, hy+s*0.35);
    ctx.bezierCurveTo(hx-s*1.8,hy-s*0.35, hx-s*1.8,hy-s*1.6, hx,hy-s*0.6);
    ctx.bezierCurveTo(hx+s*1.8,hy-s*1.6, hx+s*1.8,hy-s*0.35, hx,hy+s*0.35);
    ctx.closePath();ctx.stroke();
    ctx.restore();
  }
 
  function scrollPath(ox,oy){
    ctx.save();ctx.translate(ox,oy);
    /* top flourish arc */
    ctx.beginPath();
    ctx.moveTo(cx-22,cy-34);
    ctx.bezierCurveTo(cx-10,cy-58, cx+10,cy-58, cx+22,cy-34);
    ctx.stroke();
    /* small curl left */
    ctx.beginPath();
    ctx.moveTo(cx-22,cy-34);
    ctx.bezierCurveTo(cx-30,cy-38, cx-34,cy-30, cx-28,cy-26);
    ctx.stroke();
    /* small curl right */
    ctx.beginPath();
    ctx.moveTo(cx+22,cy-34);
    ctx.bezierCurveTo(cx+30,cy-38, cx+34,cy-30, cx+28,cy-26);
    ctx.stroke();
    /* bottom tiny flourish */
    ctx.beginPath();
    ctx.moveTo(cx-14,cy+36);
    ctx.bezierCurveTo(cx-6,cy+48, cx+6,cy+48, cx+14,cy+36);
    ctx.stroke();
    ctx.restore();
  }
 
  /* shadow layer */
  ctx.save();
  const SHADOW_OFF = 2.8;
  ctx.strokeStyle='rgba(18,0,4,0.42)';
  ctx.lineWidth=2.4;ctx.fillStyle='transparent';
  ringsPaths(SHADOW_OFF,SHADOW_OFF);
  heartPath(SHADOW_OFF,SHADOW_OFF, cx,cy-52, 10);
  scrollPath(SHADOW_OFF,SHADOW_OFF);
  ctx.restore();
 
  /* highlight layer */
  ctx.save();
  ctx.strokeStyle='rgba(255,160,170,0.38)';
  ctx.lineWidth=1.4;
  ringsPaths(-1.5,-2);
  heartPath(-1.5,-2, cx,cy-52, 10);
  scrollPath(-1.5,-2);
  ctx.restore();
 
  /* main layer */
  ctx.save();
  ctx.strokeStyle='rgba(210,110,125,0.28)';
  ctx.lineWidth=1.8;
  ringsPaths(0,0);
  heartPath(0,0, cx,cy-52, 10);
  scrollPath(0,0);
  ctx.restore();
 
  /* small dots at ring intersection */
  ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);
  ctx.fillStyle='rgba(230,140,155,0.35)';ctx.fill();
 
  ctx.restore(); /* end clip */
 
  /* --- specular highlight (over clipped area) --- */
  ctx.save();
  waxPath();ctx.clip();
  const hg = ctx.createRadialGradient(cx-38,cy-44,0, cx-30,cy-36, 60);
  hg.addColorStop(0,'rgba(255,235,240,0.58)');
  hg.addColorStop(0.45,'rgba(255,210,220,0.2)');
  hg.addColorStop(1,'transparent');
  ctx.fillStyle=hg;ctx.fillRect(0,0,W,H);
 
  /* bright specular dot */
  const sg = ctx.createRadialGradient(cx-44,cy-50,0, cx-44,cy-50,16);
  sg.addColorStop(0,'rgba(255,255,255,0.68)');
  sg.addColorStop(1,'transparent');
  ctx.fillStyle=sg;ctx.fillRect(cx-64,cy-70,50,50);
  ctx.restore();
 
})();
 
 
/* ═══════════════════════════════════════
   MOUSE-TRACKING 3D TILT
═══════════════════════════════════════ */
const card = document.getElementById('card');
let mx=0,my=0,tx=0,ty=0,raf;
 
document.addEventListener('mousemove', e=>{
  const rect = card.getBoundingClientRect();
  const cardCX = rect.left + rect.width/2;
  const cardCY = rect.top  + rect.height/2;
  mx = ((e.clientX - cardCX) / (rect.width/2))  * 8;
  my = ((e.clientY - cardCY) / (rect.height/2)) * 6;
});
 
document.addEventListener('mouseleave',()=>{mx=0;my=0});
 
function animTilt(){
  tx += (mx-tx)*0.08;
  ty += (my-ty)*0.08;
  card.style.transform = `rotateY(${tx}deg) rotateX(${-ty}deg)`;
  raf = requestAnimationFrame(animTilt);
}
animTilt();