// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const languageDropdown = document.querySelector('.language-dropdown');
const langOptions = document.querySelector('.lang-options');
const currentLangDisplay = document.querySelector('.current-lang-display');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Language dropdown functionality
if (languageDropdown) {
    // Handle language selection
    if (langOptions) {
        langOptions.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                event.stopPropagation();
                const lang = event.target.getAttribute('data-lang');
                if (lang) {
                    languageSwitcher.setLanguage(lang);
                    langOptions.style.display = 'none';
                    langOptions.classList.remove('show');
                }
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (langOptions && !languageDropdown.contains(event.target)) {
            langOptions.style.display = 'none';
            langOptions.classList.remove('show');
        }
    });

    // Reset dropdown display on hover
    languageDropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth <= 768) return; // disable hover on mobile
        if (langOptions) {
            langOptions.style.display = 'block';
        }
    });

    // Toggle overlay on click for mobile
    languageDropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.stopPropagation();
            if (langOptions) {
                const isShown = langOptions.classList.toggle('show');
                langOptions.style.display = isShown ? 'flex' : 'none';
            }
        }
    });

    // Close overlay when clicking outside (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && langOptions && langOptions.classList.contains('show') && !langOptions.contains(e.target) && !languageDropdown.contains(e.target)) {
            langOptions.classList.remove('show');
            langOptions.style.display = 'none';
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Scroll down arrow functionality
const scrollDownArrow = document.querySelector('.scroll-down-arrow');
if (scrollDownArrow) {
    scrollDownArrow.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Initialize EmailJS with your public key
emailjs.init("XtupORJvfmbYXIsF3"); // You'll need to replace this with your actual public key

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const surname = document.getElementById('surname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.send("service_o0srj8l", "template_mze1nbu", {
        from_name: `${surname} ${lastname}`,
        from_email: email,
        message: message,
        to_email: "fherlitz@outlook.com"
    })
    .then(function() {
    // Show success message
        submitBtn.textContent = 'Message Sent!';
    
    // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    })
    .catch(function(error) {
        // Show error message
        submitBtn.textContent = 'Error! Try Again';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
        
        console.error("Error sending email:", error);
        });
    });

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.portfolio-item, .about-content, .contact-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        observer.observe(element);
    });
};

// Initialize animations
animateOnScroll();

// Translations object
const translations = {
    en: {
        nav: {
            contact: "Contact"
        },
        hero: {
            title: "LET'S BRING YOUR MUSIC TO THE NEXT LEVEL"
        },
        about: {
            title: "ABOUT ME",
            text: "I am a guitarist, music producer, and mixing engineer from Monterrey, Mexico, now based in Berlin, Germany.",
            text2: "With over 10 years of experience in the music field and a deep love for crafting immersive soundscapes, I will help you craft music that inspires and leaves a lasting impression.",
            text3: "My approach is all about angular decisions and intuitive moves — capturing the spirit of each project, pushing boundaries, and always staying true to the artist's vision.",
            text4: "Driven by the idea of making music that resonates across borders, I focuses on every detail to create something both personal and universal, bringing a unique perspective — every detail counts."
        },
        work: {
            title: "WHAT CAN I DO FOR YOU",
            production: {
                title: "PRODUCTION",
                text: "I help you develop your song, from the initial idea to the final production."
            },
            guitar: {
                title: "GUITAR WORK",
                text: "Everything guitar related. From high-quality recordings to live performances."
            },
            mixing: {
                title: "MIXING",
                text: "Professional grade mixes that give your music the attention they deserve."
            },
            reachOut: "REACH OUT!"
        },
        projects: {
            title: "SOME PROJECTS I'VE WORKED IN",
            more: "And many more..."
        },
        contact: {
            title: "CONTACT ME",
            description: "Are you interested in working with me? Please fill out the form and I will get in touch with you shortly. Looking forward to hearing from you!",
            name: "Name",
            surname: "Name",
            lastname: "Last name",
            email: "E-mail",
            message: "Message",
            send: "SEND"
        },
        footer: {
            contact: "CONTACT",
            follow: "FOLLOW ME",
            instagram: "Instagram:"
        },
        lang: {
            display: "English"
        }
    },
    es: {
        nav: {
            contact: "Contacto"
        },
        hero: {
            title: "LLEVEMOS TU MÚSICA AL SIGUIENTE NIVEL"
        },
        about: {
            title: "SOBRE MÍ",
            text: "Soy guitarrista, productor musical e ingeniero de mezcla de Monterrey, México, actualmente radicado en Berlín, Alemania.",
            text2: "Con más de 10 años de experiencia en el campo musical y un profundo amor por crear paisajes sonoros inmersivos, te ayudaré a crear música que inspire y deje una impresión duradera.",
            text3: "Mi enfoque se basa en decisiones angulares y movimientos intuitivos — capturando el espíritu de cada proyecto, empujando límites y siempre manteniéndome fiel a la visión del artista.",
            text4: "Impulsado por la idea de hacer música que resuene a través de las fronteras, me enfoco en cada detalle para crear algo tanto personal como universal, aportando una perspectiva única — cada detalle cuenta."
        },
        work: {
            title: "QUÉ PUEDO HACER POR TI",
            production: {
                title: "PRODUCCIÓN",
                text: "Te ayudo a desarrollar tu canción, desde la idea inicial hasta la producción final."
            },
            guitar: {
                title: "TRABAJO DE GUITARRA",
                text: "Todo lo relacionado con la guitarra. Desde grabaciones de alta calidad hasta presentaciones en vivo."
            },
            mixing: {
                title: "MEZCLA",
                text: "Mezclas de grado profesional que dan a tu música la atención que merece."
            },
            reachOut: "¡CONTÁCTAME!"
        },
        projects: {
            title: "ALGUNOS PROYECTOS EN LOS QUE HE TRABAJADO",
            more: "Y muchos más..."
        },
        contact: {
            title: "CONTÁCTAME",
            description: "¿Te interesa trabajar conmigo? Por favor, completa el formulario y me pondré en contacto contigo pronto. ¡Espero saber de ti!",
            name: "Nombre",
            surname: "Nombre",
            lastname: "Apellido",
            email: "Correo electrónico",
            message: "Mensaje",
            send: "ENVIAR"
        },
        footer: {
            contact: "CONTACTO",
            follow: "SÍGUEME",
            instagram: "Instagram:"
        },
        lang: {
            display: "Español"
        }
    },
    de: {
        nav: {
            contact: "Kontakt"
        },
        hero: {
            title: "LASS UNS DEINE MUSIK AUF DAS NÄCHSTE LEVEL BRINGEN"
        },
        about: {
            title: "ÜBER MICH",
            text: "Ich bin Gitarrist, Musikproduzent und Mixing-Engineer aus Monterrey, Mexiko, und lebe jetzt in Berlin, Deutschland.",
            text2: "Mit über 10 Jahren Erfahrung im Musikbereich und einer tiefen Liebe zum Erschaffen immersiver Klanglandschaften helfe ich dir, Musik zu kreieren, die inspiriert und einen bleibenden Eindruck hinterlässt.",
            text3: "Mein Ansatz basiert auf präzisen Entscheidungen und intuitiven Bewegungen — den Geist jedes Projekts einfangen, Grenzen verschieben und immer der Vision des Künstlers treu bleiben.",
            text4: "Getrieben von der Idee, Musik zu machen, die über Grenzen hinweg resoniert, konzentriere ich mich auf jedes Detail, um etwas zu schaffen, das sowohl persönlich als auch universell ist und eine einzigartige Perspektive bringt — jedes Detail zählt."
        },
        work: {
            title: "WAS ICH FÜR DICH TUN KANN",
            production: {
                title: "PRODUKTION",
                text: "Ich helfe dir, dein Lied zu entwickeln, von der ersten Idee bis zur finalen Produktion."
            },
            guitar: {
                title: "GITARRENARBEIT",
                text: "Alles rund um die Gitarre. Von hochwertigen Aufnahmen bis zu Live-Auftritten."
            },
            mixing: {
                title: "MISCHEN",
                text: "Professionelle Mischungen, die deiner Musik die Aufmerksamkeit schenken, die sie verdient."
            },
            reachOut: "KONTAKTIEREN!"
        },
        projects: {
            title: "EINIGE PROJEKTE, AN DENEN ICH GEARBEITET HABE",
            more: "Und viele mehr..."
        },
        contact: {
            title: "KONTAKTIERE MICH",
            description: "Interessierst du dich für eine Zusammenarbeit? Bitte fülle das Formular aus, und ich werde mich in Kürze bei dir melden. Ich freue mich darauf, von dir zu hören!",
            name: "Name",
            surname: "Vorname",
            lastname: "Nachname",
            email: "E-Mail",
            message: "Nachricht",
            send: "SENDEN"
        },
        footer: {
            contact: "KONTAKT",
            follow: "FOLGE MIR",
            instagram: "Instagram:"
        },
        lang: {
            display: "Deutsch"
        }
    }
};

// Function to update text content based on selected language
function updateContent(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let value = translations[lang];
        for (const key of keys) {
            value = value[key];
        }
        if (value) {
            element.textContent = value;
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const keys = element.getAttribute('data-i18n-placeholder').split('.');
        let value = translations[lang];
        for (const key of keys) {
            value = value[key];
        }
        if (value) {
            element.placeholder = value;
        }
    });
}

// Language selection handling
document.querySelectorAll('.lang-options li').forEach(option => {
    option.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        document.querySelector('.current-lang-display').textContent = translations[lang].lang.display;
        updateContent(lang);
    });
});

// Initialize with English
updateContent('en');

// Language switching functionality
const languageSwitcher = {
    currentLang: 'en',

    // Get browser language
    getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        
        const primaryLang = browserLang.split('-')[0];
        
        if (translations[primaryLang]) {
            return primaryLang;
        }
        return 'en';
    },

    init() {
        
        // Check if this is the first visit
        const hasVisitedBefore = localStorage.getItem('has-visited-before');
        
        if (!hasVisitedBefore) {
            this.currentLang = this.getBrowserLanguage();
            localStorage.setItem('has-visited-before', 'true');
        } else {
            // Not first visit - use saved preference
            const savedLang = localStorage.getItem('preferred-language');
            this.currentLang = savedLang || this.getBrowserLanguage();
        }
        
        // Set initial language
        this.setLanguage(this.currentLang);
        
        // Add click event listeners to language options
        document.querySelectorAll('.lang-options li').forEach(li => {
            li.addEventListener('click', () => {
                const lang = li.getAttribute('data-lang');
                this.setLanguage(lang);
                if (langOptions) {
                    langOptions.style.display = 'none'; // Close dropdown after selection
                }
            });
        });
    },

    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;

        // Update current language display
        if (currentLangDisplay && translations[lang].lang && translations[lang].lang.display) {
            currentLangDisplay.textContent = translations[lang].lang.display;
        }

        // Update all translatable elements
        let updatedElements = 0;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const keys = element.getAttribute('data-i18n').split('.');
            let value = translations[lang];
            for (const key of keys) {
                value = value[key];
            }
            if (value) {
                element.textContent = value;
                updatedElements++;
            }
        });

        // Update placeholders
        let updatedPlaceholders = 0;
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const keys = element.getAttribute('data-i18n-placeholder').split('.');
            let value = translations[lang];
            for (const key of keys) {
                value = value[key];
            }
            if (value) {
                element.placeholder = value;
                updatedPlaceholders++;
            }
        });

        // Store language preference
        localStorage.setItem('preferred-language', lang);
    }
};

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    languageSwitcher.init();
});