/* LOADER */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => { if(loader) loader.classList.add('hidden'); }, 1200);
});

/* SCROLL EFFECTS */
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    const bt = document.getElementById('backTop');
    if(window.scrollY > 80) { 
        nav.classList.add('scrolled'); 
        bt.classList.add('show'); 
    } else { 
        nav.classList.remove('scrolled'); 
        bt.classList.remove('show'); 
    }
});

document.getElementById('backTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* STATS COUNTER */
const counters = document.querySelectorAll('.stat-num');
const animateStats = () => {
    counters.forEach(c => {
        const target = +c.dataset.count;
        let count = 0;
        const inc = target / 40;
        const update = () => {
            if(count < target) { count += inc; c.innerText = Math.ceil(count); setTimeout(update, 30); }
            else c.innerText = target;
        };
        update();
    });
};

/* SKILL BARS & OBSERVER */
const skillSec = document.getElementById('skills');
const bars = document.querySelectorAll('.skill-bar-fill');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if(entry.target.id === 'skills') bars.forEach(b => b.style.width = b.dataset.width + '%');
            if(entry.target.classList.contains('hero-stats')) animateStats();
        }
    });
}, {threshold: 0.4});

if(skillSec) observer.observe(skillSec);
const heroStats = document.querySelector('.hero-stats');
if(heroStats) observer.observe(heroStats);

/* CV DOWNLOAD */
document.querySelectorAll('#downloadCVNav').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const a = document.createElement('a');
        a.href = 'My resume.pdf.pdf'; 
        a.download = 'Md_Emtiaz_Hossain_Sami_Resume.pdf';
        a.click();
    });
});

/* PARTICLES (SIMPLE) */
const canvas = document.getElementById('particles');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let pts = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    for(let i=0; i<60; i++) pts.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx: (Math.random()-0.5)*0.5, vy: (Math.random()-0.5)*0.5});
    function anim() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "rgba(108, 99, 255, 0.3)";
        pts.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if(p.x<0 || p.x>canvas.width) p.vx *= -1;
            if(p.y<0 || p.y>canvas.height) p.vy *= -1;
            ctx.beginPath(); ctx.arc(p.x, p.y, 1.2, 0, Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(anim);
    }
    anim();
}
