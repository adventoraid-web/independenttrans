document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOADING ANIMATION CONTROLLER
    // ==========================================
    const loader = document.getElementById('loader');

    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }, 400);
        });
    }

    // ==========================================
    // 2. STICKY NAVBAR & ACTIVE NAV LINKS
    // ==========================================
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {

        // Sticky Navbar
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }

        // Active Nav Link
        let currentSectionId = '';

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }

        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            const href = link.getAttribute('href');

            // Hindari bentrok dengan index.html
            if (
                href &&
                href.startsWith('#') &&
                href === `#${currentSectionId}`
            ) {
                link.classList.add('active');
            }

        });

    });

    // ==========================================
    // 3. RESPONSIVE NAVBAR MOBILE
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');

    if (menuToggle && navMenu && navOverlay) {

        const toggleIcon = menuToggle.querySelector('i');

        // Toggle Menu
        menuToggle.addEventListener('click', (e) => {

            e.stopPropagation();

            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');

            if (toggleIcon) {

                if (navMenu.classList.contains('active')) {
                    toggleIcon.classList.remove('fa-bars');
                    toggleIcon.classList.add('fa-times');
                } else {
                    toggleIcon.classList.remove('fa-times');
                    toggleIcon.classList.add('fa-bars');
                }

            }

        });

        // Klik Overlay
        navOverlay.addEventListener('click', () => {

            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');

            if (toggleIcon) {
                toggleIcon.classList.remove('fa-times');
                toggleIcon.classList.add('fa-bars');
            }

        });

        // Klik Nav Link
        navLinks.forEach(link => {

            link.addEventListener('click', () => {

                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');

                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-times');
                    toggleIcon.classList.add('fa-bars');
                }

            });

        });

        // Klik luar area menu
        document.addEventListener('click', (e) => {

            if (
                !navMenu.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {

                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');

                if (toggleIcon) {
                    toggleIcon.classList.remove('fa-times');
                    toggleIcon.classList.add('fa-bars');
                }

            }

        });

    }

    // ==========================================
    // 4. FAQ ACCORDION SYSTEM
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {

        const question = item.querySelector('.faq-question');
        const currentAnswer = item.querySelector('.faq-answer');

        if (question && currentAnswer) {

            question.addEventListener('click', () => {

                const isActive = item.classList.contains('active');

                // Tutup semua FAQ
                faqItems.forEach(i => {

                    i.classList.remove('active');

                    const answer = i.querySelector('.faq-answer');

                    if (answer) {
                        answer.style.maxHeight = null;
                    }

                });

                // Buka FAQ dipilih
                if (!isActive) {

                    item.classList.add('active');

                    currentAnswer.style.maxHeight =
                        currentAnswer.scrollHeight + "px";

                }

            });

        }

    });

    // ==========================================
    // 5. SCROLL ANIMATION
    // ==========================================
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length > 0) {

        const animationObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('animated');

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });

    }

});