// Placeholder Image Generator
// This script creates placeholder images for development
// Run this in the browser console or include it in your HTML

(function () {
    'use strict';

    const imageData = [
        // Menu - Starters
        { name: 'scallops.jpg', text: 'Seared Scallops', color: '#FF6B6B' },
        { name: 'foie-gras.jpg', text: 'Foie Gras', color: '#8B4513' },
        { name: 'burrata.jpg', text: 'Burrata', color: '#F0E68C' },
        { name: 'tuna-tartare.jpg', text: 'Tuna Tartare', color: '#FF6347' },
        { name: 'mushroom-risotto.jpg', text: 'Mushroom Risotto', color: '#D2691E' },
        { name: 'oysters.jpg', text: 'Oysters', color: '#B0C4DE' },

        // Menu - Mains
        { name: 'wagyu.jpg', text: 'Wagyu Beef', color: '#8B0000' },
        { name: 'sea-bass.jpg', text: 'Sea Bass', color: '#4682B4' },
        { name: 'duck.jpg', text: 'Duck Breast', color: '#A0522D' },
        { name: 'lobster.jpg', text: 'Lobster', color: '#FF4500' },
        { name: 'lamb.jpg', text: 'Rack of Lamb', color: '#CD5C5C' },
        { name: 'wellington.jpg', text: 'Wellington', color: '#8FBC8F' },

        // Menu - Desserts
        { name: 'souffle.jpg', text: 'Chocolate Soufflé', color: '#3E2723' },
        { name: 'creme-brulee.jpg', text: 'Crème Brûlée', color: '#FFD700' },
        { name: 'tarte-tatin.jpg', text: 'Tarte Tatin', color: '#DEB887' },
        { name: 'tiramisu.jpg', text: 'Tiramisu', color: '#D2B48C' },
        { name: 'lemon-tart.jpg', text: 'Lemon Tart', color: '#FFFF00' },
        { name: 'cheese.jpg', text: 'Cheese Board', color: '#F5DEB3' },

        // Menu - Drinks
        { name: 'wine-red.jpg', text: 'Red Wine', color: '#722F37' },
        { name: 'champagne.jpg', text: 'Champagne', color: '#F7E7CE' },
        { name: 'wine-white.jpg', text: 'White Wine', color: '#F0E68C' },
        { name: 'cocktail.jpg', text: 'Cocktail', color: '#FF69B4' },
        { name: 'beer.jpg', text: 'Craft Beer', color: '#DAA520' },
        { name: 'coffee.jpg', text: 'Coffee', color: '#6F4E37' },

        // Events
        { name: 'wine-tasting.jpg', text: 'Wine Tasting', color: '#800020' },
        { name: 'chef-special.jpg', text: 'Chef Special', color: '#D4AF37' },
        { name: 'private-dining.jpg', text: 'Private Dining', color: '#2C3E50' },

        // Gallery
        { name: 'gallery-1.jpg', text: 'Signature Dish', color: '#E74C3C' },
        { name: 'gallery-2.jpg', text: 'Dining Area', color: '#34495E' },
        { name: 'gallery-3.jpg', text: 'Dessert', color: '#9B59B6' },
        { name: 'gallery-4.jpg', text: 'Private Room', color: '#1ABC9C' },
        { name: 'gallery-5.jpg', text: 'Chef at Work', color: '#F39C12' },
        { name: 'gallery-6.jpg', text: 'Seafood', color: '#3498DB' },
        { name: 'gallery-7.jpg', text: 'Bar Lounge', color: '#2ECC71' },
        { name: 'gallery-8.jpg', text: 'Wine Cellar', color: '#8E44AD' },
        { name: 'gallery-9.jpg', text: 'Plating', color: '#E67E22' },
        { name: 'gallery-10.jpg', text: 'Ingredients', color: '#16A085' },
        { name: 'gallery-11.jpg', text: 'Table Setting', color: '#C0392B' },
        { name: 'gallery-12.jpg', text: 'Gourmet', color: '#D35400' }
    ];

    function createPlaceholderImage(data, width = 800, height = 600) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, data.color);
        gradient.addColorStop(1, adjustBrightness(data.color, -30));

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add pattern overlay
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const radius = Math.random() * 100;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Add text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 48px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(data.text, width / 2, height / 2);

        // Add subtitle
        ctx.font = '24px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText('Placeholder Image', width / 2, height / 2 + 50);

        return canvas.toDataURL('image/jpeg', 0.9);
    }

    function adjustBrightness(color, amount) {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
        return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    }

    // Function to download all placeholders
    function downloadAllPlaceholders() {
        imageData.forEach((data, index) => {
            setTimeout(() => {
                const dataUrl = createPlaceholderImage(data);
                const link = document.createElement('a');
                link.download = data.name;
                link.href = dataUrl;
                link.click();
            }, index * 100);
        });
    }

    // Function to replace broken images with placeholders
    function replaceBrokenImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function () {
                const fileName = this.src.split('/').pop();
                const imageInfo = imageData.find(d => d.name === fileName) ||
                    { text: this.alt || 'Image', color: '#667eea' };

                const placeholder = createPlaceholderImage(imageInfo);
                this.src = placeholder;
                this.style.objectFit = 'cover';
            });
        });
    }

    // Auto-replace on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', replaceBrokenImages);
    } else {
        replaceBrokenImages();
    }

    // Expose functions globally for manual use
    window.restaurantPlaceholders = {
        downloadAll: downloadAllPlaceholders,
        create: createPlaceholderImage,
        imageData: imageData
    };

    console.log('%c📸 Placeholder Image Generator Loaded', 'font-size: 16px; color: #D4AF37; font-weight: bold;');
    console.log('%cRun restaurantPlaceholders.downloadAll() to download all placeholder images', 'font-size: 12px; color: #B8B8B8;');
})();
