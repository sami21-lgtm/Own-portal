/* ===== LOADER ===== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1400);
});

/* ===== PARTICLES ===== */
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

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

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

    const btn = document.getElementById('backTop');
    if (window.scrollY > 400) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
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

/* ===== SCROLL REVEAL ===== */
function addReveals() {
    const els = document.querySelectorAll(
        '.about-sidebar, .about-card, .skill-category, .contact-info, .contact-form-wrap, .section-heading'
    );
    els.forEach(el => el.classList.add('reveal'));
}
addReveals();

function checkReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
            el.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', () => setTimeout(checkReveal, 1500));

/* ===== COUNTER ANIMATION ===== */
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const start = performance.now();
        const duration = 2000;

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(target * ease);
            if (progress < 1) requestAnimationFrame(tick);
            else counter.textContent = target;
        }
        requestAnimationFrame(tick);
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

/* ===== SKILL BARS ===== */
function animateBars() {
    document.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = bar.dataset.width + '%';
        }, 80 + i * 60);
    });
}

const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateBars();
            skillObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

const skillSec = document.querySelector('.skills-section');
if (skillSec) skillObs.observe(skillSec);

/* ===== CONTACT FORM ===== */
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const message = document.getElementById('cMessage').value.trim();

    if (!name || !email || !message) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    this.innerHTML = `
        <div class="form-success show">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you, ${name}! I'll get back to you soon.</p>
        </div>
    `;

    setTimeout(() => {
        this.innerHTML = `
            <div class="form-group">
                <label>Your Name</label>
                <input type="text" id="cName" placeholder="John Doe" required>
            </div>
            <div class="form-group">
                <label>Your Email</label>
                <input type="email" id="cEmail" placeholder="john@example.com" required>
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea id="cMessage" rows="6" placeholder="Write your message..." required></textarea>
            </div>
            <button type="submit" class="btn-primary btn-full">
                <span>Send Message</span>
                <i class="fas fa-paper-plane"></i>
            </button>
        `;
    }, 5000);
});

/* ===== DOWNLOAD CV ===== */
document.querySelectorAll('#downloadCVNav, #downloadCVMobile, #downloadCVHero, #downloadCVAbout').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // তোমার CV ফাইলের নাম এখানে দাও:
        // window.open('your-cv.pdf', '_blank');
        alert('CV link will work once you set your CV file path!');
    });
});
