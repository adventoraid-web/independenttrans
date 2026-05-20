document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOADING SCREEN ANIMATION
    // ==========================================
    const loader = document.getElementById('loader');

    if (loader) {

        window.addEventListener('load', () => {

            setTimeout(() => {

                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';

            }, 600);

        });

        // Fallback jika asset lambat load
        setTimeout(() => {

            if (loader.style.visibility !== 'hidden') {

                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';

            }

        }, 2500);

    }


    // ==========================================
    // 2. STICKY NAVBAR
    // ==========================================
    const navbar = document.querySelector('.navbar');

    if (navbar) {

        window.addEventListener('scroll', () => {

            if (window.scrollY > 50) {

                navbar.classList.add('scrolled');

            } else {

                navbar.classList.remove('scrolled');

            }

        });

    }


    // ==========================================
    // 3. MOBILE MENU
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .btn-cta');

    const toggleMenu = () => {

        if (mobileToggle && navMenu) {

            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

        }

    };

    // Toggle button
    if (mobileToggle) {

        mobileToggle.addEventListener('click', (e) => {

            e.stopPropagation();
            toggleMenu();

        });

    }

    // Klik menu otomatis close
    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            if (navMenu && navMenu.classList.contains('active')) {

                toggleMenu();

            }

        });

    });

    // Klik luar menu
    document.addEventListener('click', (e) => {

        if (!navMenu || !mobileToggle) return;

        const isInsideMenu = navMenu.contains(e.target);
        const isToggleButton = mobileToggle.contains(e.target);

        if (
            navMenu.classList.contains('active') &&
            !isInsideMenu &&
            !isToggleButton
        ) {

            toggleMenu();

        }

    });

    // Tutup saat scroll
    window.addEventListener('scroll', () => {

        if (
            navMenu &&
            navMenu.classList.contains('active')
        ) {

            toggleMenu();

        }

    });


    // ==========================================
    // 4. HERO PARALLAX EFFECT
    // ==========================================
    const heroBg = document.querySelector('.hero-parallax-bg');

    if (heroBg) {

        window.addEventListener('scroll', () => {

            if (window.innerWidth > 768) {

                const scrollOffset = window.pageYOffset;

                heroBg.style.transform =
                    `translateY(${scrollOffset * 0.4}px)`;

            }

        });

    }


    // ==========================================
    // 5. SCROLL REVEAL ANIMATION
    // ==========================================
    const revealItems = document.querySelectorAll('.reveal-item');

    const revealOnScroll = () => {

        const triggerBottom = (window.innerHeight / 5) * 4.2;

        revealItems.forEach(item => {

            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < triggerBottom) {

                item.classList.add('active');

            }

        });

    };

    window.addEventListener('scroll', revealOnScroll);

    // Trigger awal
    revealOnScroll();

    setTimeout(revealOnScroll, 700);


    // ==========================================
    // 6. ACTIVE NAVIGATION LINK
    // ==========================================
    const sections = document.querySelectorAll('section, header');
    const navLinksMenu = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {

        let currentSectionId = '';

        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            if (window.pageYOffset >= (sectionTop - 150)) {

                currentSectionId = section.getAttribute('id');

            }

        });

        navLinksMenu.forEach(link => {

            link.classList.remove('active');

            const href = link.getAttribute('href');

            if (href === `#${currentSectionId}`) {

                link.classList.add('active');

            }

        });

    });


    // ==========================================
    // 7. TESTIMONIAL SLIDER
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentSlide = 0;
    let slideInterval;

    // Jalankan slider hanya jika elemen ada
    if (
        slides.length > 0 &&
        dots.length > 0 &&
        prevBtn &&
        nextBtn
    ) {

        const showSlide = (index) => {

            slides.forEach(slide => {

                slide.classList.remove('active');

            });

            dots.forEach(dot => {

                dot.classList.remove('active');

            });

            if (slides[index]) {

                slides[index].classList.add('active');

            }

            if (dots[index]) {

                dots[index].classList.add('active');

            }

            currentSlide = index;

        };

        const nextSlideFunc = () => {

            let next = currentSlide + 1;

            if (next >= slides.length) {

                next = 0;

            }

            showSlide(next);

        };

        const prevSlideFunc = () => {

            let prev = currentSlide - 1;

            if (prev < 0) {

                prev = slides.length - 1;

            }

            showSlide(prev);

        };

        const startAutoplay = () => {

            slideInterval = setInterval(() => {

                nextSlideFunc();

            }, 6000);

        };

        const resetAutoplay = () => {

            clearInterval(slideInterval);
            startAutoplay();

        };

        nextBtn.addEventListener('click', () => {

            nextSlideFunc();
            resetAutoplay();

        });

        prevBtn.addEventListener('click', () => {

            prevSlideFunc();
            resetAutoplay();

        });

        dots.forEach(dot => {

            dot.addEventListener('click', (e) => {

                const targetIndex =
                    parseInt(
                        e.target.getAttribute('data-index')
                    );

                if (!isNaN(targetIndex)) {

                    showSlide(targetIndex);
                    resetAutoplay();

                }

            });

        });

        // Inisialisasi
        showSlide(0);
        startAutoplay();

    }


    // ==========================================
    // 8. FLOATING WHATSAPP BUTTON ANIMATION
    // ==========================================
    const waButton = document.querySelector('.whatsapp-floating');

    if (waButton) {

        setInterval(() => {

            waButton.style.transform = 'scale(1.12)';

            setTimeout(() => {

                waButton.style.transform = 'scale(1)';

            }, 300);

        }, 7000);

    }

});