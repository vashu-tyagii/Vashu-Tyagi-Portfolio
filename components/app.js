// --- UI Logic: Initialize Icons & Core Framework ---
document.addEventListener('DOMContentLoaded', () => {
    // Create icons after the DOM is ready to prevent GitHub/LinkedIn icon rendering issues.
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// --- Constants (Software Engineer Profile) ---
const PROFILE_NAME = "Vashu Tyagi";
const PROFILE_TITLE = "Software Engineer";
const PROFILE_SUMMARY = "Software Engineer focused on designing, building, and improving reliable applications. Experienced in developing clean, maintainable code, solving complex technical problems, and collaborating across the software development lifecycle. Passionate about creating efficient, user-focused solutions and continuously learning modern technologies.";
const SKILLS = ['JavaScript', 'Python', 'React', 'Node.js', 'HTML', 'CSS', 'SQL', 'Git'];

const PROJECTS = [
    {
        title: 'RFM',
        technologies: ['Python', 'SQL', 'Power BI', 'Excel'],
        desc: 'RFM project focused on building a responsive, efficient, and user-friendly application experience.'
    }
];

// --- UI Logic: Navigation & Scroll Handling ---
const navbar = document.getElementById('navbar');
const navButtons = document.querySelectorAll('.nav-btn');
const sections = ['home', 'about', 'experience', 'projects', 'contact'];

// Handle Scroll for Navbar styling
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('bg-slate-950/80', 'backdrop-blur-xl', 'border-b', 'border-slate-800/50', 'shadow-lg', 'shadow-black/20');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-slate-950/80', 'backdrop-blur-xl', 'border-b', 'border-slate-800/50', 'shadow-lg', 'shadow-black/20');
        navbar.classList.add('bg-transparent');
    }
});

// Smooth Scroll Function
window.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// Intersection Observer for Active Nav State
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navButtons.forEach(btn => {
                if (btn.dataset.target === id) {
                    btn.classList.add('active', 'bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-lg', 'shadow-cyan-500/25', 'scale-105');
                    btn.classList.remove('text-slate-400', 'hover:text-cyan-400', 'hover:bg-slate-800/80', 'hover:scale-110');
                } else {
                    btn.classList.remove('active', 'bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-lg', 'shadow-cyan-500/25', 'scale-105');
                    btn.classList.add('text-slate-400', 'hover:text-cyan-400', 'hover:bg-slate-800/80', 'hover:scale-110');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) navObserver.observe(el);
});

// --- UI Logic: Fade In Sections ---
const fadeElements = document.querySelectorAll('.fade-section');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));