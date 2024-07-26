let scene, camera, renderer, raccoon, particles;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('raccoon-container').appendChild(renderer.domElement);

    // Create raccoon
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 5000; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(2000));
        vertices.push(THREE.MathUtils.randFloatSpread(2000));
        vertices.push(THREE.MathUtils.randFloatSpread(2000));
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    raccoon = new THREE.Points(geometry, material);
    scene.add(raccoon);

    // Create particles
    particles = new THREE.Group();
    for (let i = 0; i < 200; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(Math.random() * 2, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        particle.position.set(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
        particles.add(particle);
    }
    scene.add(particles);

    camera.position.z = 1000;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    raccoon.rotation.x += 0.001;
    raccoon.rotation.y += 0.002;

    particles.children.forEach(particle => {
        particle.position.y += Math.sin(Date.now() * 0.001 + particle.position.x) * 0.5;
    });

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    gsap.to(raccoon.rotation, {
        x: mouseY * 0.5,
        y: mouseX * 0.5,
        duration: 1
    });
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('mousemove', onMouseMove);

init();

// Menu functionality
const infoPanel = document.getElementById('info-panel');
const panelContent = document.getElementById('panel-content');

document.getElementById('about').addEventListener('click', () => {
    panelContent.innerHTML = `
        <h2>About RACCOON</h2>
        <p>RACCOON is a cutting-edge digital experience studio, blending art and technology to create immersive worlds.</p>
    `;
    infoPanel.classList.remove('hidden');
});

document.getElementById('projects').addEventListener('click', () => {
    panelContent.innerHTML = `
        <h2>Our Projects</h2>
        <ul>
            <li>Neon Dreams - A VR experience</li>
            <li>Pixel Perfect - AI-powered image enhancement</li>
            <li>Soundscape - Interactive audio installations</li>
        </ul>
    `;
    infoPanel.classList.remove('hidden');
});

document.getElementById('contact').addEventListener('click', () => {
    panelContent.innerHTML = `
        <h2>Contact Us</h2>
        <p>Email: hello@raccoon.studio</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Digital Lane, Cyberspace, CS 12345</p>
    `;
    infoPanel.classList.remove('hidden');
});

document.getElementById('close-panel').addEventListener('click', () => {
    infoPanel.classList.add('hidden');
});

// Text animation
gsap.from('h1', { duration: 2, opacity: 0, y: 50, ease: 'elastic.out(1, 0.3)' });
gsap.from('p', { duration: 1.5, opacity: 0, y: 20, ease: 'back.out(1.7)', delay: 0.5 });
gsap.from('#menu', { duration: 1, opacity: 0, y: 20, ease: 'power2.out', delay: 1 });