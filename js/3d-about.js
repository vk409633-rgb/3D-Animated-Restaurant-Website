// 3D About Section Animation
(function () {
    const container = document.getElementById('about-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    camera.position.z = 8;

    // Create floating ingredients
    const ingredients = [];

    // Tomato (red sphere)
    const tomatoGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const tomatoMaterial = new THREE.MeshStandardMaterial({
        color: 0xff4444,
        metalness: 0.3,
        roughness: 0.7
    });
    const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
    tomato.position.set(-3, 2, 0);
    ingredients.push(tomato);
    scene.add(tomato);

    // Basil leaf (green flat shape)
    const leafGeometry = new THREE.CircleGeometry(0.6, 32);
    const leafMaterial = new THREE.MeshStandardMaterial({
        color: 0x44ff44,
        metalness: 0.2,
        roughness: 0.8,
        side: THREE.DoubleSide
    });
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.set(3, 1, -1);
    ingredients.push(leaf);
    scene.add(leaf);

    // Garlic (white sphere)
    const garlicGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const garlicMaterial = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        metalness: 0.2,
        roughness: 0.6
    });
    const garlic = new THREE.Mesh(garlicGeometry, garlicMaterial);
    garlic.position.set(-2, -2, 1);
    ingredients.push(garlic);
    scene.add(garlic);

    // Olive oil drop (golden sphere)
    const oilGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    const oilMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0xD4AF37,
        emissiveIntensity: 0.3
    });
    const oil = new THREE.Mesh(oilGeometry, oilMaterial);
    oil.position.set(2, -1, 2);
    ingredients.push(oil);
    scene.add(oil);

    // Pepper (dark sphere)
    const pepperGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const pepperMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0.4,
        roughness: 0.6
    });
    const pepper = new THREE.Mesh(pepperGeometry, pepperMaterial);
    pepper.position.set(0, 3, -2);
    ingredients.push(pepper);
    scene.add(pepper);

    // Herb sprig (green cylinder)
    const herbGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
    const herbMaterial = new THREE.MeshStandardMaterial({
        color: 0x228822,
        metalness: 0.3,
        roughness: 0.7
    });
    const herb = new THREE.Mesh(herbGeometry, herbMaterial);
    herb.position.set(-1, 0, 3);
    herb.rotation.z = Math.PI / 4;
    ingredients.push(herb);
    scene.add(herb);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xD4AF37, 1, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Gentle floating animation for each ingredient
        ingredients.forEach((ingredient, index) => {
            ingredient.position.y += Math.sin(time * 2 + index) * 0.002;
            ingredient.rotation.y += 0.005;
            ingredient.rotation.x += 0.003;
        });

        // Rotate entire scene slowly
        scene.rotation.y = Math.sin(time * 0.3) * 0.1;

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

    // Intersection Observer for scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ingredients.forEach((ingredient, index) => {
                    setTimeout(() => {
                        gsap.to(ingredient.scale, {
                            x: 1.2,
                            y: 1.2,
                            z: 1.2,
                            duration: 0.5,
                            yoyo: true,
                            repeat: 1
                        });
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(container);
})();
