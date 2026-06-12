// main.js

document.addEventListener("DOMContentLoaded", () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const hoverTargets = document.querySelectorAll('.hover-target');

    document.addEventListener('mousemove', (e) => {
        // Instant cursor move
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0
        });

        // Smooth follower move
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15
        });
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('hover-active');
        });
        target.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('hover-active');
        });
    });

    // Preloader Animation
    const preloaderTimeline = gsap.timeline();

    preloaderTimeline
        .to('.p-char', {
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power4.out"
        })
        .to('.preloader-line', {
            width: "100%",
            duration: 0.8,
            ease: "power4.inOut"
        }, "-=0.4")
        .to('.preloader-text, .preloader-line', {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.5
        })
        .to('.preloader', {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut"
        })
        .from('.animate-hero', {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out"
        }, "-=0.5");

    // Scroll Animations
    
    // Fade Up Elements
    gsap.utils.toArray('.fade-up').forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%", // Animation starts when top of element hits 85% of viewport
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Divider Line Expansion
    gsap.utils.toArray('.divider').forEach(divider => {
        gsap.from(divider, {
            scrollTrigger: {
                trigger: divider,
                start: "top 90%"
            },
            width: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Parallax on Hero Image
    gsap.to('.photo-frame img', {
        scrollTrigger: {
            trigger: '#hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 50,
        ease: "none"
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
