// Advanced Cinematic 3D Hero with PBR Materials and Scroll Interactions
(function () {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    // Scene setup with fog for depth
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.02);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    camera.position.set(0, 2, 8);

    // Advanced particle system with depth layers
    const createParticleLayer = (count, size, color, speed, range) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = [];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * range;
            positions[i * 3 + 1] = (Math.random() - 0.5) * range;
            positions[i * 3 + 2] = (Math.random() - 0.5) * range;
            velocities.push({
                x: (Math.random() - 0.5) * speed,
                y: (Math.random() - 0.5) * speed,
                z: (Math.random() - 0.5) * speed
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: size,
            color: color,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(geometry, material);
        particles.userData.velocities = velocities;
        return particles;
    };

    const particleLayers = [
        createParticleLayer(2000, 0.015, 0xD4AF37, 0.001, 20),
        createParticleLayer(1000, 0.025, 0xFFD700, 0.002, 15),
        createParticleLayer(500, 0.035, 0xFFA500, 0.003, 10)
    ];
    particleLayers.forEach(layer => scene.add(layer));

    // Create main dish with PBR materials
    const dishGroup = new THREE.Group();

    // Base plate with realistic material
    const plateGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 64);
    const plateMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
        envMapIntensity: 1.5
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    plate.castShadow = true;
    plate.receiveShadow = true;
    dishGroup.add(plate);

    // Decorative ring
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 1.0,
        roughness: 0.2,
        emissive: 0xD4AF37,
        emissiveIntensity: 0.3
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.05;
    dishGroup.add(ring);

    // Create 3D food elements with varied geometries
    const foodElements = [];
    const foodConfigs = [
        { geometry: new THREE.SphereGeometry(0.2, 32, 32), color: 0xff6b6b, name: 'tomato' },
        { geometry: new THREE.DodecahedronGeometry(0.18, 0), color: 0x44ff44, name: 'herb' },
        { geometry: new THREE.OctahedronGeometry(0.15, 0), color: 0xffd700, name: 'garnish' },
        { geometry: new THREE.TetrahedronGeometry(0.17, 0), color: 0xff8c00, name: 'spice' },
        { geometry: new THREE.SphereGeometry(0.16, 32, 32), color: 0x8b4513, name: 'truffle' },
        { geometry: new THREE.IcosahedronGeometry(0.14, 0), color: 0x98fb98, name: 'microgreen' },
        { geometry: new THREE.SphereGeometry(0.19, 32, 32), color: 0xffa07a, name: 'protein' },
        { geometry: new THREE.DodecahedronGeometry(0.13, 0), color: 0xD4AF37, name: 'gold-element' }
    ];

    foodConfigs.forEach((config, i) => {
        const material = new THREE.MeshStandardMaterial({
            color: config.color,
            metalness: 0.3,
            roughness: 0.4,
            emissive: config.color,
            emissiveIntensity: 0.2
        });

        const food = new THREE.Mesh(config.geometry, material);
        const angle = (i / foodConfigs.length) * Math.PI * 2;
        const radius = 1.2;
        food.position.x = Math.cos(angle) * radius;
        food.position.z = Math.sin(angle) * radius;
        food.position.y = 0.3 + Math.random() * 0.3;
        food.castShadow = true;
        food.userData.originalY = food.position.y;
        food.userData.floatSpeed = 1 + Math.random();
        food.userData.floatAmplitude = 0.1 + Math.random() * 0.1;
        foodElements.push(food);
        dishGroup.add(food);
    });

    scene.add(dishGroup);
    dishGroup.position.y = 0;

    // Cinematic lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Key light (main)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x8899ff, 0.5);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    // Rim light
    const rimLight = new THREE.PointLight(0xD4AF37, 1.5, 20);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Accent lights
    const accentLight1 = new THREE.PointLight(0xff6b6b, 0.8, 10);
    accentLight1.position.set(3, 1, 3);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x44ff44, 0.8, 10);
    accentLight2.position.set(-3, 1, -3);
    scene.add(accentLight2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    document.addEventListener('mousemove', (event) => {
        targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Scroll interaction
    let scrollProgress = 0;
    window.addEventListener('scroll', () => {
        const heroHeight = container.offsetHeight;
        scrollProgress = Math.min(window.scrollY / heroHeight, 1);
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Smooth mouse following
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Animate particle layers
        particleLayers.forEach((layer, layerIndex) => {
            layer.rotation.y += 0.0002 * (layerIndex + 1);
            layer.rotation.x += 0.0001 * (layerIndex + 1);

            const positions = layer.geometry.attributes.position.array;
            const velocities = layer.userData.velocities;

            for (let i = 0; i < velocities.length; i++) {
                positions[i * 3] += velocities[i].x;
                positions[i * 3 + 1] += velocities[i].y;
                positions[i * 3 + 2] += velocities[i].z;

                // Boundary check
                if (Math.abs(positions[i * 3]) > 10) velocities[i].x *= -1;
                if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i].y *= -1;
                if (Math.abs(positions[i * 3 + 2]) > 10) velocities[i].z *= -1;
            }
            layer.geometry.attributes.position.needsUpdate = true;
        });

        // Dish group rotation and scroll effects
        dishGroup.rotation.y += 0.003;
        dishGroup.rotation.y += mouseX * 0.002;
        dishGroup.rotation.x = mouseY * 0.1;

        // Scroll-driven transformations
        dishGroup.position.y = scrollProgress * -3;
        dishGroup.rotation.z = scrollProgress * Math.PI * 0.5;
        dishGroup.scale.setScalar(1 - scrollProgress * 0.5);

        // Plate tilt based on mouse
        plate.rotation.x = mouseY * 0.2;
        plate.rotation.z = mouseX * 0.2;

        // Ring pulse
        ring.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
        ringMaterial.emissiveIntensity = 0.3 + Math.sin(time * 3) * 0.2;

        // Animate food elements with organic motion
        foodElements.forEach((food, index) => {
            // Orbital motion
            const angle = (index / foodElements.length) * Math.PI * 2 + time * 0.5;
            const radius = 1.2 + Math.sin(time + index) * 0.2;
            food.position.x = Math.cos(angle) * radius;
            food.position.z = Math.sin(angle) * radius;

            // Floating motion
            food.position.y = food.userData.originalY +
                Math.sin(time * food.userData.floatSpeed) * food.userData.floatAmplitude;

            // Rotation
            food.rotation.x += 0.01;
            food.rotation.y += 0.015;
            food.rotation.z += 0.008;

            // Scroll-driven explosion effect
            if (scrollProgress > 0.3) {
                const explosionFactor = (scrollProgress - 0.3) * 3;
                food.position.x *= 1 + explosionFactor;
                food.position.z *= 1 + explosionFactor;
                food.position.y += explosionFactor * 2;
            }
        });

        // Dynamic lighting
        rimLight.intensity = 1.5 + Math.sin(time) * 0.5;
        accentLight1.position.x = 3 * Math.cos(time);
        accentLight1.position.z = 3 * Math.sin(time);
        accentLight2.position.x = -3 * Math.cos(time + Math.PI);
        accentLight2.position.z = -3 * Math.sin(time + Math.PI);

        // Camera movement
        camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
        camera.position.y += (2 + mouseY * 1.5 - camera.position.y) * 0.03;

        // Scroll-driven camera pull back
        camera.position.z = 8 + scrollProgress * 5;
        camera.lookAt(dishGroup.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Cleanup
    window.addEventListener('beforeunload', () => {
        renderer.dispose();
        particleLayers.forEach(layer => {
            layer.geometry.dispose();
            layer.material.dispose();
        });
        foodElements.forEach(food => {
            food.geometry.dispose();
            food.material.dispose();
        });
    });
})();
