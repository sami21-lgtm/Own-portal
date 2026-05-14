/* ===== LOADER ===== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => { if (loader) loader.classList.add('hidden'); }, 1000);
});

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles');
if(canvas) {
    const ctx = canvas.getContext('2d');
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    
    let dots = [];
    for(let i=0; i<60; i++) dots.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5});
    
    function draw() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "rgba(108, 99, 255, 0.3)";
        dots.forEach(d => {
            d.x += d.vx; d.y += d.vy;
            if(d.x<0 || d.x>canvas.width) d.vx*=-1;
            if(d.y<0 || d.y>canvas.height) d.vy*=-1;
            ctx.beginPath(); ctx.arc(d.x, d.y, 1, 0, Math.PI*2); ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

/* ===== NAVBAR & SCROLL ===== */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    if (window.scrollY > 400) backTop.classList.add('show');
    else backTop.classList.remove('show');
});

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===== MOBILE MENU ===== */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('active'));
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('active')));

/* ===== STATS & SKILLS ANIMATION ===== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            if(entry.target.classList.contains('hero-stats')) {
                document.querySelectorAll('.stat-num').forEach(num => {
                    const target = +num.dataset.count;
                    let count = 0;
                    const update = () => {
                        if(count < target) { count++; num.innerText = count; setTimeout(update, 50); }
                        else num.innerText = target;
                    };
                    update();
                });
            }
            if(entry.target.classList.contains('skills-section')) {
                document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.width + '%';
                });
            }
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.hero-stats'));
observer.observe(document.querySelector('.skills-section'));

/* ===== CV DOWNLOAD ===== */
document.querySelectorAll('[id^="downloadCV"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'my-resume.pdf'; // আপনার CV ফাইলের নাম
        link.download = 'Sami_Resume.pdf';
        link.click();
    });
});
