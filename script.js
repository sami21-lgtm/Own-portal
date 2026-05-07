/* ===== LOADER ===== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(108, 99, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 80; i++) particles.push(new Particle());
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
init(); animate();

/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

/* ===== STATS COUNTER ===== */
const stats = document.querySelectorAll('.stat-num');
stats.forEach(stat => {
    const updateCount = () => {
        const target = +stat.getAttribute('data-count');
        const count = +stat.innerText;
        if (count < target) {
            stat.innerText = count + 1;
            setTimeout(updateCount, 100);
        } else {
            stat.innerText = target;
        }
    };
    updateCount();
});

/* ===== CV DOWNLOAD ===== */
document.querySelectorAll('[id^="downloadCV"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'My resume.pdf.pdf'; // Path to your PDF
        link.download = 'Emtiaz_Sami_CV.pdf';
        link.click();
    });
});
