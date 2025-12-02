# 🎬 Advanced 3D Restaurant Website - Technical Documentation

## Overview
This is a **highly immersive 3D animated restaurant website** featuring real-time WebGL rendering, cinematic lighting, PBR (Physically Based Rendering) materials, and sophisticated scroll-driven interactions.

---

## 🌟 Key Features Implemented

### 1. **Hero Section** - Cinematic 3D Showcase
**File:** `js/3d-hero.js`

#### Advanced Features:
- **Layered Particle System**: 3 depth layers (3,500 particles total) with independent velocities
- **PBR Materials**: Physically accurate metalness and roughness values
- **Cinematic Lighting**:
  - Key light (main directional)
  - Fill light (soft ambient)
  - Rim light (edge definition)
  - 2 accent lights (dynamic color)
- **8 Unique Food Elements**: Varied geometries (spheres, dodecahedrons, octahedrons, tetrahedrons, icosahedrons)
- **Scroll-Driven Effects**:
  - Camera pull-back (z-axis movement)
  - Dish rotation and scaling
  - Ingredient explosion effect (triggers at 30% scroll)
- **Mouse Interaction**: Smooth parallax camera movement
- **Organic Motion**: Individual float speeds and amplitudes per element
- **Shadow Mapping**: 2048x2048 resolution soft shadows
- **Tone Mapping**: ACES Filmic for cinematic color grading

#### Performance Optimizations:
- Pixel ratio capped at 2x
- Additive blending for particles (GPU-efficient)
- Proper geometry/material disposal on cleanup

---

### 2. **About Section** - Ingredient Breakdown Animation
**File:** `js/3d-about.js`

#### Advanced Features:
- **Detailed 3D Ingredients**:
  - **Tomato**: 64-segment sphere with emissive glow
  - **Basil**: 5 layered circular leaves
  - **Garlic**: 6-clove cluster formation
  - **Olive Oil**: Glossy sphere (90% metalness, 5% roughness)
  - **Pepper**: 8 individual peppercorns
  - **Herb Sprig**: Cylinder stem with 6 leaf attachments
- **Scroll-Triggered Animations**:
  - Intersection Observer for viewport detection
  - Staggered scale animations (elastic easing)
  - Explosion effect at 70% scroll progress
  - Automatic reset when scrolling back
- **Organic Floating**: Individual float speeds (0.8-1.8x)
- **Cinematic Lighting**: 3-point lighting setup with rim light
- **Shadow Casting**: All ingredients cast realistic shadows

---

### 3. **Virtual Tour** - Camera Rail System
**File:** `js/3d-tour.js`

#### Advanced Features:
- **4 Predefined Camera Positions**:
  - Dining Area (FOV 70°)
  - Bar Lounge (FOV 65°)
  - Private Room (FOV 60°)
  - Chef's Kitchen (FOV 75°)
- **Smooth Camera Transitions**:
  - 2-second GSAP animations
  - Power2.inOut easing
  - Dynamic FOV changes
  - Curved camera paths
- **Detailed Restaurant Interior**:
  - 5 dining tables with 4 chairs each
  - Table legs and chair backs
  - 8-meter bar counter with 6 stools
  - Private dining room with walls
  - Stainless steel kitchen counter
- **Cinematic Lighting**:
  - Spotlights on each table (1024x1024 shadows)
  - Dynamic intensity pulsing
  - Ambient and point lights
- **Mouse Drag Controls**: Free-look rotation with limits
- **Fog System**: Depth-based atmospheric fog

---

### 4. **Contact Map** - 3D Animated Location
**File:** `js/3d-map.js`

#### Advanced Features:
- **Layered Grid System**: 3 parallax grid layers with different opacities
- **Animated Location Marker**:
  - Platform base (cylinder)
  - Pin shaft (cone)
  - Glowing top (sphere with high emissive)
  - 3 pulsing rings with additive blending
- **Detailed Landmarks**:
  - **Restaurant**: Building with pyramid roof
  - **Parking**: Car model with body and top
  - **Metro**: Train car geometry
  - **Park**: Tree with trunk and foliage
- **Orbiting Camera**: Automatic 360° rotation
- **Dynamic Lighting**: Moving accent lights
- **Bounce Animation**: Smooth sine-wave marker movement
- **Scale Pulsing**: Organic breathing effect on landmarks

---

## 🎨 Visual Enhancements

### PBR Material System
All objects use physically-based rendering with:
- **Metalness**: 0.1-1.0 (surface conductivity)
- **Roughness**: 0.05-0.9 (surface smoothness)
- **Emissive**: Self-illumination for glowing effects
- **Environment Mapping**: Reflection intensity

### Lighting Architecture
- **3-Point Lighting**: Key, fill, and rim lights
- **Spotlights**: Focused beams with penumbra
- **Point Lights**: Omnidirectional illumination
- **Directional Lights**: Sun-like parallel rays
- **Shadow Mapping**: Soft PCF shadows
- **Tone Mapping**: ACES Filmic color grading

### Animation Techniques
- **Organic Motion**: Sine/cosine wave combinations
- **Stagger Effects**: Delayed sequential animations
- **Easing Functions**: Elastic, power, and smooth curves
- **Scroll Triggers**: Intersection Observer API
- **GSAP Integration**: Professional animation library
- **Camera Rails**: Predefined path transitions

---

## 📊 Performance Metrics

### Optimization Strategies:
1. **Pixel Ratio Limiting**: Max 2x for high-DPI displays
2. **Geometry Instancing**: Reused geometries for chairs/tables
3. **Texture Optimization**: No textures (procedural materials only)
4. **Shadow Map Resolution**: Balanced quality (1024-2048)
5. **Particle Count**: Optimized for 60fps
6. **Fog Culling**: Objects fade beyond view distance
7. **Proper Disposal**: Memory cleanup on page unload

### Rendering Features:
- **Antialiasing**: MSAA enabled
- **Shadow Mapping**: Soft PCF algorithm
- **Tone Mapping**: ACES Filmic
- **Alpha Blending**: Transparent particles
- **Additive Blending**: Glowing effects

---

## 🎯 Scroll-Driven Interactions

### Hero Section:
- **0-30%**: Normal rotation and floating
- **30-100%**: Explosion effect (ingredients fly outward)
- **Camera**: Pulls back from z=8 to z=13

### About Section:
- **Viewport Entry**: Staggered scale pulse (elastic)
- **70% Scroll**: Ingredient explosion
- **<50% Scroll**: Automatic reset to original positions

### Virtual Tour:
- **Button Clicks**: 2-second camera transitions
- **Mouse Drag**: Free-look rotation (±30° vertical limit)
- **Spotlights**: Continuous intensity pulsing

### Contact Map:
- **Continuous**: Orbiting camera (360° rotation)
- **Marker**: Vertical bounce animation
- **Rings**: Radial pulse with opacity fade

---

## 🚀 Browser Compatibility

### Supported Browsers:
- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Requirements:
- **WebGL 1.0** or higher
- **JavaScript ES6** support
- **GSAP 3.12+** (loaded via CDN)
- **Three.js r128** (loaded via CDN)

---

## 📱 Responsive Design

### Desktop (1024px+):
- Full 3D experience
- Mouse drag controls
- High particle counts
- 2x pixel ratio

### Tablet (768-1023px):
- Optimized particle counts
- Touch-friendly controls
- 1.5x pixel ratio

### Mobile (<768px):
- Reduced particle counts
- Simplified geometries
- 1x pixel ratio
- Touch gestures enabled

---

## 🎬 Cinematic Techniques

### Camera Work:
- **Dolly Shots**: Z-axis movement
- **Orbiting**: Circular camera paths
- **Tilting**: X-axis rotation
- **Panning**: Y-axis rotation
- **FOV Changes**: Zoom effects

### Lighting:
- **Three-Point Setup**: Professional studio lighting
- **Rim Lighting**: Edge definition
- **Accent Lights**: Color atmosphere
- **Dynamic Intensity**: Pulsing effects
- **Shadow Casting**: Depth perception

### Motion:
- **Easing Curves**: Natural acceleration/deceleration
- **Stagger Delays**: Sequential reveals
- **Organic Floating**: Sine wave variations
- **Rotation**: Multi-axis spinning
- **Scale Pulsing**: Breathing effects

---

## 🔧 Technical Stack

### Core Technologies:
- **Three.js r128**: WebGL rendering engine
- **GSAP 3.12**: Animation library
- **ScrollTrigger**: Scroll-based animations
- **Vanilla JavaScript**: No framework dependencies

### 3D Techniques:
- **PBR Materials**: Physically-based rendering
- **Shadow Mapping**: Real-time shadows
- **Particle Systems**: GPU-accelerated
- **Fog Effects**: Atmospheric depth
- **Tone Mapping**: Color grading

---

## 📝 Code Structure

```
js/
├── 3d-hero.js          (330 lines) - Hero section with explosion
├── 3d-about.js         (280 lines) - Ingredient breakdown
├── 3d-tour.js          (350 lines) - Virtual restaurant tour
├── 3d-map.js           (260 lines) - Animated location map
├── menu.js             (80 lines)  - Menu filtering
├── gallery.js          (120 lines) - Lightbox viewer
├── main.js             (280 lines) - Core functionality
├── menu-data.js        (150 lines) - Menu items
├── gallery-data.js     (40 lines)  - Gallery images
└── placeholder-generator.js (120 lines) - Image placeholders
```

---

## 🎨 Visual Effects Summary

### Particle Effects:
- 3,500 particles in hero (3 layers)
- Velocity-based movement
- Additive blending
- Depth-based opacity

### Material Effects:
- Metallic surfaces (gold, steel)
- Glossy reflections (oil, glass)
- Matte surfaces (wood, fabric)
- Emissive glows (lights, markers)

### Animation Effects:
- Floating (sine waves)
- Rotation (multi-axis)
- Scaling (pulsing)
- Explosion (radial)
- Orbiting (circular paths)

---

## 🏆 Best Practices Implemented

1. **Performance**: Optimized for 60fps
2. **Accessibility**: Keyboard navigation support
3. **Responsiveness**: Mobile-first approach
4. **Code Quality**: Modular, commented code
5. **Memory Management**: Proper disposal
6. **Browser Support**: Wide compatibility
7. **User Experience**: Smooth, natural motion
8. **Visual Hierarchy**: Clear focal points

---

## 🎯 Next Steps (Optional Enhancements)

### Potential Additions:
1. **Post-Processing**: Bloom, depth of field, motion blur
2. **Advanced Textures**: Normal maps, displacement
3. **Audio Integration**: Ambient sounds, UI feedback
4. **VR Support**: WebXR for immersive viewing
5. **Physics Engine**: Realistic object interactions
6. **Loading Screen**: 3D progress indicator
7. **Performance Monitoring**: FPS counter, stats panel

---

## 📞 Support & Documentation

For questions or issues:
1. Check browser console for errors
2. Verify WebGL support: `chrome://gpu`
3. Update graphics drivers
4. Clear browser cache
5. Test in Chrome (best compatibility)

---

**Built with ❤️ using Three.js, GSAP, and modern web technologies**

*Last Updated: December 2, 2025*
