/* ===== LOADER ===== */
const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1400);
    }
};

window.addEventListener('load', hideLoader);
document.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 2000));

/* ===== PARTICLES BACKGROUND ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.45 + 0.08;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
        ctx.fill();
    }
}

const pts = [];
const count = Math.min(70, Math.floor(window.innerWidth / 20));
for (let i = 0; i < count; i++) pts.push(new Particle());

function drawLines() {
    for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 130) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(108, 99, 255, ${0.05 * (1 - d / 130)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===== NAVBAR & ACTIVE LINKS ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Section Highlighting
    let cur = '';
    allSections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
            cur = sec.getAttribute('id');
        }
    });
    navLinks.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
    });

    // Back to Top Button
    const btn = document.getElementById('backTop');
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
});

document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== MOBILE MENU ===== */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 75, behavior: 'smooth' });
        }
    });
});

/* ===== STATS COUNTER ANIMATION ===== */
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(counter => {
        const target = parseInt(counter.dataset.count);
        let count = 0;
        const update = () => {
            const speed = target / 100;
            if (count < target) {
                count += speed;
                counter.innerText = Math.ceil(count);
                setTimeout(update, 20);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
}

const statsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObs.observe(statsEl);

/* ===== CONTACT FORM HANDLING ===== */
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('cName').value;
    
    // Simulate Success
    this.innerHTML = `
        <div class="form-success show">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #00e676;"></i>
            <h3>Message Sent!</h3>
            <p>Thank you, ${name}! I'll get back to you soon.</p>
        </div>
    `;
});

/* ===== REAL CV DOWNLOAD ===== */
document.querySelectorAll('#downloadCVNav, #downloadCVMobile, #downloadCVHero, #downloadCVAbout').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const a = document.createElement('a');
        a.href = 'my-resume.pdf'; // Apnar CV file er link
        a.download = 'MD_Emtiaz_Hossain_Sami_CV.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});
