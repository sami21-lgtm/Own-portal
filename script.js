document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Preloader Fade Out
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("fade-out");
        }, 500);
    });

    // 2. Mobile Responsive Menu Toggle
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
        // Hamburger animation
        const spans = menuBtn.querySelectorAll("span");
        spans[0].style.transform = mobileMenu.classList.contains("open") ? "rotate(45deg) translate(6px, 5px)" : "none";
        spans[1].style.opacity = mobileMenu.classList.contains("open") ? "0" : "1";
        spans[2].style.transform = mobileMenu.classList.contains("open") ? "rotate(-45deg) translate(6px, -5px)" : "none";
    });

    // Close menu when clicking a mobile link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            const spans = menuBtn.querySelectorAll("span");
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        });
    });

    // 3. Navbar Scroll Magic & Back to Top Visibility
    const navbar = document.getElementById("navbar");
    const backTop = document.getElementById("backTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "12px 0";
            navbar.style.background = "rgba(10, 15, 29, 0.85)";
        } else {
            navbar.style.padding = "20px 0";
            navbar.style.background = "rgba(10, 15, 29, 0.7)";
        }

        if (window.scrollY > 400) {
            backTop.classList.add("show");
        } else {
            backTop.classList.remove("show");
        }
    });

    backTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 4. Smooth Scrolling & Active Section Highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 5. Contact Form Submission Handler
    const contactForm = document.getElementById("contactForm");
    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Implement your form logic or API submission here
            alert("Thank you! Your message has been sent successfully.");
            contactForm.reset();
        });
    }
});
