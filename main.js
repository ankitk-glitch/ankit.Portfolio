document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // =========================================
  // CUSTOM CURSOR
  // =========================================
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");
  const hoverTargets = document.querySelectorAll(".hover-target, a, button, input, textarea");

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    // Smooth interpolation for cursor
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    // Slower interpolation for follower
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    gsap.set(cursor, { x: cursorX, y: cursorY });
    gsap.set(follower, { x: followerX, y: followerY });
  });

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      cursor.classList.add("hovering");
      follower.classList.add("hovering");
    });
    target.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovering");
      follower.classList.remove("hovering");
    });
  });

  // =========================================
  // PRELOADER & INITIAL REVEAL
  // =========================================
  const tlPreloader = gsap.timeline();

  tlPreloader
    .to(".p-char", {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    })
    .to(".preloader-line", {
      width: "100%",
      duration: 1,
      ease: "power3.inOut",
    }, "-=0.5")
    .to(".p-char", {
      y: "-100%",
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.in",
    })
    .to(".preloader-line", {
      opacity: 0,
      duration: 0.3,
    }, "-=0.4")
    .to(".preloader", {
      y: "-100%",
      duration: 1,
      ease: "power4.inOut",
    })
    // Hero Animations
    .from("nav", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.5")
    .from(".animate-hero", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    }, "-=0.8");

  // =========================================
  // SCROLL ANIMATIONS (FADE UPs)
  // =========================================
  const fadeUpElements = document.querySelectorAll(".fade-up");

  fadeUpElements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // when the top of the element hits 85% of the viewport
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  // =========================================
  // PARALLAX EFFECTS
  // =========================================
  // Parallax on hero photo
  gsap.to(".hero-photo img", {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // Parallax on gallery images
  gsap.utils.toArray(".gallery-item").forEach(item => {
    const img = item.querySelector("img");
    gsap.to(img, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
});
