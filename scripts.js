document.addEventListener("DOMContentLoaded", function () {
    initGreeting();
    initDarkMode();
    initScrollProgress();
    initRevealOnScroll();
    initParallaxEffect();
    initNavLinks();
    initIntersectionObserver();
});

function initGreeting() {
    const greetingElement = document.querySelector('.greeting-message');
    const currentHour = new Date().getHours();
    let greetingText = '';

    if (currentHour < 12) {
        greetingText = 'Good Morning!';
    } else if (currentHour < 18) {
        greetingText = 'Good Afternoon!';
    } else {
        greetingText = 'Good Evening!';
    }

    let charIndex = 0;
    let isTyping = true;
    const typingDelay = 100;
    const erasingDelay = 50;

    function type() {
        if (isTyping) {
            if (charIndex < greetingText.length) {
                greetingElement.textContent += greetingText[charIndex++];
                setTimeout(type, typingDelay);
            } else {
                isTyping = false;
                setTimeout(erase, 1500);
            }
        }
    }

    function erase() {
        if (!isTyping) {
            if (charIndex > 0) {
                greetingElement.textContent = greetingText.substring(0, --charIndex);
                setTimeout(erase, erasingDelay);
            } else {
                isTyping = true;
                setTimeout(type, 500);
            }
        }
    }

    type();
}

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeToggle.textContent = isDarkMode ? '🌞' : '🌙';
        localStorage.setItem('darkMode', isDarkMode);
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '🌞';
    }
}

function initScrollProgress() {
    const scrollProgress = document.getElementById("scrollProgress");

    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = (winScroll / height) * 100 + "%";
    }
    window.addEventListener('scroll', debounce(updateScrollProgress, 50));
}

function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.fade-in, .slide-in');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('scroll-visible');
            } else {
                el.classList.remove('scroll-visible');
            }
        });
    }
    window.addEventListener('scroll', debounce(revealOnScroll, 50));
    revealOnScroll();
}

function initParallaxEffect() {
    const parallaxBackground = document.getElementById('parallax-background');
    const parallaxBackground2 = document.getElementById('parallax-background-2');

    function onScroll() {
        const scrollPosition = window.pageYOffset;
        parallaxBackground.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        parallaxBackground2.style.transform = 'translateY(' + scrollPosition * 0.25 + 'px)';
    }
    window.addEventListener('scroll', throttle(onScroll, 50));
}

function initNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar a');

    function updateNavLinks() {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
        navLinks.forEach(link => link.classList.remove('nav-active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('nav-active');
        }
    }
    window.addEventListener('scroll', debounce(updateNavLinks, 50));
}

function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-in').forEach(element => observer.observe(element));
}

// Utility Functions
function throttle(fn, wait) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn(...args);
        }
    }
}

function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    }
}

function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        shape.classList.add('floating-shape');
        shape.style.top = `${Math.random() * 100}vh`;
        shape.style.left = `${Math.random() * 100}vw`;
        shape.style.width = `${Math.random() * 30 + 10}px`;
        shape.style.height = shape.style.width;
        shape.style.animationDuration = `${Math.random() * 5 + 5}s`;
        container.appendChild(shape);
    }
}

function initFloatingElements() {
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach(shape => {
      shape.addEventListener('mouseover', () => {
        shape.style.transform = 'scale(1.2) rotate(45deg)';
      });
      shape.addEventListener('mouseout', () => {
        shape.style.transform = 'scale(1) rotate(0deg)';
      });
    });
  }


document.addEventListener("DOMContentLoaded", createFloatingElements);
