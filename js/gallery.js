// Gallery functionality
(function () {
    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    if (!galleryGrid) return;

    let currentImageIndex = 0;

    // Render gallery
    function renderGallery() {
        galleryGrid.innerHTML = galleryData.map((item, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                </div>
            </div>
        `).join('');

        // Add click handlers
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                openLightbox(index);
            });
        });

        // Scroll animation
        gsap.from('.gallery-item', {
            scrollTrigger: {
                trigger: '.gallery',
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.8,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out'
        });
    }

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        const item = galleryData[index];
        lightboxImage.src = item.image;
        lightboxImage.alt = item.title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Animate lightbox
        gsap.from(lightboxImage, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    // Close lightbox
    function closeLightbox() {
        gsap.to(lightboxImage, {
            scale: 0.8,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navigate lightbox
    function navigateLightbox(direction) {
        currentImageIndex += direction;

        if (currentImageIndex < 0) {
            currentImageIndex = galleryData.length - 1;
        } else if (currentImageIndex >= galleryData.length) {
            currentImageIndex = 0;
        }

        const item = galleryData[currentImageIndex];

        // Slide animation
        gsap.to(lightboxImage, {
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                lightboxImage.src = item.image;
                lightboxImage.alt = item.title;
                gsap.fromTo(lightboxImage,
                    { x: direction > 0 ? -100 : 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.2 }
                );
            }
        });
    }

    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => navigateLightbox(1));
    }

    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });

    // Initial render
    renderGallery();
})();
