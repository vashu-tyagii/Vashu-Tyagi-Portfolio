// --- UI Logic: Initialize Icons & Core Framework ---
document.addEventListener('DOMContentLoaded', () => {
    // Create icons after the DOM is ready to prevent GitHub/LinkedIn icon rendering issues.
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// --- Constants (Software Engineer Profile) ---
// Keep these in sync with the resume. List only things you can show proof for.
const PROFILE_NAME = "Vashu Tyagi";
const PROFILE_TITLE = "Software Engineer (Python & SQL)";
const PROFILE_SUMMARY = "Python and SQL developer who builds database-backed applications and data pipelines. Built a Streamlit and MySQL expense tracker with SQLAlchemy. At Palin Analytics, Python scripts cut manual data preparation time by 40% and MySQL query tuning cut reporting runtimes by 30%.";

// AFTER THE BACKEND PROJECT IS LIVE: add 'FastAPI', 'REST APIs', 'pytest' (and Redis/Docker only if used) here.
const SKILLS = ['Python', 'SQL', 'MySQL', 'SQLAlchemy', 'Pandas', 'NumPy', 'Git', 'Linux'];

const PROJECTS = [
    {
        title: 'Daily Expense Tracker',
        technologies: ['Python', 'Streamlit', 'MySQL', 'SQLAlchemy', 'Pandas'],
        desc: 'Streamlit data-entry app that stores expenses in MySQL through SQLAlchemy and shows live Total, Cash and UPI metrics.'
    }
    // AFTER THE BACKEND PROJECT IS LIVE: add it here (title, technologies, desc with a real result).
];

// --- UI Logic: Navigation & Scroll Handling ---
const navbar = document.getElementById('navbar');
const navButtons = document.querySelectorAll('.nav-btn');
const sections = ['home', 'about', 'experience', 'projects', 'contact'];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const SCROLLED_CLASSES = ['bg-slate-950/80', 'backdrop-blur-xl', 'border-b', 'border-slate-800/50', 'shadow-lg', 'shadow-black/20'];
const ACTIVE_CLASSES = ['active', 'bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-lg', 'shadow-cyan-500/25', 'scale-105'];
const IDLE_CLASSES = ['text-slate-400', 'hover:text-cyan-400', 'hover:bg-slate-800/80', 'hover:scale-110'];

// Navbar styling on scroll (also runs once on load, so a reload mid-page looks right)
function updateNavbarStyle() {
    if (!navbar) return;
    if (window.scrollY > 20) {
        navbar.classList.add(...SCROLLED_CLASSES);
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove(...SCROLLED_CLASSES);
        navbar.classList.add('bg-transparent');
    }
}
window.addEventListener('scroll', updateNavbarStyle, { passive: true });
updateNavbarStyle();

// Smooth Scroll Function (respects "reduce motion" setting)
window.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
};

// Active Nav State
function setActiveNav(id) {
    navButtons.forEach(btn => {
        const isActive = btn.dataset.target === id;
        if (isActive) {
            btn.classList.add(...ACTIVE_CLASSES);
            btn.classList.remove(...IDLE_CLASSES);
            btn.setAttribute('aria-current', 'true');
        } else {
            btn.classList.remove(...ACTIVE_CLASSES);
            btn.classList.add(...IDLE_CLASSES);
            btn.removeAttribute('aria-current');
        }
    });
}

// A section becomes "active" when it crosses a thin band near the middle of the screen.
// (A 30% visibility threshold can never fire for a section taller than ~3x the screen, e.g. on phones.)
if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) navObserver.observe(el);
    });
}

// --- UI Logic: Fade In Sections ---
const fadeElements = document.querySelectorAll('.fade-section');
if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
} else {
    // Old browsers: never leave content hidden
    fadeElements.forEach(el => el.classList.add('visible'));
}