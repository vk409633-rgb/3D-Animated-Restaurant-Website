// Advanced 3D Virtual Tour with Camera Rails and Cinematic Transitions
(function () {
    const container = document.getElementById('tour-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x1a1a1a, 10, 50);

    const camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Camera positions with smooth curves
    const cameraPositions = {
        dining: {
            pos: new THREE.Vector3(0, 2.5, 10),
            lookAt: new THREE.Vector3(0, 1, 0),
            fov: 70
        },
        bar: {
            pos: new THREE.Vector3(-8, 2.5, 5),
            lookAt: new THREE.Vector3(-6, 1.5, 0),
            fov: 65
        },
        private: {
            pos: new THREE.Vector3(8, 2.5, 6),
            lookAt: new THREE.Vector3(6, 1.5, 4),
            fov: 60
        },
        kitchen: {
            pos: new THREE.Vector3(0, 3.5, -8),
            lookAt: new THREE.Vector3(0, 1, -4),
            fov: 75
        }
    };

    camera.position.copy(cameraPositions.dining.pos);
    camera.fov = cameraPositions.dining.fov;
    camera.updateProjectionMatrix();

    // Create detailed restaurant environment

    // Floor with reflection
    const floorGeometry = new THREE.PlaneGeometry(40, 40);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,
        metalness: 0.4,
        roughness: 0.6
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(40, 40);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.2,
        roughness: 0.8
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);

    // Dining tables with detailed geometry
    const tableGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
    const tableMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        metalness: 0.5,
        roughness: 0.4
    });

    const tablePositions = [
        { x: -4, z: 0 },
        { x: 4, z: 0 },
        { x: -4, z: -5 },
        { x: 4, z: -5 },
        { x: 0, z: 3 }
    ];

    const tables = [];
    tablePositions.forEach(pos => {
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.set(pos.x, 0.9, pos.z);
        table.castShadow = true;
        table.receiveShadow = true;
        tables.push(table);
        scene.add(table);

        // Table legs
        const legGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.9, 16);
        const legMaterial = new THREE.MeshStandardMaterial({
            color: 0x654321,
            metalness: 0.3,
            roughness: 0.7
        });

        const legPositions = [
            { x: 0.6, z: 0.6 },
            { x: -0.6, z: 0.6 },
            { x: 0.6, z: -0.6 },
            { x: -0.6, z: -0.6 }
        ];

        legPositions.forEach(legPos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos.x + legPos.x, 0.45, pos.z + legPos.z);
            leg.castShadow = true;
            scene.add(leg);
        });

        // Chairs around each table
        const chairGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
        const chairMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.2,
            roughness: 0.8
        });

        const chairPositions = [
            { x: 1.3, z: 0, rot: 0 },
            { x: -1.3, z: 0, rot: Math.PI },
            { x: 0, z: 1.3, rot: -Math.PI / 2 },
            { x: 0, z: -1.3, rot: Math.PI / 2 }
        ];

        chairPositions.forEach(chairPos => {
            const chair = new THREE.Mesh(chairGeometry, chairMaterial);
            chair.position.set(pos.x + chairPos.x, 0.5, pos.z + chairPos.z);
            chair.rotation.y = chairPos.rot;
            chair.castShadow = true;
            scene.add(chair);

            // Chair back
            const backGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.1);
            const back = new THREE.Mesh(backGeometry, chairMaterial);
            back.position.set(pos.x + chairPos.x, 1.0, pos.z + chairPos.z);
            back.rotation.y = chairPos.rot;
            scene.add(back);
        });
    });

    // Bar counter with modern design
    const barGeometry = new THREE.BoxGeometry(8, 1.3, 1.2);
    const barMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        metalness: 0.6,
        roughness: 0.3
    });
    const bar = new THREE.Mesh(barGeometry, barMaterial);
    bar.position.set(-8, 0.65, 0);
    bar.castShadow = true;
    bar.receiveShadow = true;
    scene.add(bar);

    // Bar stools
    const stoolGeometry = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 24);
    const stoolMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.8,
        roughness: 0.2
    });

    for (let i = 0; i < 6; i++) {
        const stool = new THREE.Mesh(stoolGeometry, stoolMaterial);
        stool.position.set(-8 + i * 1.3 - 3.25, 0.6, 1.8);
        stool.castShadow = true;
        scene.add(stool);
    }

    // Private dining room walls
    const wallGeometry = new THREE.BoxGeometry(5, 3.5, 0.3);
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a3a3a,
        metalness: 0.1,
        roughness: 0.9
    });

    const privateWall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    privateWall1.position.set(8, 1.75, 2);
    privateWall1.castShadow = true;
    scene.add(privateWall1);

    const privateWall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    privateWall2.position.set(8, 1.75, 7);
    scene.add(privateWall2);

    const privateWall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    privateWall3.rotation.y = Math.PI / 2;
    privateWall3.position.set(10.5, 1.75, 4.5);
    scene.add(privateWall3);

    // Private table
    const privateTable = new THREE.Mesh(tableGeometry, tableMaterial);
    privateTable.position.set(8, 0.9, 4.5);
    privateTable.castShadow = true;
    scene.add(privateTable);

    // Kitchen area
    const kitchenCounterGeometry = new THREE.BoxGeometry(6, 1.2, 2.5);
    const kitchenCounterMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.9,
        roughness: 0.1
    });
    const kitchenCounter = new THREE.Mesh(kitchenCounterGeometry, kitchenCounterMaterial);
    kitchenCounter.position.set(0, 0.6, -7);
    kitchenCounter.castShadow = true;
    scene.add(kitchenCounter);

    // Cinematic lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Spotlights on tables
    const spotlights = [];
    tablePositions.forEach(pos => {
        const spotlight = new THREE.SpotLight(0xffd700, 1.2, 15, Math.PI / 6, 0.3, 1);
        spotlight.position.set(pos.x, 3.8, pos.z);
        spotlight.target.position.set(pos.x, 0, pos.z);
        spotlight.castShadow = true;
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;
        spotlights.push(spotlight);
        scene.add(spotlight);
        scene.add(spotlight.target);
    });

    // Main ambient lights
    const mainLight1 = new THREE.PointLight(0xffffff, 0.8, 25);
    mainLight1.position.set(0, 3.5, 0);
    mainLight1.castShadow = true;
    scene.add(mainLight1);

    const mainLight2 = new THREE.PointLight(0xD4AF37, 0.6, 20);
    mainLight2.position.set(-8, 3, 0);
    scene.add(mainLight2);

    const kitchenLight = new THREE.PointLight(0xffffff, 1.0, 18);
    kitchenLight.position.set(0, 3, -7);
    scene.add(kitchenLight);

    // Handle tour button clicks with smooth camera transitions
    const tourButtons = document.querySelectorAll('.tour-btn');
    let currentView = 'dining';

    tourButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            if (view === currentView) return;

            currentView = view;
            const targetPos = cameraPositions[view];

            // Remove active class from all buttons
            tourButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Smooth camera transition with curve
            gsap.to(camera.position, {
                x: targetPos.pos.x,
                y: targetPos.pos.y,
                z: targetPos.pos.z,
                duration: 2.0,
                ease: 'power2.inOut'
            });

            gsap.to(camera, {
                fov: targetPos.fov,
                duration: 2.0,
                ease: 'power2.inOut',
                onUpdate: () => {
                    camera.updateProjectionMatrix();
                }
            });

            // Animate lookAt
            const tempTarget = { x: 0, y: 0, z: 0 };
            gsap.to(tempTarget, {
                x: targetPos.lookAt.x,
                y: targetPos.lookAt.y,
                z: targetPos.lookAt.z,
                duration: 2.0,
                ease: 'power2.inOut',
                onUpdate: () => {
                    camera.lookAt(tempTarget.x, tempTarget.y, tempTarget.z);
                }
            });
        });
    });

    // Set initial active button
    if (tourButtons.length > 0) {
        tourButtons[0].classList.add('active');
    }

    // Mouse drag to rotate view
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraRotation = { x: 0, y: 0 };

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            cameraRotation.y += deltaX * 0.003;
            cameraRotation.x += deltaY * 0.003;

            // Limit vertical rotation
            cameraRotation.x = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, cameraRotation.x));

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Subtle spotlight animation
        spotlights.forEach((light, index) => {
            light.intensity = 1.2 + Math.sin(time + index) * 0.2;
        });

        // Apply camera rotation from mouse drag
        if (!isDragging) {
            const currentLookAt = cameraPositions[currentView].lookAt;
            const rotatedLookAt = new THREE.Vector3(
                currentLookAt.x + Math.sin(cameraRotation.y) * 2,
                currentLookAt.y + cameraRotation.x * 2,
                currentLookAt.z + Math.cos(cameraRotation.y) * 2
            );
            camera.lookAt(rotatedLookAt);
        }

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
