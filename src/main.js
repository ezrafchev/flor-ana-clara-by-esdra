import * as THREE from 'three';
import gsap from 'gsap';

const animationContainer = document.getElementById('animationContainer');

let scene, camera, renderer, flowerGroup;

function createPetal() {
  const geometry = new THREE.Shape();

  geometry.moveTo(0, 0);
  geometry.bezierCurveTo(0.2, 0.5, 0.5, 1, 0, 1.5);
  geometry.bezierCurveTo(-0.5, 1, -0.2, 0.5, 0, 0);

  const extrudeSettings = {
    steps: 2,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 1,
  };

  const geometry3d = new THREE.ExtrudeGeometry(geometry, extrudeSettings);
  const material = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.5, metalness: 0.1 });
  const petal = new THREE.Mesh(geometry3d, material);

  return petal;
}

function createFlower() {
  flowerGroup = new THREE.Group();

  const petalCount = 6;
  for (let i = 0; i < petalCount; i++) {
    const petal = createPetal();
    petal.position.y = 0;
    petal.rotation.z = (i * (2 * Math.PI)) / petalCount;
    petal.scale.set(0.1, 0.1, 0.1);
    flowerGroup.add(petal);
  }

  scene.add(flowerGroup);
}

function animateFlower() {
  flowerGroup.children.forEach((petal, index) => {
    gsap.to(petal.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.5,
      delay: index * 0.2,
      ease: 'power2.out',
    });
  });
}

function init() {
  console.log('Initializing flower animation...');
  if (!animationContainer) {
    console.error('Animation container not found!');
    return;
  }
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const width = animationContainer.clientWidth || 800;
  const height = animationContainer.clientHeight || 600;

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  animationContainer.innerHTML = ''; // Clear container
  animationContainer.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  createFlower();
  animateFlower();

  window.addEventListener('resize', onWindowResize, false);

  animate();
}

function onWindowResize() {
  const width = animationContainer.clientWidth || 800;
  const height = animationContainer.clientHeight || 600;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);

  if (flowerGroup) {
    flowerGroup.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  init();
});
