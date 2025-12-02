// Menu functionality
(function () {
    const menuGrid = document.getElementById('menuGrid');
    const menuTabs = document.querySelectorAll('.menu-tab');

    if (!menuGrid || !menuTabs.length) return;

    let currentCategory = 'starters';

    // Render menu items
    function renderMenu(category) {
        const items = menuData[category];

        // Fade out
        gsap.to(menuGrid, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                menuGrid.innerHTML = items.map(item => `
                    <div class="menu-item" data-id="${item.id}">
                        <div class="menu-item-image">
                            <img src="${item.image}" alt="${item.name}" loading="lazy">
                        </div>
                        <div class="menu-item-content">
                            <div class="menu-item-header">
                                <h3>${item.name}</h3>
                                <span class="menu-item-price">${item.price}</span>
                            </div>
                            <p class="menu-item-description">${item.description}</p>
                            ${item.dietary.length > 0 ? `
                                <div class="menu-item-dietary">
                                    ${item.dietary.map(badge => `
                                        <span class="dietary-badge" title="${dietaryLabels[badge]}">${badge}</span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('');

                // Fade in
                gsap.to(menuGrid, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3
                });

                // Stagger animation for items
                gsap.from('.menu-item', {
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    }

    // Tab click handlers
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;

            if (category === currentCategory) return;

            currentCategory = category;

            // Update active tab
            menuTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Render new category
            renderMenu(category);
        });
    });

    // Initial render
    renderMenu(currentCategory);

    // Scroll animation for menu section
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.menu-tabs', {
        scrollTrigger: {
            trigger: '.menu',
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });
})();
