document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const installButton = document.getElementById('install-app-button');
  const installStatus = document.getElementById('install-app-status');
  let deferredInstallPrompt = null;

  if (installButton && installStatus) {
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;

    installButton.hidden = isInstalled;

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      installButton.hidden = false;
    });

    installButton.addEventListener('click', async () => {
      if (!deferredInstallPrompt) {
        installStatus.textContent = 'Open your browser menu and choose “Install app” or “Add to Home Screen”.';
        return;
      }

      try {
        await deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        installStatus.textContent = outcome === 'accepted' ? 'Portfolio app installed.' : 'Installation cancelled.';
        installButton.hidden = outcome === 'accepted';
        deferredInstallPrompt = null;
      } catch (error) {
        console.error('Could not open the portfolio install prompt:', error);
        installStatus.textContent = 'Installation is unavailable right now. Use your browser menu to add this app.';
      }
    });

    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      installButton.hidden = true;
      installStatus.textContent = 'Portfolio app installed.';
    });
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch((error) => {
        console.error('Could not register the portfolio service worker:', error);
      });
    });
  }

  // =========================================================================
  // 1. SECTION & KINETIC 3D HEADLINE REVEALS
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // =========================================================================
  // 2. TOP HAIRLINE READING PROGRESS BAR
  // =========================================================================
  const progressBar = document.querySelector('.scroll-indicator');

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0 || !progressBar) return;
    progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Exit early before initializing 3D loops if reduced motion is requested
  if (prefersReducedMotion) return;

  // =========================================================================
  // 3. TACTILE 3D PERSPECTIVE TILT ON PROJECT PLATES
  // =========================================================================
  const tiltFrames = document.querySelectorAll('[data-3d-tilt]');

  tiltFrames.forEach((frame) => {
    const maxTilt = 6; // Restrained architectural angle in degrees

    frame.addEventListener('mouseenter', () => {
      frame.classList.add('is-tilting');
    });

    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotateX = (-y * maxTilt * 2).toFixed(2);
      const rotateY = (x * maxTilt * 2).toFixed(2);

      frame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    frame.addEventListener('mouseleave', () => {
      frame.classList.remove('is-tilting');
      frame.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

  // =========================================================================
  // 4. ARCHITECTURAL 3D WIREFRAME MONOLITH (HERO CANVAS)
  // =========================================================================
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Outer architectural cube + inner counter-rotating octahedron
  const outerVertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
  ];
  const outerEdges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];

  const innerVertices = [
    [0, -1.15, 0], [0, 1.15, 0],
    [-1.15, 0, 0], [1.15, 0, 0],
    [0, 0, -1.15], [0, 0, 1.15],
  ];
  const innerEdges = [
    [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 4], [4, 3], [3, 5], [5, 2],
  ];

  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  window.addEventListener(
    'mousemove',
    (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    },
    { passive: true }
  );

  const project3D = ([x, y, z], angleX, angleY, scale) => {
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;

    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const y2 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;

    const fov = 4.2;
    const factor = fov / (fov + z2);
    return [
      width / 2 + x1 * scale * factor,
      height / 2 + y2 * scale * factor,
    ];
  };

  let angle = 0;

  const render = () => {
    ctx.clearRect(0, 0, width, height);

    currentMouseX += (targetMouseX - currentMouseX) * 0.05;
    currentMouseY += (targetMouseY - currentMouseY) * 0.05;
    angle += 0.0035;

    const scrollTilt = window.scrollY * 0.0015;
    const scale = Math.min(width, height) * 0.27;

    // Outer Cube (Subtle hairline)
    ctx.strokeStyle = '#C8C8C4';
    ctx.lineWidth = 1;
    ctx.beginPath();
    outerEdges.forEach(([i, j]) => {
      const p1 = project3D(outerVertices[i], angle * 0.6 + currentMouseY + scrollTilt, angle + currentMouseX, scale);
      const p2 = project3D(outerVertices[j], angle * 0.6 + currentMouseY + scrollTilt, angle + currentMouseX, scale);
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
    });
    ctx.stroke();

    // Inner Octahedron (Primary ink hairline)
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 0.85;
    ctx.beginPath();
    innerEdges.forEach(([i, j]) => {
      const p1 = project3D(innerVertices[i], -angle * 0.8 + currentMouseY, -angle * 1.1 + currentMouseX, scale * 0.82);
      const p2 = project3D(innerVertices[j], -angle * 0.8 + currentMouseY, -angle * 1.1 + currentMouseX, scale * 0.82);
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
    });
    ctx.stroke();

    requestAnimationFrame(render);
  };

  render();
});