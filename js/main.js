// Main JavaScript for general functionality
(function () {
    'use strict';

    // ===================================
    // Navigation
    // ===================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ===================================
    // Smooth Scroll
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Reservation Form
    // ===================================
    const reservationForm = document.getElementById('reservationForm');

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData);

            // Animate button
            const submitBtn = reservationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = '✓ Reservation Confirmed!';
                submitBtn.style.background = 'linear-gradient(135deg, #44ff44 0%, #228822 100%)';

                // Show success message
                alert(`Thank you, ${data.name}! Your reservation for ${data.guests} on ${data.date} at ${data.time} has been confirmed. We'll send a confirmation email to ${data.email}.`);

                // Reset form
                setTimeout(() => {
                    reservationForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });

        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }

    // ===================================
    // Newsletter Form
    // ===================================
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = '✓ Subscribed!';
                alert(`Thank you for subscribing! We'll send updates to ${email}.`);

                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    });

    // ===================================
    // GSAP Scroll Animations
    // ===================================
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.7
    });

    gsap.from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.9
    });

    // Section animations
    const animateSections = document.querySelectorAll('.about, .menu, .virtual-tour, .reservation, .events, .gallery, .reviews, .contact');

    animateSections.forEach(section => {
        gsap.from(section.querySelector('.section-header'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8
        });
    });

    // About highlights animation
    gsap.from('.highlight-item', {
        scrollTrigger: {
            trigger: '.about-highlights',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.6
    });

    // Events cards animation
    gsap.from('.event-card', {
        scrollTrigger: {
            trigger: '.events-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8
    });

    // Reviews animation
    gsap.from('.review-card', {
        scrollTrigger: {
            trigger: '.reviews-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.9,
        stagger: 0.15,
        duration: 0.6
    });

    // Reservation form animation
    gsap.from('.reservation-form-container', {
        scrollTrigger: {
            trigger: '.reservation',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 0.8
    });

    gsap.from('.reservation-info', {
        scrollTrigger: {
            trigger: '.reservation',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8
    });

    // Contact animation
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8
    });

    gsap.from('.contact-map', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 0.8
    });

    // Footer animation
    gsap.from('.footer-grid', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    // ===================================
    // Parallax Effect
    // ===================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content, .scroll-indicator');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===================================
    // Loading Animation
    // ===================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');

        // Trigger initial animations
        gsap.from('body', {
            opacity: 0,
            duration: 0.5
        });
    });

    // ===================================
    // Cursor Effect (Desktop only)
    // ===================================
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            display: none;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Enlarge cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .menu-item, .gallery-item, .event-card, .review-card');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'rgba(212, 175, 55, 0.2)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'transparent';
            });
        });
    }

    // ===================================
    // Console Easter Egg
    // ===================================
    console.log('%c🍽️ Lumière Restaurant', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
    console.log('%cWelcome to our immersive 3D dining experience!', 'font-size: 14px; color: #B8B8B8;');
    console.log('%cInterested in our tech stack? We use Three.js, GSAP, and modern vanilla JavaScript.', 'font-size: 12px; color: #808080;');

})();
