// 3D Background Scroll Animation with Image Texture
(function () {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    camera.position.set(0, 0, 15);

    // Load the background image texture
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load('assets/nano-edit-1764669803143.png');

    // Create multiple layered planes with the image for parallax depth
    const layers = [];
    const layerCount = 5;

    for (let i = 0; i < layerCount; i++) {
        const geometry = new THREE.PlaneGeometry(30, 20, 32, 32);

        // Create material with the texture
        const material = new THREE.MeshStandardMaterial({
            map: backgroundTexture,
            transparent: true,
            opacity: 0.15 - (i * 0.02),
            side: THREE.DoubleSide,
            metalness: 0.5,
            roughness: 0.3,
            emissive: 0xD4AF37,
            emissiveIntensity: 0.1,
            blending: THREE.AdditiveBlending
        });

        const plane = new THREE.Mesh(geometry, material);

        // Position layers at different depths
        plane.position.z = -5 - (i * 3);
        plane.userData.baseZ = plane.position.z;
        plane.userData.speed = 0.5 + (i * 0.3);
        plane.userData.index = i;

        layers.push(plane);
        scene.add(plane);
    }

    // Create floating 3D geometric shapes with glow
    const shapes = [];
    const shapeConfigs = [
        { geometry: new THREE.IcosahedronGeometry(0.5, 0), color: 0xD4AF37, position: [5, 3, -2] },
        { geometry: new THREE.OctahedronGeometry(0.6, 0), color: 0xFFD700, position: [-6, -2, -5] },
        { geometry: new THREE.TetrahedronGeometry(0.4, 0), color: 0xFFA500, position: [4, -4, -8] },
        { geometry: new THREE.DodecahedronGeometry(0.5, 0), color: 0xD4AF37, position: [-5, 4, -10] },
        { geometry: new THREE.SphereGeometry(0.3, 32, 32), color: 0xFFD700, position: [6, -1, -12] },
        { geometry: new THREE.TorusGeometry(0.4, 0.15, 16, 100), color: 0xFFA500, position: [-4, 2, -15] },
        { geometry: new THREE.IcosahedronGeometry(0.45, 0), color: 0xD4AF37, position: [3, 5, -18] },
        { geometry: new THREE.OctahedronGeometry(0.55, 0), color: 0xFFD700, position: [-6, -3, -20] }
    ];

    shapeConfigs.forEach((config, i) => {
        const material = new THREE.MeshStandardMaterial({
            color: config.color,
            metalness: 0.9,
            roughness: 0.1,
            emissive: config.color,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.8
        });

        const shape = new THREE.Mesh(config.geometry, material);
        shape.position.set(...config.position);
        shape.castShadow = true;
        shape.userData.originalPos = shape.position.clone();
        shape.userData.rotationSpeed = {
            x: 0.005 + Math.random() * 0.01,
            y: 0.008 + Math.random() * 0.01,
            z: 0.003 + Math.random() * 0.01
        };
        shapes.push(shape);
        scene.add(shape);
    });

    // Enhanced particle system
    const createParticles = (count, color, size, range) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const velocities = [];

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * range;
            positions[i * 3 + 1] = (Math.random() - 0.5) * range;
            positions[i * 3 + 2] = (Math.random() - 0.5) * range;
            velocities.push({
                x: (Math.random() - 0.5) * 0.002,
                y: (Math.random() - 0.5) * 0.002,
                z: (Math.random() - 0.5) * 0.002
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: size,
            color: color,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(geometry, material);
        particles.userData.velocities = velocities;
        return particles;
    };

    const particleSystems = [
        createParticles(3000, 0xD4AF37, 0.02, 40),
        createParticles(2000, 0xFFD700, 0.03, 35),
        createParticles(1000, 0xFFA500, 0.04, 30)
    ];
    particleSystems.forEach(ps => scene.add(ps));

    // Cinematic lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
    mainLight.position.set(10, 10, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const accentLight1 = new THREE.PointLight(0xD4AF37, 2, 30);
    accentLight1.position.set(5, 5, 0);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xFFD700, 2, 30);
    accentLight2.position.set(-5, -5, -10);
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

    // Scroll tracking
    let scrollProgress = 0;
    let lastScrollY = 0;
    let scrollVelocity = 0;

    window.addEventListener('scroll', () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = Math.min(window.scrollY / maxScroll, 1);
        scrollVelocity = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Smooth mouse following
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Animate background layers with parallax
        layers.forEach((layer, index) => {
            // Parallax scroll effect
            layer.position.y = scrollProgress * 10 * layer.userData.speed;
            layer.position.x = mouseX * 2 * (index + 1);

            // Depth-based movement
            layer.position.z = layer.userData.baseZ + Math.sin(time * 0.5 + index) * 0.5;

            // Rotation for dynamic feel
            layer.rotation.z = Math.sin(time * 0.3 + index) * 0.1 + scrollProgress * 0.5;
            layer.rotation.y = mouseX * 0.2;

            // Scale pulsing
            const scale = 1 + Math.sin(time * 0.5 + index * 0.5) * 0.05;
            layer.scale.set(scale, scale, 1);

            // Opacity changes based on scroll
            layer.material.opacity = (0.15 - (index * 0.02)) * (1 - scrollProgress * 0.5);
        });

        // Animate floating shapes
        shapes.forEach((shape, index) => {
            // Rotation
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;

            // Floating motion
            const floatY = Math.sin(time + index) * 0.5;
            const floatX = Math.cos(time * 0.7 + index) * 0.3;
            shape.position.y = shape.userData.originalPos.y + floatY;
            shape.position.x = shape.userData.originalPos.x + floatX;

            // Scroll-driven movement
            shape.position.z = shape.userData.originalPos.z + scrollProgress * 20;

            // Mouse interaction
            shape.position.x += mouseX * (index + 1) * 0.5;
            shape.position.y += mouseY * (index + 1) * 0.5;

            // Pulsing glow
            shape.material.emissiveIntensity = 0.5 + Math.sin(time * 2 + index) * 0.3;

            // Scale based on scroll
            const scrollScale = 1 + scrollProgress * 0.5;
            shape.scale.setScalar(scrollScale);
        });

        // Animate particles
        particleSystems.forEach((ps, psIndex) => {
            ps.rotation.y += 0.0001 * (psIndex + 1);

            const positions = ps.geometry.attributes.position.array;
            const velocities = ps.userData.velocities;

            for (let i = 0; i < velocities.length; i++) {
                // Add scroll velocity to particle movement
                positions[i * 3] += velocities[i].x + scrollVelocity * 0.001;
                positions[i * 3 + 1] += velocities[i].y - scrollProgress * 0.01;
                positions[i * 3 + 2] += velocities[i].z;

                // Boundary wrapping
                if (Math.abs(positions[i * 3]) > 20) positions[i * 3] *= -0.9;
                if (Math.abs(positions[i * 3 + 1]) > 20) positions[i * 3 + 1] *= -0.9;
                if (Math.abs(positions[i * 3 + 2]) > 20) positions[i * 3 + 2] *= -0.9;
            }
            ps.geometry.attributes.position.needsUpdate = true;
        });

        // Dynamic lighting
        accentLight1.position.x = 5 * Math.cos(time);
        accentLight1.position.z = 5 * Math.sin(time);
        accentLight1.intensity = 2 + Math.sin(time * 2) * 0.5;

        accentLight2.position.x = -5 * Math.cos(time + Math.PI);
        accentLight2.position.z = -10 + 5 * Math.sin(time + Math.PI);
        accentLight2.intensity = 2 + Math.cos(time * 2) * 0.5;

        // Camera movement
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.03;
        camera.position.y += (mouseY * 3 - camera.position.y) * 0.03;

        // Scroll-driven camera zoom
        camera.position.z = 15 - scrollProgress * 10;
        camera.rotation.z = scrollProgress * 0.2;

        camera.lookAt(0, 0, 0);

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
        backgroundTexture.dispose();
        layers.forEach(layer => {
            layer.geometry.dispose();
            layer.material.dispose();
        });
        shapes.forEach(shape => {
            shape.geometry.dispose();
            shape.material.dispose();
        });
        particleSystems.forEach(ps => {
            ps.geometry.dispose();
            ps.material.dispose();
        });
    });
})();
