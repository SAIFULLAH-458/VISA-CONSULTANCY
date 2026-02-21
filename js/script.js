// ===================================
// ELITE VISA CONSULTANCY - MAIN JS
// ===================================

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert('Please fill all required fields');
            return;
        }
        
        // Show success message
        alert('Thank you! We will contact you shortly.');
        
        // Reset form
        contactForm.reset();
        
        // Here you would typically send data to backend
        console.log('Form Data:', formData);
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll effect to header
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 15px rgba(0, 31, 45, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 31, 45, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Intersection Observer for card animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card, .service-card, .blog-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// CTA Button Actions
document.querySelectorAll('.cta-button, .submit-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Newsletter Subscription
document.querySelectorAll('[placeholder="Your email"]').forEach(input => {
    const parent = input.parentElement;
    if (parent) {
        const btn = parent.querySelector('.cta-button');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const email = input.value;
                
                if (!email || !email.includes('@')) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                alert('Thank you for subscribing!');
                input.value = '';
                
                console.log('Subscribed:', email);
            });
        }
    }
});

// Active Navigation Link Indicator
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '#ffffff';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = '#D4AF37';
        }
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statBoxes = entry.target.querySelectorAll('.stat-box h4');
            statBoxes.forEach(box => {
                const text = box.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                animateCounter(box, number);
            });
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Add hover effect to destination cards
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// Print functionality for pages
function printPage() {
    window.print();
}

// Scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.id = 'scrollToTop';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #D4AF37 0%, #e6c547 100%);
        color: #001F2D;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        transition: all 0.3s ease;
        font-weight: bold;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Lazy loading for images (placeholder support)
document.addEventListener('DOMContentLoaded', () => {
    console.log('Elite Visa Consultancy - Website Loaded');
    console.log('Ready to serve your visa consultation needs');
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Service card click handler
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        console.log('Selected service:', title);
    });
});

// Blog card navigation
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            console.log('Reading article:', href);
        }
    });
});

// Pricing card selection
document.querySelectorAll('.pricing-card button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const packageName = this.closest('.pricing-card').querySelector('.pricing-name').textContent;
        alert(`You selected: ${packageName}\n\nOur team will contact you shortly to confirm the package and discuss your requirements.`);
        console.log('Selected package:', packageName);
    });
});

// Destination card information
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('click', function() {
        const destination = this.querySelector('.destination-content h3').textContent;
        alert(`Learn more about ${destination}\n\nContact us for detailed information about visa requirements and processing times.`);
    });
});

// Add focus styles for accessibility
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #D4AF37';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Newsletter form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Export functions for external use
window.Elite = {
    printPage: printPage,
    validateEmail: validateEmail
};
