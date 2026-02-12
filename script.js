// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Mettre à jour le lien actif
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

// Navigation active au scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollY = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Typing Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init TypeWriter
document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.typing-text');
    const words = ["Ingénieur Systèmes Industriels", "Expert en Microcontrôleurs", "Innovateur Technique", "Passionné d'Automatisation"];
    new TypeWriter(txtElement, words, 2000);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(18, 18, 18, 0.98)';
        header.style.padding = '15px 0';
    } else {
        header.style.background = 'rgba(18, 18, 18, 0.95)';
        header.style.padding = '20px 0';
    }
    
    // Mettre à jour la navigation active
    highlightNavLink();
});

// Scroll Progress Bar
const progressBar = document.getElementById('progressBar');

function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrolled = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    progressBar.style.width = scrolled + '%';
}

// Contact Popup - Version améliorée
const contactPopup = document.getElementById('contactPopup');
const popupClose = document.getElementById('popupClose');

// Variables pour gérer l'état du popup
let popupShown = false;
let isScrollingDown = true;
let lastScrollTop = 0;
let isPopupClosedManually = false;

function checkScrollDirection() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        isScrollingDown = true;
    } else {
        isScrollingDown = false;
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

function manageContactPopup() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollBottom = scrollTop + windowHeight;
    
    // Masquer le popup si on scroll vers le haut
    if (!isScrollingDown && contactPopup.classList.contains('show')) {
        contactPopup.classList.remove('show');
        return;
    }
    
    // Vérifier si on est proche du bas de la page (dans les 5% restants)
    const distanceFromBottom = documentHeight - scrollBottom;
    const threshold = documentHeight * 0.05; // 5% du document
    
    if (distanceFromBottom <= threshold && isScrollingDown && !isPopupClosedManually) {
        // Afficher le popup seulement si on scroll vers le bas ET qu'il n'a pas été fermé manuellement
        if (!popupShown) {
            contactPopup.classList.add('show');
            popupShown = true;
        }
    }
}

// Gestionnaire de fermeture manuelle
popupClose.addEventListener('click', () => {
    contactPopup.classList.remove('show');
    isPopupClosedManually = true;
    
    // Réinitialiser le flag après 5 secondes pour permettre la réapparition
    setTimeout(() => {
        isPopupClosedManually = false;
    }, 5000);
});

// Réinitialiser le flag de fermeture manuelle si l'utilisateur clique sur le lien de contact
document.querySelector('.popup-link').addEventListener('click', () => {
    isPopupClosedManually = false;
    popupShown = true; // Ne plus afficher le popup pour cette session
});

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    const whatsappMessage = `*Nouveau contact portfolio*%0A%0A*Nom:* ${name}%0A*Email:* ${email}%0A*Sujet:* ${subject || 'Non spécifié'}%0A*Message:* ${message}`;
    
    const whatsappURL = `https://wa.me/22940377059?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Animation de succès
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const originalBg = submitBtn.style.background;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
    submitBtn.style.background = 'var(--success)';
    submitBtn.disabled = true;
    
    // Ouvrir WhatsApp après un délai
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        
        // Réinitialiser le bouton après 3 secondes
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = originalBg;
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);
    }, 500);
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.service-card, .project-card, .timeline-item').forEach(el => {
    observer.observe(el);
});

// Événements de scroll améliorés
window.addEventListener('scroll', () => {
    updateProgressBar();
    checkScrollDirection();
    manageContactPopup();
});

// Initialiser au chargement
window.addEventListener('load', () => {
    updateProgressBar();
    highlightNavLink();
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
});

// Prévenir les erreurs d'images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Réinitialiser popupShown quand on retourne en haut de page
window.addEventListener('scroll', () => {
    if (window.pageYOffset === 0) {
        popupShown = false;
    }
});