# 🎨 3D Background Scroll Animation - Documentation

## Overview

The new 3D background scroll animation creates an immersive, cinematic experience using your custom image (`nano-edit-1764669803143.png`) as a textured background with advanced parallax effects, floating geometric shapes, and particle systems.

---

## ✨ Features

### 1. **Multi-Layer Parallax Background**
- 5 layered planes with your image texture
- Each layer moves at different speeds creating depth
- Opacity varies by layer for atmospheric perspective
- Responds to both scroll and mouse movement

### 2. **Floating 3D Geometric Shapes**
- 8 golden geometric objects (icosahedrons, octahedrons, tetrahedrons, etc.)
- Metallic PBR materials with emissive glow
- Organic floating motion with rotation
- Mouse-reactive positioning
- Scroll-driven depth movement

### 3. **Advanced Particle System**
- 6,000 particles across 3 layers
- Golden color palette (gold, bright gold, orange)
- Additive blending for glow effect
- Responds to scroll velocity
- Creates atmospheric depth

### 4. **Dynamic Lighting**
- Ambient base lighting
- Main directional light with shadows
- 2 animated accent lights (golden colors)
- Lights orbit and pulse with time
- Creates dramatic atmosphere

### 5. **Scroll Interactions**
All elements respond to page scroll:
- **Background layers**: Parallax movement at different speeds
- **Geometric shapes**: Move toward camera as you scroll
- **Particles**: Flow based on scroll velocity
- **Camera**: Zooms in as you scroll down
- **Opacity**: Layers fade with scroll progress

### 6. **Mouse Interactions**
- Camera follows mouse position
- Background layers tilt based on mouse
- Shapes respond to mouse movement
- Smooth easing for natural feel

---

## 🎯 How It Works

### Scroll Progress Calculation
```javascript
scrollProgress = window.scrollY / maxScroll
// Range: 0 (top) to 1 (bottom)
```

### Parallax Effect
Each layer moves at a different speed based on its depth:
```javascript
layer.position.y = scrollProgress * 10 * layer.userData.speed
// Closer layers move faster, creating depth
```

### Shape Animation
Shapes combine multiple movements:
- **Floating**: Sine wave motion
- **Rotation**: Continuous spinning
- **Scroll**: Move toward camera
- **Mouse**: Follow cursor
- **Glow**: Pulsing emissive intensity

---

## 🎨 Visual Effects

### 1. **Depth Layering**
- 5 background planes at different Z positions
- Each layer: -5, -8, -11, -14, -17 units
- Creates convincing 3D depth

### 2. **Atmospheric Fog**
```javascript
scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015)
```
- Dark fog for mysterious atmosphere
- Enhances depth perception

### 3. **Tone Mapping**
```javascript
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.3
```
- Cinematic color grading
- Enhanced contrast and vibrancy

### 4. **Additive Blending**
- Particles and some materials use additive blending
- Creates glowing, ethereal effects
- Overlapping elements brighten

---

## 🎮 Interactive Elements

### Mouse Movement
- **Camera X**: Follows horizontal mouse position
- **Camera Y**: Follows vertical mouse position
- **Layers**: Tilt and shift based on mouse
- **Smooth Easing**: 5% interpolation per frame

### Scroll Behavior
- **0-30% scroll**: Background layers parallax
- **30-60% scroll**: Shapes start moving forward
- **60-100% scroll**: Camera zooms in, elements fade

---

## 🔧 Customization Options

### Adjust Parallax Speed
```javascript
// In layer creation loop
plane.userData.speed = 0.5 + (i * 0.3);
// Increase multiplier for faster parallax
```

### Change Colors
```javascript
// Particle colors
createParticles(3000, 0xD4AF37, 0.02, 40) // Gold
createParticles(2000, 0xFFD700, 0.03, 35) // Bright gold
createParticles(1000, 0xFFA500, 0.04, 30) // Orange
```

### Modify Shape Count
```javascript
// Add more shapes to shapeConfigs array
{ 
    geometry: new THREE.IcosahedronGeometry(0.5, 0), 
    color: 0xD4AF37, 
    position: [x, y, z] 
}
```

### Adjust Scroll Sensitivity
```javascript
// Camera zoom speed
camera.position.z = 15 - scrollProgress * 10;
// Increase multiplier (10) for more dramatic zoom
```

### Change Background Opacity
```javascript
// In material creation
opacity: 0.15 - (i * 0.02)
// Adjust base opacity (0.15) for visibility
```

---

## 🎬 Animation Timeline

### Time-Based Animations
- **Rotation**: Continuous rotation of all shapes
- **Floating**: Sine wave vertical motion
- **Pulsing**: Emissive intensity variation
- **Light Orbiting**: Accent lights circle the scene
- **Particle Drift**: Slow ambient movement

### Scroll-Based Animations
- **0% scroll**: Initial state, all elements in place
- **25% scroll**: Background layers separate
- **50% scroll**: Shapes start approaching camera
- **75% scroll**: Camera zooms significantly
- **100% scroll**: Maximum zoom, elements very close

---

## 📊 Performance Optimization

### Implemented Optimizations
1. **Pixel Ratio Capping**: Max 2x device pixel ratio
2. **Geometry Instancing**: Reused geometries where possible
3. **Texture Loading**: Single texture loaded once
4. **Shadow Map Size**: Balanced quality (2048x2048)
5. **Particle Count**: Optimized for performance
6. **Cleanup**: Proper disposal on page unload

### Performance Tips
- Reduce particle count on mobile
- Lower shadow map resolution if needed
- Decrease layer count for older devices
- Adjust pixel ratio for performance

---

## 🎨 Color Palette

### Primary Colors
- **Gold**: `0xD4AF37` - Main accent color
- **Bright Gold**: `0xFFD700` - Highlights
- **Orange**: `0xFFA500` - Warm accents

### Lighting Colors
- **White**: `0xffffff` - Main light
- **Gold**: `0xD4AF37` - Accent light 1
- **Bright Gold**: `0xFFD700` - Accent light 2

### Background
- **Dark**: `0x0a0a0a` - Fog and atmosphere

---

## 🚀 Usage

### Basic Setup
The animation is automatically initialized when the page loads. It looks for:
```html
<div id="hero-canvas"></div>
```

### Requirements
- Three.js library loaded
- Image file at: `assets/nano-edit-1764669803143.png`
- Modern browser with WebGL support

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Mobile: Reduced particle count recommended

---

## 🎯 Best Practices

### Image Requirements
- **Format**: PNG with transparency (recommended)
- **Size**: 1920x1080 or higher
- **Aspect Ratio**: 16:9 or similar
- **File Size**: <2MB for fast loading

### Performance Considerations
- Monitor FPS on target devices
- Reduce effects on mobile if needed
- Test scroll performance
- Optimize image file size

### Visual Design
- Ensure image works with golden overlays
- Test visibility of foreground content
- Adjust opacity if image is too prominent
- Consider color harmony

---

## 🐛 Troubleshooting

### Image Not Showing
- Check file path: `assets/nano-edit-1764669803143.png`
- Verify image file exists
- Check browser console for errors
- Ensure texture loaded successfully

### Performance Issues
- Reduce particle count
- Lower layer count
- Decrease shadow quality
- Cap pixel ratio to 1

### Scroll Not Working
- Verify scroll event listener
- Check scrollProgress calculation
- Ensure container has correct ID
- Test on different browsers

---

## 📝 Code Structure

```
3d-background-scroll.js
├── Scene Setup
│   ├── Renderer configuration
│   ├── Camera setup
│   └── Fog settings
├── Background Layers
│   ├── Texture loading
│   ├── Layer creation (5 planes)
│   └── Material setup
├── Geometric Shapes
│   ├── Shape configurations
│   ├── Material creation
│   └── Positioning
├── Particle Systems
│   ├── 3 particle layers
│   ├── Velocity system
│   └── Boundary checking
├── Lighting
│   ├── Ambient light
│   ├── Directional light
│   └── Point lights (2)
├── Interaction Handlers
│   ├── Mouse tracking
│   ├── Scroll tracking
│   └── Velocity calculation
├── Animation Loop
│   ├── Mouse smoothing
│   ├── Layer animations
│   ├── Shape animations
│   ├── Particle updates
│   ├── Light animations
│   └── Camera movement
└── Cleanup
    └── Resource disposal
```

---

## ✨ Summary

This 3D background scroll animation creates a premium, immersive experience that:
- Uses your custom image as a parallax background
- Responds dynamically to scroll and mouse
- Features golden geometric shapes and particles
- Provides cinematic lighting and atmosphere
- Optimized for web performance
- Fully customizable and extensible

**Result**: A stunning, interactive 3D background that elevates your restaurant website to a premium, modern experience! 🍽️✨

---

*Created for Lumière Restaurant - December 2, 2025*
