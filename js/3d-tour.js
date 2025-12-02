// 3D Virtual Tour
(function () {
    const container = document.getElementById('tour-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Camera positions for different views
    const cameraPositions = {
        dining: { x: 0, y: 2, z: 8, lookAt: { x: 0, y: 0, z: 0 } },
        bar: { x: -6, y: 2, z: 4, lookAt: { x: -3, y: 0, z: 0 } },
        private: { x: 6, y: 2, z: 4, lookAt: { x: 3, y: 0, z: 0 } },
        kitchen: { x: 0, y: 3, z: -6, lookAt: { x: 0, y: 0, z: -3 } }
    };

    camera.position.set(0, 2, 8);

    // Create restaurant environment

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        metalness: 0.3,
        roughness: 0.7
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Dining tables
    const tableGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
    const tableMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        metalness: 0.4,
        roughness: 0.6
    });

    const tablePositions = [
        { x: -3, z: 0 },
        { x: 3, z: 0 },
        { x: -3, z: -4 },
        { x: 3, z: -4 },
        { x: 0, z: 2 }
    ];

    tablePositions.forEach(pos => {
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.set(pos.x, 0.8, pos.z);
        scene.add(table);

        // Add chairs around each table
        const chairGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
        const chairMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.2,
            roughness: 0.8
        });

        const chairPositions = [
            { x: 0.8, z: 0 },
            { x: -0.8, z: 0 },
            { x: 0, z: 0.8 },
            { x: 0, z: -0.8 }
        ];

        chairPositions.forEach(chairPos => {
            const chair = new THREE.Mesh(chairGeometry, chairMaterial);
            chair.position.set(pos.x + chairPos.x, 0.5, pos.z + chairPos.z);
            scene.add(chair);
        });
    });

    // Bar counter
    const barGeometry = new THREE.BoxGeometry(6, 1.2, 1);
    const barMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        metalness: 0.5,
        roughness: 0.5
    });
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.set(-6, 0.6, 0);
    scene.add(bar);

    // Bar stools
    const stoolGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1, 16);
    const stoolMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.7,
        roughness: 0.3
    });

    for (let i = 0; i < 5; i++) {
        const stool = new THREE.Mesh(stoolGeometry, stoolMaterial);
        stool.position.set(-6 + i * 1.2 - 2.4, 0.5, 1.5);
        scene.add(stool);
    }

    // Private dining room (enclosed area)
    const wallGeometry = new THREE.BoxGeometry(4, 3, 0.2);
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a3a3a,
        metalness: 0.2,
        roughness: 0.8
    });

    const privateWall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    privateWall1.position.set(6, 1.5, 2);
    scene.add(privateWall1);

    const privateWall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    privateWall2.position.set(6, 1.5, 6);
    scene.add(privateWall2);

    const privateWall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    privateWall3.rotation.y = Math.PI / 2;
    privateWall3.position.set(8, 1.5, 4);
    scene.add(privateWall3);

    // Private table
    const privateTable = new THREE.Mesh(tableGeometry, tableMaterial);
    privateTable.position.set(6, 0.8, 4);
    scene.add(privateTable);

    // Kitchen area
    const kitchenCounterGeometry = new THREE.BoxGeometry(5, 1, 2);
    const kitchenCounterMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.8,
        roughness: 0.2
    });
    const kitchenCounter = new THREE.Mesh(kitchenCounterGeometry, kitchenCounterMaterial);
    kitchenCounter.position.set(0, 0.5, -6);
    scene.add(kitchenCounter);

    // Ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Spotlights on tables
    tablePositions.forEach(pos => {
        const spotlight = new THREE.SpotLight(0xD4AF37, 0.8, 10, Math.PI / 6, 0.5);
        spotlight.position.set(pos.x, 4, pos.z);
        spotlight.target.position.set(pos.x, 0, pos.z);
        scene.add(spotlight);
        scene.add(spotlight.target);
    });

    // Main lights
    const mainLight1 = new THREE.PointLight(0xffffff, 1, 20);
    mainLight1.position.set(0, 5, 0);
    scene.add(mainLight1);

    const mainLight2 = new THREE.PointLight(0xD4AF37, 0.6, 15);
    mainLight2.position.set(-6, 4, 0);
    scene.add(mainLight2);

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // Handle tour button clicks
    const tourButtons = document.querySelectorAll('.tour-btn');
    tourButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            const targetPos = cameraPositions[view];

            // Remove active class from all buttons
            tourButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Animate camera to new position
            gsap.to(camera.position, {
                x: targetPos.x,
                y: targetPos.y,
                z: targetPos.z,
                duration: 1.5,
                ease: 'power2.inOut',
                onUpdate: () => {
                    camera.lookAt(targetPos.lookAt.x, targetPos.lookAt.y, targetPos.lookAt.z);
                }
            });
        });
    });

    // Set initial active button
    if (tourButtons.length > 0) {
        tourButtons[0].classList.add('active');
    }

    // Handle window resize
    const handleResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Mouse drag to rotate view
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            camera.rotation.y += deltaX * 0.005;
            camera.rotation.x += deltaY * 0.005;

            // Limit vertical rotation
            camera.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, camera.rotation.x));

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });
})();
