// 3D Animated Map
(function () {
    const container = document.getElementById('map-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);

    // Create map base (flat plane with grid)
    const mapGeometry = new THREE.PlaneGeometry(10, 10, 20, 20);
    const mapMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const map = new THREE.Mesh(mapGeometry, mapMaterial);
    map.rotation.x = -Math.PI / 2;
    scene.add(map);

    // Create location marker (animated pin)
    const markerGroup = new THREE.Group();

    // Pin base (cone)
    const pinGeometry = new THREE.ConeGeometry(0.3, 1.5, 8);
    const pinMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0xD4AF37,
        emissiveIntensity: 0.5
    });
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    pin.position.y = 0.75;
    markerGroup.add(pin);

    // Pin top (sphere)
    const pinTopGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const pinTop = new THREE.Mesh(pinTopGeometry, pinMaterial);
    pinTop.position.y = 1.5;
    markerGroup.add(pinTop);

    // Pulsing ring around marker
    const ringGeometry = new THREE.RingGeometry(0.5, 0.7, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xD4AF37,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    markerGroup.add(ring);

    scene.add(markerGroup);

    // Create floating landmark icons
    const landmarks = [];

    // Restaurant icon (cube)
    const restaurantGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const restaurantMaterial = new THREE.MeshStandardMaterial({
        color: 0xff6b6b,
        metalness: 0.5,
        roughness: 0.5
    });
    const restaurant = new THREE.Mesh(restaurantGeometry, restaurantMaterial);
    restaurant.position.set(2, 1, 2);
    landmarks.push(restaurant);
    scene.add(restaurant);

    // Parking icon (cylinder)
    const parkingGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.5, 8);
    const parkingMaterial = new THREE.MeshStandardMaterial({
        color: 0x4ecdc4,
        metalness: 0.5,
        roughness: 0.5
    });
    const parking = new THREE.Mesh(parkingGeometry, parkingMaterial);
    parking.position.set(-2, 1, -2);
    landmarks.push(parking);
    scene.add(parking);

    // Metro station (pyramid)
    const metroGeometry = new THREE.TetrahedronGeometry(0.4);
    const metroMaterial = new THREE.MeshStandardMaterial({
        color: 0x95e1d3,
        metalness: 0.5,
        roughness: 0.5
    });
    const metro = new THREE.Mesh(metroGeometry, metroMaterial);
    metro.position.set(-3, 1, 1);
    landmarks.push(metro);
    scene.add(metro);

    // Park (torus)
    const parkGeometry = new THREE.TorusGeometry(0.3, 0.1, 8, 16);
    const parkMaterial = new THREE.MeshStandardMaterial({
        color: 0x44ff44,
        metalness: 0.3,
        roughness: 0.7
    });
    const park = new THREE.Mesh(parkGeometry, parkMaterial);
    park.position.set(3, 1, -1);
    landmarks.push(park);
    scene.add(park);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD4AF37, 1.5, 20);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.8, 15, Math.PI / 6);
    spotLight.position.set(5, 8, 5);
    spotLight.target = markerGroup;
    scene.add(spotLight);

    // Animation
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Bounce marker
        markerGroup.position.y = Math.sin(time * 2) * 0.2;
        markerGroup.rotation.y += 0.01;

        // Pulse ring
        const scale = 1 + Math.sin(time * 3) * 0.2;
        ring.scale.set(scale, scale, 1);
        ring.material.opacity = 0.3 + Math.sin(time * 3) * 0.2;

        // Float landmarks
        landmarks.forEach((landmark, index) => {
            landmark.position.y = 1 + Math.sin(time * 2 + index) * 0.15;
            landmark.rotation.y += 0.02;
        });

        // Rotate map slightly
        map.rotation.z = Math.sin(time * 0.5) * 0.05;

        // Camera orbit
        camera.position.x = Math.sin(time * 0.3) * 8;
        camera.position.z = Math.cos(time * 0.3) * 8;
        camera.lookAt(0, 0, 0);

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
    };

    window.addEventListener('resize', handleResize);
})();
