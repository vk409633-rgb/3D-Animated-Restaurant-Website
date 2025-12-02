// 3D Hero Animation with Three.js
(function () {
    const container = document.getElementById('hero-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Camera position
    camera.position.z = 5;

    // Create particles for background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xD4AF37,
        transparent: true,
        opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create rotating 3D dish/plate
    const plateGeometry = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
    const plateMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0xD4AF37,
        emissiveIntensity: 0.2
    });
    const plate = new THREE.Mesh(plateGeometry, plateMaterial);
    scene.add(plate);

    // Create floating food elements (spheres representing ingredients)
    const foodElements = [];
    const foodGeometry = new THREE.SphereGeometry(0.15, 32, 32);

    for (let i = 0; i < 8; i++) {
        const foodMaterial = new THREE.MeshStandardMaterial({
            color: i % 2 === 0 ? 0xD4AF37 : 0xB8941F,
            metalness: 0.5,
            roughness: 0.3,
            emissive: i % 2 === 0 ? 0xD4AF37 : 0xB8941F,
            emissiveIntensity: 0.3
        });

        const food = new THREE.Mesh(foodGeometry, foodMaterial);
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2;
        food.position.x = Math.cos(angle) * radius;
        food.position.y = Math.sin(angle) * radius;
        food.position.z = (Math.random() - 0.5) * 2;

        foodElements.push(food);
        scene.add(food);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xD4AF37, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xB8941F, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Rotate particles
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Rotate plate
        plate.rotation.z += 0.01;
        plate.rotation.y = mouseX * 0.5;
        plate.rotation.x = mouseY * 0.3;

        // Animate food elements
        foodElements.forEach((food, index) => {
            const angle = (index / foodElements.length) * Math.PI * 2 + time;
            const radius = 2;
            food.position.x = Math.cos(angle) * radius;
            food.position.y = Math.sin(angle) * radius;
            food.position.z = Math.sin(time * 2 + index) * 0.5;
            food.rotation.x += 0.02;
            food.rotation.y += 0.02;
        });

        // Camera subtle movement based on mouse
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();
