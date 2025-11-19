/* ============================
   Helper / DOM Ready
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link update
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Actualizar nav activo
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    /* --------- HERO ENTRY ANIMATION --------- */
    const heroContent = document.querySelector('.hero-content');
    const profilePic = document.querySelector('.profile-pic');

    setTimeout(() => {
        if (heroContent) heroContent.classList.add('in-view');
        if (profilePic) profilePic.classList.add('in-view');
    }, 250);

    /* --------- SMOOTH SCROLL FOR INTERNAL LINKS --------- */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            // allow normal if link is '#'
            const target = a.getAttribute('href');
            if (target === '#') return;
            e.preventDefault();
            const el = document.querySelector(target);
            if (!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 10;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* --------- SKILL BARS (IntersectionObserver) --------- */
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || bar.style.width || '0';
                // set final width (adds % if numeric)
                if (/^\d+$/.test(width)) bar.style.width = width + '%';
                else bar.style.width = width;
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.45 });

    skillBars.forEach(b => skillObserver.observe(b));

    /* --------- SCROLL REVEAL FOR SECTIONS & CARDS --------- */
    const revealItems = document.querySelectorAll('.reveal, .card-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // if card, add small delay to cascade
                if (entry.target.classList.contains('card-reveal')) {
                    entry.target.style.transitionDelay = '80ms';
                }
            }
        });
    }, { threshold: 0.18 });

    revealItems.forEach(i => revealObserver.observe(i));

    /* --------- PROJECT NOTIFY BTN (demo) --------- */
    document.querySelectorAll('.notify-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const proj = btn.dataset.project || 'Proyecto';
            btn.classList.add('active');
            btn.setAttribute('disabled', 'true');
            // small visual feedback
            btn.innerHTML = '<i class="fa-regular fa-bell-slash"></i>';
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-regular fa-bell"></i>';
                btn.removeAttribute('disabled');
                btn.classList.remove('active');
                alert(`Te avisaré cuando "${proj}" esté disponible — esto es una demo.`);
            }, 700);
        });
    });

    /* --------- COPY EMAIL BUTTON --------- */
    const copyBtn = document.getElementById('copyEmail');
    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const email = 'fedeferessin2001@gmail.com';
            try {
                await navigator.clipboard.writeText(email);
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado';
                setTimeout(() => copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span class="d-none d-sm-inline">Copiar email</span>', 1400);
            } catch (err) {
                alert('No se pudo copiar el email.');
            }
        });
    }

    /* --------- CONTACT FORM (demo toast) --------- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // small visual confirmation (demo, no server)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const original = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = original;
                submitBtn.disabled = false;
                // show native alert or nicer toast (here demo)
                alert('Mensaje enviado (demo). Gracias — lo recibirás en tu email real cuando añadas backend.');
                contactForm.reset();
            }, 1000);
        });
    }

    /* --------- SCROLL TOP BUTTON --------- */
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    scrollBtn.style.display = 'none';
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) scrollBtn.style.display = 'flex';
        else scrollBtn.style.display = 'none';
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* --------- ACCESSIBILITY: focus styles for project cards --------- */
    document.querySelectorAll('.project-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('focus', () => card.classList.add('in-view'));
    });

}); // DOMContentLoaded end

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link update
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Actualizar nav activo
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// ========== PROGRESS BARS ANIMATION ==========
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.parentElement.previousElementSibling.querySelector('strong').textContent;
                const percentage = parseInt(width);
                bar.style.width = percentage + '%';
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.custom-progress').forEach(bar => {
    observer.observe(bar);
});

// ========== FORM VALIDATION =========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validación HTML5
        if (!contactForm.checkValidity()) {
            e.stopPropagation();
            contactForm.classList.add('was-validated');
            return;
        }

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Simular envío
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Enviando...';

        // Simular delay de envío
        setTimeout(() => {
            console.log('Formulario enviado:', formData);

            // Mostrar mensaje de éxito
            btn.innerHTML = '<i class="fa-solid fa-check me-2"></i>¡Enviado!';
            btn.style.background = 'var(--color-success)';

            // Reset después de 3 segundos
            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                btn.disabled = false;
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);

            // Aquí iría el código para enviar a un servidor
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
        }, 1500);
    });
}

// ========== COPY EMAIL BUTTON =========
const copyEmailBtn = document.getElementById('copyEmail');

if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
        const email = 'fedeferessin2001@gmail.com';

        try {
            await navigator.clipboard.writeText(email);

            const originalHTML = copyEmailBtn.innerHTML;
            copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> <span class="d-none d-sm-inline">Copiado!</span>';
            copyEmailBtn.style.background = 'var(--color-success)';

            setTimeout(() => {
                copyEmailBtn.innerHTML = originalHTML;
                copyEmailBtn.style.background = '';
            }, 2000);
        } catch {
            alert('Error al copiar el email');
        }
    });
}

// ========== NOTIFICATION BUTTON =========
document.querySelectorAll('.notify-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const project = btn.dataset.project;
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }, 2000);

        console.log(`Notificación solicitada para: ${project}`);
    });
});

// ========== ANIMACIÓN DE CARGA =========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ========== INTERSECTION OBSERVER PARA ELEMENTOS =========
const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            elementObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .feature-item, .skill-card').forEach(el => {
    elementObserver.observe(el);
});

// ========== SMOOTH SCROLL FALLBACK =========
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========== DARK MODE TOGGLE (OPCIONAL) ==========
// Descomentar si quieres agregar toggle de tema
/*
const toggleTheme = () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
};

// Cargar tema guardado
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}
*/

console.log('Portfolio loaded successfully! 🚀');
