/* ===== LOADER ===== */
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
    }
}
window.addEventListener('load', () => setTimeout(hideLoader, 1000));

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
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
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
for (let i = 0; i < 60; i++) pts.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===== NAVBAR & BACK TO TOP ===== */
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

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

/* ===== STATS COUNTER ===== */
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(counter => {
        const target = +counter.dataset.count;
        let count = 0;
        const inc = target / 100;
        const update = () => {
            if (count < target) {
                count += inc;
                counter.innerText = Math.ceil(count);
                setTimeout(update, 20);
            } else counter.innerText = target;
        };
        update();
    });
}

/* ===== SKILL BARS ===== */
function animateBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
    });
}

/* ===== INTERSECTION OBSERVER ===== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hero-stats')) animateCounters();
            if (entry.target.classList.contains('skills-section')) animateBars();
        }
    });
}, { threshold: 0.5 });

if (document.querySelector('.hero-stats')) observer.observe(document.querySelector('.hero-stats'));
if (document.querySelector('.skills-section')) observer.observe(document.querySelector('.skills-section'));

/* ===== CV DOWNLOAD LOGIC ===== */
document.querySelectorAll('#downloadCVNav, #downloadCVMobile, #downloadCVHero, #downloadCVAbout').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // আপনার CV ফাইলটির নাম এখানে দিন
        const cvLink = 'My resume.pdf.pdf'; 
        const a = document.createElement('a');
        a.href = cvLink;
        a.download = 'Md_Emtiaz_Hossain_Sami_CV.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('cName').value;
        this.innerHTML = `
            <div style="text-align:center; padding: 40px 0;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: #00e676;"></i>
                <h3 style="margin-top: 15px;">Success!</h3>
                <p>Thank you ${name}, your message has been sent.</p>
            </div>
        `;
    });
}
