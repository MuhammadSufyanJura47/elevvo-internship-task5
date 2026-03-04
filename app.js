import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

/* ---------------------------
   Theme toggle (persisted)
---------------------------- */
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  const icon = themeToggle?.querySelector("i");
  if (icon) icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
}

const saved = localStorage.getItem("theme");
if (saved === "light" || saved === "dark") {
  setTheme(saved);
} else {
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  setTheme(prefersDark ? "dark" : "light");
}

themeToggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

/* ---------------------------
   Reveal on scroll
---------------------------- */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("in")),
  { threshold: 0.12 }
);
revealEls.forEach(el => io.observe(el));

/* ---------------------------
   Scroll accent bar
---------------------------- */
const accent = document.querySelector(".scroll-accent");
function onScroll() {
  if (!accent) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  accent.style.width = `${pct}%`;
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------------------------
   CTA interaction
---------------------------- */
document.getElementById("ctaButton")?.addEventListener("click", () => {
  const email = /** @type {HTMLInputElement|null} */ (document.getElementById("email"));
  const v = email?.value?.trim();
  if (!v) {
    email?.focus();
    email?.classList.add("is-invalid");
    setTimeout(() => email?.classList.remove("is-invalid"), 900);
    return;
  }
  alert("Demo: fictional account created for " + v);
});

/* ---------------------------
   Demo workflow micro-interaction
---------------------------- */
const demoToast = document.getElementById("demoToast");
const demoBtn = document.getElementById("demoRun");

demoBtn?.addEventListener("click", async () => {
  const steps = [
    "Listening for Slack trigger…",
    "AI summarizing message…",
    "Creating ticket & notifying team…",
    "Done. Workflow completed successfully."
  ];

  demoBtn.disabled = true;
  for (const s of steps) {
    if (demoToast) demoToast.textContent = s;
    await new Promise(r => setTimeout(r, 650));
  }
  setTimeout(() => { if (demoToast) demoToast.textContent = ""; }, 1400);
  demoBtn.disabled = false;
});

/* ---------------------------
   Footer year
---------------------------- */
document.getElementById("year").textContent = String(new Date().getFullYear());

/* ---------------------------
   Three.js hero background
   Animated particle-wave
---------------------------- */
const canvas = document.getElementById("heroCanvas");
const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
camera.position.set(0, 0.8, 6.2);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

const group = new THREE.Group();
scene.add(group);

const GRID_X = 76;
const GRID_Y = 34;
const sep = 0.085;

const positions = new Float32Array(GRID_X * GRID_Y * 3);
let i = 0;
for (let y = 0; y < GRID_Y; y++) {
  for (let x = 0; x < GRID_X; x++) {
    const px = (x - GRID_X / 2) * sep;
    const py = (y - GRID_Y / 2) * sep * 0.95;
    positions[i++] = px;
    positions[i++] = py;
    positions[i++] = 0;
  }
}

const geom = new THREE.BufferGeometry();
geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.022,
  transparent: true,
  opacity: 0.85,
  depthWrite: false,
  color: 0x22d3ee
});

const points = new THREE.Points(geom, material);
group.add(points);

function syncThemeToThree() {
  const theme = root.getAttribute("data-theme");
  if (theme === "light") {
    material.color.setHex(0x4f46e5);
    material.opacity = 0.55;
  } else {
    material.color.setHex(0x22d3ee);
    material.opacity = 0.86;
  }
}
syncThemeToThree();

new MutationObserver(syncThemeToThree).observe(root, {
  attributes: true,
  attributeFilter: ["data-theme"]
});

function resize() {
  const w = canvas.clientWidth || window.innerWidth;
  const h = canvas.clientHeight || Math.max(360, Math.floor(window.innerHeight * 0.72));
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize, { passive: true });
resize();

let t = 0;
function animate() {
  if (!reducedMotion) t += 0.012;

  const pos = geom.attributes.position.array;
  let k = 0;
  for (let y = 0; y < GRID_Y; y++) {
    for (let x = 0; x < GRID_X; x++) {
      const idx = k * 3;
      const px = pos[idx];
      const py = pos[idx + 1];
      const wave =
        Math.sin(px * 2.0 + t) * 0.11 +
        Math.cos(py * 2.4 + t * 1.15) * 0.09 +
        Math.sin((px + py) * 1.9 + t * 0.75) * 0.07;
      pos[idx + 2] = wave;
      k++;
    }
  }
  geom.attributes.position.needsUpdate = true;

  group.rotation.x = -0.35;
  group.rotation.y = Math.sin(t * 0.25) * 0.09;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();