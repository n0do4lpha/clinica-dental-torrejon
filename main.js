/* ============================================================
   CLÍNICA DENTAL — Main JavaScript
   Animations, interactions, and utilities
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Header scroll effect ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Mobile navigation ---
    const toggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    if (toggle && navList) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navList.classList.toggle('mobile-open');
            document.body.style.overflow = navList.classList.contains('mobile-open') ? 'hidden' : '';
        });
        navList.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('mobile-open')) {
                    toggle.classList.remove('active');
                    navList.classList.remove('mobile-open');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // --- Scroll animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    if (animatedElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        animatedElements.forEach(el => observer.observe(el));
    }

    // --- Back to top ---
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        });
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-item__q').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // --- Contact form (basic validation) ---
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('[required]');
            let valid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#e74c3c';
                    valid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            if (valid) {
                const btn = form.querySelector('.btn');
                btn.textContent = '¡MENSAJE ENVIADO!';
                btn.style.background = '#25D366';
                btn.style.borderColor = '#25D366';
                setTimeout(() => {
                    btn.textContent = 'ENVIAR MENSAJE';
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    form.reset();
                }, 3000);
            }
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
