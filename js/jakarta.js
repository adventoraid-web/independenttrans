document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // LOADING SCREEN
    // =========================
    const loader = document.querySelector('.loader-wrapper');

    window.addEventListener('load', () => {
        if (loader) {
            loader.style.opacity = '0';

            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // =========================
    // ELEMENT SELECTOR
    // =========================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const backToTopBtn = document.getElementById('backToTop');

    // =========================
    // NAVBAR SCROLL EFFECT
    // =========================
    window.addEventListener('scroll', () => {

        let current = '';

        // Navbar Effect
        if (navbar) {

            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

        }

        // Back To Top Button
        if (backToTopBtn) {

            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }

        }

        // Active Navbar Link
        sections.forEach(section => {

            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                current = section.getAttribute('id');
            }

        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }

        });

    });

    // =========================
    // HAMBURGER MENU
    // =========================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger && navMenu) {

        // Toggle Menu
        hamburger.addEventListener('click', (e) => {

            e.stopPropagation();

            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');

            if (navMenu.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }

        });

        // Prevent menu click from closing
        navMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close menu when click nav link
        navLinks.forEach(link => {

            link.addEventListener('click', () => {
                closeMenu();
            });

        });

        // Close menu when click outside
        document.addEventListener('click', () => {
            closeMenu();
        });

    }

    // =========================
    // CLOSE MENU FUNCTION
    // =========================
    function closeMenu() {

        if (navMenu.classList.contains('active')) {

            navMenu.classList.remove('active');

            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';

        }

    }

    // =========================
    // SMOOTH SCROLL
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {

                e.preventDefault();

                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });

            }

        });

    });

    // =========================
    // BACK TO TOP
    // =========================
    if (backToTopBtn) {

        backToTopBtn.addEventListener('click', () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        });

    }

    // =========================
    // SCROLL REVEAL
    // =========================
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('active');
                observer.unobserve(entry.target);

            }

        });

    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // =========================
    // FAQ ACCORDION
    // =========================
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {

        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        if (header && content) {

            header.addEventListener('click', () => {

                const isActive = item.classList.contains('active');

                // Close All
                accordionItems.forEach(otherItem => {

                    otherItem.classList.remove('active');

                    const otherContent = otherItem.querySelector('.accordion-content');

                    if (otherContent) {
                        otherContent.style.maxHeight = null;
                    }

                });

                // Open Selected
                if (!isActive) {

                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';

                }

            });

        }

    });

});