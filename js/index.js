// 1. Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    if (loader) {
        loader.style.opacity = '0';

        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// 2. Sticky Navbar & Active Link
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {

    // Sticky Effect
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }

    // Active Link on Scroll
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 3. Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {

    hamburger.addEventListener('click', () => {

        navMenu.classList.toggle('active');

        // Simple hamburger animation
        const spans = hamburger.querySelectorAll('span');

        if (spans.length >= 3) {

            spans[0].style.transform =
                navMenu.classList.contains('active')
                    ? 'rotate(45deg) translate(5px, 6px)'
                    : 'none';

            spans[1].style.opacity =
                navMenu.classList.contains('active')
                    ? '0'
                    : '1';

            spans[2].style.transform =
                navMenu.classList.contains('active')
                    ? 'rotate(-45deg) translate(5px, -6px)'
                    : 'none';
        }
    });
}

// Close menu when link is clicked
navLinks.forEach(n =>
    n.addEventListener('click', () => {

        if (navMenu) {
            navMenu.classList.remove('active');
        }

        if (hamburger) {

            const spans = hamburger.querySelectorAll('span');

            if (spans.length >= 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    })
);

// 4. Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {

    revealElements.forEach(el => {

        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 50) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// 5. Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial-content');
let currentTestimonial = 0;

function nextTestimonial() {

    if (testimonials.length === 0) return;

    testimonials[currentTestimonial].classList.remove('active');

    currentTestimonial =
        (currentTestimonial + 1) % testimonials.length;

    testimonials[currentTestimonial].classList.add('active');
}

if (testimonials.length > 0) {
    setInterval(nextTestimonial, 5000);
}

// 6. GPS Booking System + WhatsApp
const bookingForm = document.getElementById('bookingForm');
const getLocationBtn = document.getElementById('getLocation');

let customerLocation = 'Lokasi belum dibagikan';

// Ambil lokasi customer
if (getLocationBtn) {

    getLocationBtn.addEventListener('click', () => {

        if (navigator.geolocation) {

            getLocationBtn.innerText = 'Mengambil lokasi...';

            navigator.geolocation.getCurrentPosition(

                (position) => {

                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    customerLocation =
                        `https://maps.google.com/?q=${lat},${lng}`;

                    getLocationBtn.innerText =
                        'Lokasi Berhasil Diambil';
                },

                () => {

                    alert('Gagal mengambil lokasi');

                    getLocationBtn.innerText =
                        'Gunakan Lokasi Saya';
                }
            );

        } else {

            alert('Browser tidak mendukung GPS');
        }
    });
}

// Submit form booking
if (bookingForm) {

    bookingForm.addEventListener('submit', (e) => {

        e.preventDefault();

        // Ambil data form
        const name =
            document.getElementById('name')?.value || '';

        const pickup =
            document.getElementById('pickup')?.value || '';

        const destination =
            document.getElementById('dropoff')?.value || '';

        const date =
            document.getElementById('date')?.value || '';

        const passengers =
            document.getElementById('passengers')?.value || '';

        const whatsapp =
            document.getElementById('whatsapp')?.value || '';

        // Nomor admin travel
        const adminNumber = '6281234567890';

        // Pesan otomatis WhatsApp
        const message = `Halo Admin Independent Trans

Nama: ${name}
Lokasi Jemput: ${pickup}
Tujuan: ${destination}
Tanggal Berangkat: ${date}
Jumlah Penumpang: ${passengers}
Nomor WhatsApp: ${whatsapp}

Lokasi Customer:
${customerLocation}
`;

        // Redirect ke WhatsApp
        window.open(
            `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`,
            '_blank'
        );

        // Reset form
        bookingForm.reset();
    });
}

// 7. Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

if (backToTop) {

    backToTop.addEventListener('click', () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}