document.addEventListener("DOMContentLoaded", function () {
    const greetingElement = document.querySelector('.greeting-message');
    const currentHour = new Date().getHours(); // Get the current hour
    let greetingText = '';

    // Determine the appropriate greeting based on the time of day
    if (currentHour < 12) {
        greetingText = 'Good Morning!';
    } else if (currentHour < 18) {
        greetingText = 'Good Afternoon!';
    } else {
        greetingText = 'Good Evening!';
    }

    let charIndex = 0;
    let isTyping = true;

    function type() {
        if (isTyping) {
            if (charIndex < greetingText.length) {
                greetingElement.textContent += greetingText[charIndex];
                charIndex++;
                setTimeout(type, 100);
            } else {
                isTyping = false;
                setTimeout(erase, 1500);
            }
        }
    }

    function erase() {
        if (!isTyping) {
            if (charIndex > 0) {
                greetingElement.textContent = greetingText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                isTyping = true;
                setTimeout(type, 500);
            }
        }
    }

    // Start typing the greeting when the page loads
    type();
});


const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';
});

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgress").style.width = scrolled + "%";
});

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

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // trigger on page load

const projects = document.querySelectorAll('.project');
projects.forEach(project => {
    project.addEventListener('mouseover', () => {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = project.getAttribute('data-tooltip');
        project.appendChild(tooltip);
        tooltip.style.display = 'block';
    });

    project.addEventListener('mouseout', () => {
        const tooltip = project.querySelector('.tooltip');
        if (tooltip) tooltip.remove();
    });
});

window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const parallax = document.getElementById('parallax-background');
    parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});

const faders = document.querySelectorAll('.fade-in-on-scroll');
window.addEventListener('scroll', () => {
    faders.forEach(fader => {
        const rect = fader.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            fader.classList.add('active');
        }
    });
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#navbar a');

window.addEventListener('scroll', () => {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('nav-active'));
    navLinks[index].classList.add('nav-active');
});

// Animate content on scroll
const fadeInElements = document.querySelectorAll('.fade-in');
const slideInElements = document.querySelectorAll('.slide-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

fadeInElements.forEach(element => observer.observe(element));
slideInElements.forEach(element => observer.observe(element));

window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    document.getElementById('parallax-background').style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
    document.getElementById('parallax-background-2').style.transform = 'translateY(' + scrollPosition * 0.25 + 'px)';
});