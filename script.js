document.addEventListener('DOMContentLoaded', () => {
    
    // ১. প্রি-লোডার হ্যান্ডলার (Pre-loader)
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 300);
    });

    // ২. মোবাইল রেসপনসিভ মেনু টগল (Mobile Navbar Toggle)
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
    });

    // মেনু লিঙ্কে ক্লিক করলে অটোমেটিক মেনু বন্ধ হওয়ার লজিক
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

    // ৩. স্ক্রল এফেক্টস (Sticky Header & Back To Top Button)
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backTop.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backTop.classList.remove('show');
        }
    });

    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ৪. স্ট্যাট কাউন্টার অ্যানিমেশন (Number Increment Animation)
    const stats = document.querySelectorAll('.stat-num');
    let animated = false;

    const startCounter = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 30; // স্পিড কন্ট্রোল
            
            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    stat.innerText = Math.ceil(current);
                    setTimeout(updateNumber, 40);
                } else {
                    stat.innerText = target;
                }
            };
            updateNumber();
        });
    };

    // যখন স্ক্রল করে হিরো এরিয়াতে থাকবে তখনই শুধু অ্যানিমেশন চালু হবে
    const checkScroll = () => {
        if (!animated && window.scrollY < 500) {
            startCounter();
            animated = true;
        }
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // ফার্স্ট টাইম লোডের জন্য রান করা হলো

    // ৫. ব্যাকগ্রাউন্ড পার্টিকেলস এফেক্ট (Custom Canvas Particles)
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const numberOfParticles = 60;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = 'rgba(59, 130, 246, ' + (Math.random() * 0.3 + 0.1) + ')';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const initParticles = () => {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    };

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();

    // ==========================================================================
    // ৬. সিভি ডাউনলোড অপশন (CV Download Handler via JS)
    // ==========================================================================
    const cvPath = "my-resume.pdf"; // আপনার সিভির ফাইল নেম (প্রজেক্ট ফোল্ডারে থাকতে হবে)
    const cvDownloadName = "Emtiaz_Sami_CV.pdf"; // ডাউনলোড হওয়ার পর যে নাম দেখাবে

    const handleCVDownload = (e) => {
        e.preventDefault(); // ডিফল্ট '#' লিঙ্কের কাজ বন্ধ করবে
        
        // ব্যাকগ্রাউন্ডে একটি ইনভিজিবল ডাউনলোড লিঙ্ক তৈরি করার লজিক
        const link = document.createElement('a');
        link.href = cvPath;
        link.download = cvDownloadName;
        
        document.body.appendChild(link);
        link.click(); // অটোমেটিক ক্লিক ট্রিগার করবে
        document.body.removeChild(link); // কাজ শেষে লিঙ্কটি রিমুভ করে দেবে
    };

    // ডেক্সটপ এবং মোবাইল—দুই বাটনেই ইভেন্ট লিসেনার কানেক্ট করা হলো
    const navCVBtn = document.getElementById('downloadCVNav');
    const mobileCVBtn = document.getElementById('downloadCVMobile');

    if (navCVBtn) navCVBtn.addEventListener('click', handleCVDownload);
    if (mobileCVBtn) mobileCVBtn.addEventListener('click', handleCVDownload);
});
