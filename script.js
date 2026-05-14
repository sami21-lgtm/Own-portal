// ১. Preloader Fade Out (DOMContentLoaded এর বাইরে, সরাসরি উইন্ডো লোডের সাথে রাখা হয়েছে)
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("fade-out");
            // fade-out ট্রানজিশন শেষ হলে ডিসপ্লে পুরোপুরি ব্লক করে দেওয়া ভালো
            setTimeout(() => {
                loader.style.display = "none";
            }, 500); 
        }, 500);
    }
});

// বাকি ডম (DOM) নির্ভর ফাংশনগুলো এখানে থাকবে
document.addEventListener("DOMContentLoaded", () => {
    
    // ২. Mobile Responsive Menu Toggle
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
            // Hamburger animation
            const spans = menuBtn.querySelectorAll("span");
            if (spans.length >= 3) {
                spans[0].style.transform = mobileMenu.classList.contains("open") ? "rotate(45deg) translate(6px, 5px)" : "none";
                spans[1].style.opacity = mobileMenu.classList.contains("open") ? "0" : "1";
                spans[2].style.transform = mobileMenu.classList.contains("open") ? "rotate(-45deg) translate(6px, -5px)" : "none";
            }
        });

        // Close menu when clicking a mobile link
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                const spans = menuBtn.querySelectorAll("span");
                if (spans.length >= 3) {
                    spans[0].style.transform = "none";
                    spans[1].style.opacity = "1";
                    spans[2].style.transform = "none";
                }
            });
        });
    }

    // ৩. Navbar Scroll Magic & Back to Top Visibility
    const navbar = document.getElementById("navbar");
    const backTop = document.getElementById("backTop");

    window.addEventListener("scroll", () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.padding = "12px 0";
                navbar.style.background = "rgba(10, 15, 29, 0.85)";
            } else {
                navbar.style.padding = "20px 0";
                navbar.style.background = "rgba(10, 15, 29, 0.7)";
            }
        }

        if (backTop) {
            if (window.scrollY > 400) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }
        }
    });

    if (backTop) {
        backTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ৪. Smooth Scrolling & Active Section Highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // pageYOffset এর বদলে আধুনিক window.scrollY ব্যবহার করা নিরাপদ
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href && href.includes(current) && current !== "") {
                link.classList.add("active");
            }
        });
    });

    // ৫. Contact Form Submission Handler
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! Your message has been sent successfully.");
            contactForm.reset();
        });
    }

    // ৬. Hero Stats Counter Animation
    const counters = document.querySelectorAll('.stat-num');
    const animationSpeed = 50; 

    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const current = parseInt(counter.innerText, 10) || 0;
            const increment = Math.ceil(target / animationSpeed);

            if (current < target) {
                const nextValue = current + increment;
                counter.innerText = nextValue > target ? target : nextValue;
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });

    // ৭. Scroll Down Button Click Handler
    const scrollBtn = document.querySelector('.scroll-down');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
