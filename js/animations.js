import gsap from 'https://esm.sh/gsap@3.12.5';
import ScrollTrigger from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';
import { meshes, particlesMesh, camera } from './three-scene.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initial Load Animations
  const tl = gsap.timeline();
  
  tl.from(".navbar", { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
    .from(".gsap-reveal", { 
      y: 50, 
      opacity: 0, 
      duration: 1, 
      stagger: 0.2, 
      ease: "power3.out" 
    }, "-=0.5");

  // 2. Scroll Animations for DOM Elements
  gsap.utils.toArray('.gsap-fade-up').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  gsap.utils.toArray('.gsap-fade-right').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  gsap.utils.toArray('.gsap-fade-left').forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  gsap.utils.toArray('.gsap-stagger-card').forEach((element, i) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: "power3.out"
    });
  });

  // Animate skill bars on scroll
  gsap.utils.toArray('.progress-bar-fill').forEach(bar => {
    gsap.to(bar, {
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%",
      },
      scaleX: 1,
      duration: 1.5,
      ease: "power3.out"
    });
  });

  // 3. Scroll Animations for Three.js Scene
  // Rotate the main mesh and move camera slightly based on scroll position
  
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      // self.progress is between 0 and 1
      if(meshes[0]) {
        gsap.to(meshes[0].rotation, {
          z: self.progress * Math.PI * 2,
          overwrite: "auto",
          duration: 0.5
        });
      }
      
      // Move camera slightly
      gsap.to(camera.position, {
        y: -self.progress * 20,
        z: 30 + (self.progress * 10),
        overwrite: "auto",
        duration: 0.5
      });
      
      // Move particles
      if(particlesMesh) {
         gsap.to(particlesMesh.position, {
           y: self.progress * 10,
           overwrite: "auto",
           duration: 0.5
         });
      }
    }
  });

  // Handle Theme Change on Three.js (Optional but cool)
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    
    // Change mesh color based on theme
    if(meshes[0]) {
      gsap.to(meshes[0].material.color, {
        r: isLight ? 0.31 : 0.38, // approx #4f46e5 vs #6366f1
        g: isLight ? 0.27 : 0.40,
        b: isLight ? 0.90 : 0.94,
        duration: 1
      });
    }
  });
});
