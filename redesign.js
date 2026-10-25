import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const canvas = document.querySelector("#fox-canvas");
const hero = document.querySelector(".hero");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
});
document.querySelector("#year").textContent = new Date().getFullYear();

if (canvas && !reduceMotion) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 8);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  scene.add(new THREE.AmbientLight(0xffd7c3, 1.3));
  const keyLight = new THREE.PointLight(0xff5a1f, 85, 18);
  keyLight.position.set(2.5, 2.5, 3.5);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0x8a9bff, 45, 16);
  rimLight.position.set(-4, 1, -1);
  scene.add(rimLight);

  // Procedural metallic "fox sigil" placeholder made from 3D geometry.
  // Swap this group for a licensed/custom fox-head .glb model when available.
  const fox = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({
    color: 0x24201d, metalness: 0.92, roughness: 0.23,
    emissive: 0x2b0900, emissiveIntensity: 0.65, flatShading: true
  });
  const orange = new THREE.MeshStandardMaterial({
    color: 0xff5a1f, emissive: 0xff3b08, emissiveIntensity: 2.2,
    metalness: 0.45, roughness: 0.25
  });
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(1.08, 1), metal);
  head.scale.set(1.0, 1.12, 0.78);
  fox.add(head);
  const earGeo = new THREE.ConeGeometry(0.42, 1.15, 5);
  for (const x of [-0.68, 0.68]) {
    const ear = new THREE.Mesh(earGeo, metal);
    ear.position.set(x, 1.05, 0);
    ear.rotation.z = x < 0 ? 0.22 : -0.22;
    fox.add(ear);
  }
  const muzzle = new THREE.Mesh(new THREE.ConeGeometry(0.47, 1.05, 5), metal);
  muzzle.rotation.x = Math.PI / 2;
  muzzle.rotation.z = Math.PI;
  muzzle.position.set(0, -0.32, 0.75);
  fox.add(muzzle);
  for (const x of [-0.42, 0.42]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.105, 12, 8), orange);
    eye.position.set(x, 0.12, 0.69);
    fox.add(eye);
  }
  fox.position.set(1.65, -0.08, 0);
  fox.rotation.y = -0.2;
  scene.add(fox);

  // Fine orbit rings and floating embers add depth without a heavy model.
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xff5a1f, transparent: true, opacity: 0.45 });
  for (const [radius, tilt] of [[1.9, 0.9], [2.25, -0.48]]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.006, 6, 180), ringMaterial);
    ring.position.copy(fox.position);
    ring.rotation.set(tilt, 0.2, 0.1);
    scene.add(ring);
  }
  const particleCount = 160;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i*3] = (Math.random() - 0.5) * 11;
    positions[i*3+1] = (Math.random() - 0.5) * 6;
    positions[i*3+2] = (Math.random() - 0.5) * 3;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({
    color: 0xff7138, size: 0.025, transparent: true, opacity: 0.7
  }));
  scene.add(particles);

  let pointerX = 0, pointerY = 0;
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5);
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5);
  }, { passive: true });

  function resize() {
    const width = hero.clientWidth, height = hero.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    camera.position.x = width < 650 ? 0.1 : 0;
    camera.position.z = width < 650 ? 9.5 : 8;
  }
  const observer = new ResizeObserver(resize);
  observer.observe(hero);
  resize();

  let frame;
  function animate() {
    frame = requestAnimationFrame(animate);
    fox.rotation.y += (pointerX * 0.28 - fox.rotation.y) * 0.025;
    fox.rotation.x += (-pointerY * 0.16 - fox.rotation.x) * 0.025;
    fox.position.y = -0.08 + Math.sin(performance.now() * 0.0007) * 0.07;
    particles.rotation.y += 0.00025;
    renderer.render(scene, camera);
  }
  animate();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else animate();
  });
}
