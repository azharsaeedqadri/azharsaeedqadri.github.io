// Using global THREE from CDN
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg-canvas'),
  alpha: true,
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Camera position
camera.position.z = 30;

// Add Objects
window.myMeshes = [];

// Main Abstract Shape
const geometry = new THREE.IcosahedronGeometry(10, 1);
const material = new THREE.MeshPhysicalMaterial({
  color: 0x6366f1, // indigo
  wireframe: true,
  transparent: true,
  opacity: 0.8,
  roughness: 0.1,
  metalness: 0.8
});

const mainMesh = new THREE.Mesh(geometry, material);
scene.add(mainMesh);
window.myMeshes.push(mainMesh);

// Add small floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 100;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.15,
  color: 0xd946ef,
  transparent: true,
  opacity: 0.8,
});
window.myParticlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(window.myParticlesMesh);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  targetX = mouseX * .001;
  targetY = mouseY * .001;

  mainMesh.rotation.y += 0.005;
  mainMesh.rotation.x += 0.002;
  
  // Mouse interactive rotation
  mainMesh.rotation.y += 0.05 * (targetX - mainMesh.rotation.y);
  mainMesh.rotation.x += 0.05 * (targetY - mainMesh.rotation.x);

  window.myParticlesMesh.rotation.y = -elapsedTime * 0.05;

  renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Expose camera to global scope for GSAP
window.myCamera = camera;
