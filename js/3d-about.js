// Advanced 3D About Section with Ingredient Breakdown Animation
(function () {
    const container = document.getElementById('about-canvas');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    camera.position.set(0, 0, 12);

    // Create detailed 3D ingredients with PBR materials
    const ingredients = [];

    // Tomato (detailed sphere with bump)
    const tomatoGeometry = new THREE.SphereGeometry(0.6, 64, 64);
    const tomatoMaterial = new THREE.MeshStandardMaterial({
        color: 0xff4444,
        metalness: 0.1,
        roughness: 0.8,
        emissive: 0xff2222,
        emissiveIntensity: 0.1
    });
    const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
    tomato.position.set(-4, 3, 0);
    tomato.castShadow = true;
    tomato.userData = { originalPos: tomato.position.clone(), floatSpeed: 1.2, rotSpeed: 0.01 };
    ingredients.push(tomato);
    scene.add(tomato);

    // Basil leaves (multiple flat shapes)
    const leafGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
        const leafGeometry = new THREE.CircleGeometry(0.4, 32);
        const leafMaterial = new THREE.MeshStandardMaterial({
            color: 0x228822,
            metalness: 0.1,
            roughness: 0.9,
            side: THREE.DoubleSide
        });
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(Math.random() * 0.3, Math.random() * 0.3, Math.random() * 0.1);
        leaf.rotation.z = Math.random() * Math.PI;
        leafGroup.add(leaf);
    }
    leafGroup.position.set(4, 2, -1);
    leafGroup.castShadow = true;
    leafGroup.userData = { originalPos: leafGroup.position.clone(), floatSpeed: 0.9, rotSpeed: 0.015 };
    ingredients.push(leafGroup);
    scene.add(leafGroup);

    // Garlic bulb (cluster of spheres)
    const garlicGroup = new THREE.Group();
    const garlicMaterial = new THREE.MeshStandardMaterial({
        color: 0xf5f5dc,
        metalness: 0.1,
        roughness: 0.7
    });
    for (let i = 0; i < 6; i++) {
        const clove = new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 32), garlicMaterial);
        const angle = (i / 6) * Math.PI * 2;
        clove.position.set(Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0);
        garlicGroup.add(clove);
    }
    garlicGroup.position.set(-3, -2, 1);
    garlicGroup.castShadow = true;
    garlicGroup.userData = { originalPos: garlicGroup.position.clone(), floatSpeed: 1.5, rotSpeed: 0.02 };
    ingredients.push(garlicGroup);
    scene.add(garlicGroup);

    // Olive oil drop (glossy sphere)
    const oilGeometry = new THREE.SphereGeometry(0.5, 64, 64);
    const oilMaterial = new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.9,
        roughness: 0.05,
        emissive: 0xD4AF37,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.9
    });
    const oil = new THREE.Mesh(oilGeometry, oilMaterial);
    oil.position.set(3, -1, 2);
    oil.castShadow = true;
    oil.userData = { originalPos: oil.position.clone(), floatSpeed: 0.8, rotSpeed: 0.025 };
    ingredients.push(oil);
    scene.add(oil);

    // Pepper corns (small dark spheres)
    const pepperGroup = new THREE.Group();
    const pepperMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.3,
        roughness: 0.6
    });
    for (let i = 0; i < 8; i++) {
        const peppercorn = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), pepperMaterial);
        peppercorn.position.set(
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 0.6
        );
        pepperGroup.add(peppercorn);
    }
    pepperGroup.position.set(0, 4, -2);
    pepperGroup.castShadow = true;
    pepperGroup.userData = { originalPos: pepperGroup.position.clone(), floatSpeed: 1.8, rotSpeed: 0.03 };
    ingredients.push(pepperGroup);
    scene.add(pepperGroup);

    // Herb sprigs (cylinders with leaves)
    const herbGroup = new THREE.Group();
    const stemGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 8);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x2d5016, metalness: 0.1, roughness: 0.8 });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    herbGroup.add(stem);

    for (let i = 0; i < 6; i++) {
        const smallLeaf = new THREE.Mesh(
            new THREE.CircleGeometry(0.15, 16),
            new THREE.MeshStandardMaterial({ color: 0x44aa44, side: THREE.DoubleSide })
        );
        smallLeaf.position.y = -0.3 + i * 0.15;
        smallLeaf.rotation.y = Math.random() * Math.PI;
        herbGroup.add(smallLeaf);
    }
    herbGroup.position.set(-1, 0, 3);
    herbGroup.rotation.z = Math.PI / 6;
    herbGroup.castShadow = true;
    herbGroup.userData = { originalPos: herbGroup.position.clone(), floatSpeed: 1.1, rotSpeed: 0.012 };
    ingredients.push(herbGroup);
    scene.add(herbGroup);

    // Cinematic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(8, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8899ff, 0.4);
    fillLight.position.set(-6, 3, -4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xD4AF37, 1.2, 30);
    rimLight.position.set(0, 5, -8);
    scene.add(rimLight);

    // Scroll-driven animation state
    let scrollProgress = 0;
    let isExploded = false;

    // Intersection Observer for scroll animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger ingredient breakdown animation
                ingredients.forEach((ingredient, index) => {
                    setTimeout(() => {
                        gsap.to(ingredient.scale, {
                            x: 1.3,
                            y: 1.3,
                            z: 1.3,
                            duration: 0.6,
                            yoyo: true,
                            repeat: 1,
                            ease: 'elastic.out(1, 0.5)'
                        });
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(container);

    // Track scroll for explosion effect
    window.addEventListener('scroll', () => {
        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.top < viewportHeight && rect.bottom > 0) {
            scrollProgress = 1 - (rect.top / viewportHeight);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress));

            if (scrollProgress > 0.7 && !isExploded) {
                isExploded = true;
                explodeIngredients();
            } else if (scrollProgress < 0.5 && isExploded) {
                isExploded = false;
                resetIngredients();
            }
        }
    });

    function explodeIngredients() {
        ingredients.forEach((ingredient, index) => {
            const direction = ingredient.userData.originalPos.clone().normalize();
            gsap.to(ingredient.position, {
                x: ingredient.userData.originalPos.x + direction.x * 3,
                y: ingredient.userData.originalPos.y + direction.y * 3,
                z: ingredient.userData.originalPos.z + direction.z * 3,
                duration: 1.2,
                ease: 'power2.out'
            });
        });
    }

    function resetIngredients() {
        ingredients.forEach((ingredient) => {
            gsap.to(ingredient.position, {
                x: ingredient.userData.originalPos.x,
                y: ingredient.userData.originalPos.y,
                z: ingredient.userData.originalPos.z,
                duration: 1.0,
                ease: 'power2.inOut'
            });
        });
    }

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Gentle floating animation for each ingredient
        ingredients.forEach((ingredient, index) => {
            const floatOffset = Math.sin(time * ingredient.userData.floatSpeed + index) * 0.15;
            ingredient.position.y = ingredient.userData.originalPos.y + floatOffset;

            ingredient.rotation.y += ingredient.userData.rotSpeed;
            ingredient.rotation.x += ingredient.userData.rotSpeed * 0.5;
        });

        // Rotate entire scene slowly
        scene.rotation.y = Math.sin(time * 0.2) * 0.15;

        // Dynamic lighting
        rimLight.intensity = 1.2 + Math.sin(time * 1.5) * 0.3;

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
