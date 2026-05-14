/* 1. Navbar Scroll Effect */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

/* 2. Smooth Reveal for Skill Bars */
const skillBars = document.querySelectorAll('.skill-bar-fill');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width + '%';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => observer.observe(bar));

/* 3. Social Icons & Links Handler */
// Ei part-e apnar link gula properly kaj korbe
document.querySelectorAll('.contact-socials a').forEach(link => {
    link.addEventListener('click', function() {
        console.log("Redirecting to: " + this.getAttribute('href'));
    });
});

/* 4. CV Download Logic */
const downloadBtn = document.getElementById('downloadCVNav');
if(downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'my-resume.pdf'; // Apnar file er name
        link.download = 'Emtiaz_Sami_Resume.pdf';
        link.click();
    });
}
