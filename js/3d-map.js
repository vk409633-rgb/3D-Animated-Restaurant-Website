// Advanced 3D Animated Map with Layered Depth and Parallax
(function () {
    const container = document.getElementById('map-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 15, 40);

    const camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    camera.position.set(0, 8, 12);
    camera.lookAt(0, 0, 0);

    // Create layered map base with grid
    const mapLayers = [];

    // Bottom layer - dark grid
    const bottomLayer = new THREE.GridHelper(20, 40, 0xD4AF37, 0x333333);
    bottomLayer.position.y = -0.5;
    bottomLayer.material.opacity = 0.3;
    bottomLayer.material.transparent = true;
    scene.add(bottomLayer);

    // Middle layer - glowing grid
    const middleLayer = new THREE.GridHelper(15, 30, 0xFFD700, 0x555555);
    middleLayer.position.y = 0;
    middleLayer.material.opacity = 0.5;
    middleLayer.material.transparent = true;
    scene.add(middleLayer);

    // Top layer - bright grid
    const topLayer = new THREE.GridHelper(10, 20, 0xFFA500, 0x777777);
    topLayer.position.y = 0.5;
    topLayer.material.opacity = 0.7;
    topLayer.material.transparent = true;
    scene.add(topLayer);

    // Create animated location marker with layers
    const markerGroup = new THREE.Group();

    // Base platform
    const platformGeometry = new THREE.CylinderGeometry(0.8, 1, 0.2, 32);
    const platformMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0xD4AF37,
        emissiveIntensity: 0.4
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = 0.1;
    platform.castShadow = true;
    markerGroup.add(platform);

    // Pin base (cone)
    const pinGeometry = new THREE.ConeGeometry(0.4, 2, 32);
    const pinMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0xD4AF37,
        emissiveIntensity: 0.6
    });
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    pin.position.y = 1.2;
    pin.castShadow = true;
    markerGroup.add(pin);

    // Pin top (sphere)
    const pinTopGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const pinTopMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFD700,
        metalness: 1.0,
        roughness: 0.05,
        emissive: 0xFFD700,
        emissiveIntensity: 0.8
    });
    const pinTop = new THREE.Mesh(pinTopGeometry, pinTopMaterial);
    pinTop.position.y = 2.2;
    pinTop.castShadow = true;
    markerGroup.add(pinTop);

    // Pulsing rings around marker
    const rings = [];
    for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.RingGeometry(0.8 + i * 0.4, 1.0 + i * 0.4, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0xD4AF37,
            transparent: true,
            opacity: 0.6 - i * 0.15,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.05 + i * 0.02;
        rings.push(ring);
        markerGroup.add(ring);
    }

    scene.add(markerGroup);

    // Create floating landmark icons with detailed geometry
    const landmarks = [];

    // Restaurant icon (detailed building)
    const restaurantGroup = new THREE.Group();
    const buildingGeometry = new THREE.BoxGeometry(0.8, 1.2, 0.8);
    const buildingMaterial = new THREE.MeshStandardMaterial({
        color: 0xff6b6b,
        metalness: 0.4,
        roughness: 0.6,
        emissive: 0xff4444,
        emissiveIntensity: 0.2
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.castShadow = true;
    restaurantGroup.add(building);

    // Roof
    const roofGeometry = new THREE.ConeGeometry(0.7, 0.5, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b0000, metalness: 0.3, roughness: 0.7 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 0.85;
    roof.rotation.y = Math.PI / 4;
    restaurantGroup.add(roof);

    restaurantGroup.position.set(3, 1.5, 3);
    restaurantGroup.userData = { floatSpeed: 1.2, rotSpeed: 0.015 };
    landmarks.push(restaurantGroup);
    scene.add(restaurantGroup);

    // Parking icon (car shape)
    const parkingGroup = new THREE.Group();
    const carBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.4, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x4ecdc4, metalness: 0.6, roughness: 0.4 })
    );
    parkingGroup.add(carBody);

    const carTop = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.3, 0.4),
        new THREE.MeshStandardMaterial({ color: 0x3ab5ac, metalness: 0.6, roughness: 0.4 })
    );
    carTop.position.y = 0.35;
    parkingGroup.add(carTop);

    parkingGroup.position.set(-3, 1.5, -3);
    parkingGroup.userData = { floatSpeed: 0.9, rotSpeed: 0.012 };
    landmarks.push(parkingGroup);
    scene.add(parkingGroup);

    // Metro station (train)
    const metroGroup = new THREE.Group();
    const trainGeometry = new THREE.BoxGeometry(1.2, 0.6, 0.5);
    const trainMaterial = new THREE.MeshStandardMaterial({
        color: 0x95e1d3,
        metalness: 0.7,
        roughness: 0.3
    });
    const train = new THREE.Mesh(trainGeometry, trainMaterial);
    metroGroup.add(train);

    metroGroup.position.set(-4, 1.5, 2);
    metroGroup.userData = { floatSpeed: 1.5, rotSpeed: 0.018 };
    landmarks.push(metroGroup);
    scene.add(metroGroup);

    // Park (tree)
    const parkGroup = new THREE.Group();
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.6, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, metalness: 0.2, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    parkGroup.add(trunk);

    const foliageGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const foliageMaterial = new THREE.MeshStandardMaterial({
        color: 0x44ff44,
        metalness: 0.1,
        roughness: 0.8
    });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = 0.5;
    parkGroup.add(foliage);

    parkGroup.position.set(4, 1.5, -2);
    parkGroup.userData = { floatSpeed: 0.8, rotSpeed: 0.01 };
    landmarks.push(parkGroup);
    scene.add(parkGroup);

    // Cinematic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Key light on marker
    const keyLight = new THREE.PointLight(0xD4AF37, 2.0, 25);
    keyLight.position.set(0, 8, 0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    // Accent lights
    const accentLight1 = new THREE.PointLight(0xff6b6b, 0.8, 12);
    accentLight1.position.set(3, 3, 3);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x4ecdc4, 0.8, 12);
    accentLight2.position.set(-3, 3, -3);
    scene.add(accentLight2);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Animate map layers with parallax
        bottomLayer.rotation.y += 0.0005;
        middleLayer.rotation.y += 0.001;
        topLayer.rotation.y += 0.0015;

        // Bounce marker with smooth easing
        const bounceHeight = Math.abs(Math.sin(time * 2)) * 0.3;
        markerGroup.position.y = bounceHeight;
        markerGroup.rotation.y += 0.01;

        // Pulse rings
        rings.forEach((ring, index) => {
            const scale = 1 + Math.sin(time * 3 + index * 0.5) * 0.3;
            ring.scale.set(scale, scale, 1);
            ring.material.opacity = (0.6 - index * 0.15) * (0.5 + Math.sin(time * 3 + index * 0.5) * 0.5);
        });

        // Pulse marker glow
        pinTopMaterial.emissiveIntensity = 0.8 + Math.sin(time * 4) * 0.3;
        platformMaterial.emissiveIntensity = 0.4 + Math.sin(time * 2) * 0.2;

        // Float landmarks with organic motion
        landmarks.forEach((landmark, index) => {
            landmark.position.y = 1.5 + Math.sin(time * landmark.userData.floatSpeed + index) * 0.2;
            landmark.rotation.y += landmark.userData.rotSpeed;

            // Subtle scale pulse
            const scalePulse = 1 + Math.sin(time * 2 + index) * 0.05;
            landmark.scale.setScalar(scalePulse);
        });

        // Orbit camera around scene
        const radius = 12;
        const cameraAngle = time * 0.15;
        camera.position.x = Math.sin(cameraAngle) * radius;
        camera.position.z = Math.cos(cameraAngle) * radius;
        camera.position.y = 8 + Math.sin(time * 0.5) * 1;
        camera.lookAt(0, 0, 0);

        // Dynamic lighting
        keyLight.intensity = 2.0 + Math.sin(time * 1.5) * 0.5;

        accentLight1.position.x = 3 * Math.cos(time * 0.8);
        accentLight1.position.z = 3 * Math.sin(time * 0.8);

        accentLight2.position.x = -3 * Math.cos(time * 0.8 + Math.PI);
        accentLight2.position.z = -3 * Math.sin(time * 0.8 + Math.PI);

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);
})();
