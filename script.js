/* LOADER */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => { if(loader) loader.classList.add('hidden'); }, 1000);
});

/* PARTICLES */
const canvas = document.getElementById('particles');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let pts = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();

    class Pt {
        constructor() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.vx = (Math.random()-0.5)*0.5; this.vy = (Math.random()-0.5)*0.5; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, 1, 0, Math.PI*2); ctx.fillStyle = "rgba(108, 99, 255, 0.4)"; ctx.fill(); }
        move() { this.x += this.vx; this.y += this.vy; if(this.x<0 || this.x>canvas.width) this.vx*=-1; if(this.y<0 || this.y>canvas.height) this.vy*=-1; }
    }
    for(let i=0; i<60; i++) pts.push(new Pt());
    function anim() { ctx.clearRect(0,0,canvas.width, canvas.height); pts.forEach(p => { p.move(); p.draw(); }); requestAnimationFrame(anim); }
    anim();
}

/* SCROLL EFFECTS */
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const bt = document.getElementById('backTop');
    if(window.scrollY > 50) { nav.classList.add('scrolled'); bt.classList.add('show'); }
    else { nav.classList.remove('scrolled'); bt.classList.remove('show'); }
});

document.getElementById('backTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* STATS COUNTER */
const counters = document.querySelectorAll('.stat-num');
counters.forEach(c => {
    const target = +c.dataset.count;
    let count = 0;
    const update = () => {
        if(count < target) { count++; c.innerText = count; setTimeout(update, 50); }
        else c.innerText = target;
    };
    update();
});

/* SKILL BARS */
const skillSec = document.getElementById('skills');
const bars = document.querySelectorAll('.skill-bar-fill');
const obs = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) bars.forEach(b => b.style.width = b.dataset.width + '%');
}, {threshold: 0.5});
if(skillSec) obs.observe(skillSec);

/* CV DOWNLOAD */
document.getElementById('downloadCVNav').addEventListener('click', (e) => {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = 'my-resume.pdf';
    a.download = 'Sami_Resume.pdf';
    a.click();
});
