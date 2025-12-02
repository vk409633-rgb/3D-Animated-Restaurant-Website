# Lumière - Advanced 3D Animated Restaurant Website

A **highly immersive, cinematic 3D restaurant website** featuring real-time WebGL rendering, PBR materials, sophisticated scroll-driven animations, and professional-grade lighting.

## 🎬 Advanced Features

### Cinematic 3D Rendering
- **PBR Materials**: Physically-based rendering with metalness, roughness, and emissive properties
- **Real-Time Shadows**: 2048x2048 soft shadow mapping
- **Tone Mapping**: ACES Filmic color grading for cinematic look
- **Fog System**: Depth-based atmospheric effects
- **Multi-Layer Particles**: 3,500 particles across 3 depth layers

### Scroll-Driven Interactions
- **Hero Explosion Effect**: Ingredients fly outward at 30% scroll
- **Camera Rails**: Smooth z-axis pull-back on scroll
- **Ingredient Breakdown**: Scroll-triggered explosion at 70%
- **Intersection Observer**: Viewport-based animation triggers
- **Organic Motion**: Sine wave floating with individual speeds

### Interactive 3D Elements
1. **3D Hero Section**: Rotating dish with 8 unique food elements and layered particles
2. **3D About Section**: Detailed ingredient models with explosion animations
3. **Virtual Restaurant Tour**: 4 camera positions with smooth 2-second transitions
4. **3D Animated Map**: Orbiting camera with pulsing location marker

### Cinematic Lighting
- **3-Point Lighting**: Key, fill, and rim lights
- **Spotlights**: Focused beams on dining tables
- **Dynamic Intensity**: Pulsing and breathing effects
- **Accent Lights**: Moving colored lights for atmosphere

### Sections
1. **Landing Page / Hero** - Immersive 3D showcase with rotating elements
2. **About / Story** - Restaurant history with 3D floating ingredients
3. **Menu** - Categorized dishes with hover effects and dietary labels
4. **Virtual Tour** - 3D restaurant walkthrough (dining, bar, private room, kitchen)
5. **Reservation System** - Elegant booking form with validation
6. **Events & Offers** - Seasonal menus and special occasions
7. **Gallery** - Masonry grid with lightbox viewer
8. **Reviews** - Customer testimonials with glowing star ratings
9. **Contact & Location** - 3D animated map with contact details
10. **Footer** - Quick links, social media, newsletter signup

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, glassmorphism, animations
- **JavaScript (ES6+)** - Modern vanilla JS
- **Three.js** - 3D graphics and animations
- **GSAP** - Smooth scroll animations and transitions
- **ScrollTrigger** - Scroll-based animations

## 📁 Project Structure

```
3D Animated Restaurant Website/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles with design system
├── js/
│   ├── main.js            # Core functionality
│   ├── menu.js            # Menu filtering and display
│   ├── gallery.js         # Gallery and lightbox
│   ├── menu-data.js       # Menu items data
│   ├── gallery-data.js    # Gallery images data
│   ├── 3d-hero.js         # Hero 3D animation
│   ├── 3d-about.js        # About section 3D elements
│   ├── 3d-tour.js         # Virtual tour 3D scene
│   └── 3d-map.js          # Contact map 3D animation
└── images/                # Image assets (see below)
```

## 🖼️ Required Images

You'll need to add the following images to the `images/` folder:

### Menu Items (24 images)
**Starters:**
- `scallops.jpg` - Pan-seared scallops
- `foie-gras.jpg` - Foie gras terrine
- `burrata.jpg` - Burrata with heirloom tomatoes
- `tuna-tartare.jpg` - Tuna tartare
- `mushroom-risotto.jpg` - Wild mushroom risotto
- `oysters.jpg` - Oysters Rockefeller

**Mains:**
- `wagyu.jpg` - Wagyu beef tenderloin
- `sea-bass.jpg` - Pan-roasted sea bass
- `duck.jpg` - Duck breast à l'orange
- `lobster.jpg` - Lobster thermidor
- `lamb.jpg` - Rack of lamb
- `wellington.jpg` - Vegetable wellington

**Desserts:**
- `souffle.jpg` - Chocolate soufflé
- `creme-brulee.jpg` - Crème brûlée
- `tarte-tatin.jpg` - Tarte tatin
- `tiramisu.jpg` - Tiramisu
- `lemon-tart.jpg` - Lemon tart
- `cheese.jpg` - Cheese selection

**Drinks:**
- `wine-red.jpg` - Red wine bottle
- `champagne.jpg` - Champagne bottle
- `wine-white.jpg` - White wine bottle
- `cocktail.jpg` - Signature cocktail
- `beer.jpg` - Craft beer
- `coffee.jpg` - Artisan coffee

### Events (3 images)
- `wine-tasting.jpg` - Wine tasting event
- `chef-special.jpg` - Chef's special dish
- `private-dining.jpg` - Private dining room

### Gallery (12 images)
- `gallery-1.jpg` - Signature dish
- `gallery-2.jpg` - Main dining area
- `gallery-3.jpg` - Dessert plating
- `gallery-4.jpg` - Private dining room
- `gallery-5.jpg` - Chef at work
- `gallery-6.jpg` - Fresh seafood
- `gallery-7.jpg` - Bar & lounge
- `gallery-8.jpg` - Wine cellar
- `gallery-9.jpg` - Plating perfection
- `gallery-10.jpg` - Seasonal ingredients
- `gallery-11.jpg` - Table setting
- `gallery-12.jpg` - Gourmet presentation

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#D4AF37` - Luxury accent color
- **Dark Background**: `#0A0A0A` - Main background
- **Medium Background**: `#1A1A1A` - Section backgrounds
- **Text Primary**: `#FFFFFF` - Main text
- **Text Secondary**: `#B8B8B8` - Secondary text

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Effects
- Glassmorphism backgrounds
- Smooth GSAP animations
- Parallax scrolling
- Hover micro-interactions
- 3D transformations

## 🚀 Getting Started

1. **Clone or download** this project
2. **Add images** to the `images/` folder (see list above)
3. **Open `index.html`** in a modern web browser
4. **Enjoy** the immersive 3D experience!

### For Development
Simply open `index.html` in your browser. No build process required!

### For Production
1. Optimize images (compress and convert to WebP for better performance)
2. Minify CSS and JavaScript files
3. Add proper meta tags for SEO
4. Test on multiple devices and browsers
5. Deploy to your hosting service

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## ✨ Key Features

### Navigation
- Sticky navbar with scroll effect
- Smooth scrolling to sections
- Active link highlighting
- Mobile hamburger menu

### Forms
- Reservation form with validation
- Newsletter subscription
- Date picker with minimum date validation
- Success animations

### Animations
- GSAP scroll-triggered animations
- Stagger effects on menu items and gallery
- Parallax effects
- Custom cursor (desktop only)
- Smooth page transitions

### 3D Interactions
- Mouse-based camera movement in hero
- Draggable camera in virtual tour
- Floating and rotating 3D objects
- Dynamic lighting effects

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

**Note**: Requires WebGL support for 3D features.

## 📝 Customization

### Changing Restaurant Information
Edit the HTML content in `index.html`:
- Restaurant name: Search for "Lumière"
- Contact details: Update in the Contact section
- Opening hours: Modify in the Contact section

### Updating Menu
Edit `js/menu-data.js` to add, remove, or modify menu items.

### Modifying Gallery
Edit `js/gallery-data.js` to change gallery images and categories.

### Styling
All styles are in `css/style.css`. Modify CSS custom properties at the top of the file to change the design system.

## 🎯 Performance Tips

1. **Optimize Images**: Use WebP format and compress images
2. **Lazy Loading**: Images already use `loading="lazy"`
3. **CDN**: Consider using CDN for Three.js and GSAP in production
4. **Caching**: Implement browser caching for static assets
5. **Minification**: Minify CSS and JS for production

## 📄 License

This is a demonstration project. Feel free to use and modify for your own restaurant website.

## 🤝 Credits

- **Design & Development**: Created with modern web technologies
- **3D Graphics**: Three.js
- **Animations**: GSAP (GreenSock Animation Platform)
- **Fonts**: Google Fonts (Playfair Display, Inter)

## 📧 Support

For questions or issues, please refer to the documentation or contact the development team.

---

**Enjoy your immersive 3D restaurant experience!** 🍽️✨
