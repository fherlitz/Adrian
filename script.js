// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const languageDropdown = document.querySelector('.language-dropdown');
const langOptions = document.querySelector('.lang-options');
const currentLangDisplay = document.querySelector('.current-lang-display');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Language dropdown functionality will be handled by languageSwitcher.init()

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
emailjs.init("rsJDXLGG6L7T71boG");

// Form submission handling - only if contact form exists
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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
    emailjs.send("service_yed0rth", "template_s33693i", {
        from_name: `${surname} ${lastname}`,
        from_email: email,
        message: message,
        to_email: "info@cantuadrian.com"
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
}

// Add animation on scroll (optimized for mobile)
const animateOnScroll = () => {
    // Skip animations on mobile for better performance
    if (window.innerWidth <= 768) {
        return;
    }
    
    const elements = document.querySelectorAll('.portfolio-item, .about-content, .contact-content');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        rootMargin: '20px' // Start animation earlier
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.3s ease'; // Faster transitions
        observer.observe(element);
    });
};

// Initialize animations only after page load on desktop
if (window.innerWidth > 768) {
    window.addEventListener('load', animateOnScroll);
}

// Translations object
const translations = {
    en: {
        nav: {
            contact: "Contact",
            back: "Back"
        },
        hero: {
            title: "LET'S BRING YOUR MUSIC TO THE NEXT LEVEL"
        },
        about: {
            title: "ABOUT ME",
            text: "I am a guitarist, music producer, and mixing engineer from Monterrey, Mexico, now based in Berlin, Germany.",
            text2: "With over 10 years of experience in the music field and a deep love for crafting immersive soundscapes, I will help you craft music that inspires and leaves a lasting impression.",
            text3: "My approach is all about angular decisions and intuitive moves — capturing the spirit of each project, pushing boundaries, and always staying true to the artist's vision.",
            text4: "Driven making music that resonates across borders, I focus up to the finest aspects to create something both personal and universal, bringing a unique perspective — every detail counts."
        },
        work: {
            title: "WHAT CAN I DO FOR YOU",
            production: {
                title: "PRODUCTION",
                text: "I help you develop your song, from the initial idea to the final production."
            },
            guitar: {
                title: "GUITAR WORK",
                text: "All things guitar. From high-quality recordings to live performances."
            },
            mixing: {
                title: "MIXING",
                text: "Professional grade mixes that give your music the attention they deserve."
            },
            reachOut: "REACH OUT!"
        },
        projects: {
            title: "SOME PROJECTS I'VE WORKED WITH",
            more: "And many more..."
        },
        contact: {
            title: "CONTACT ME",
            description: "Are you interested in working with me? Fill out the form and I will get in touch with you shortly. Looking forward to hearing from you!",
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
            instagram: "Instagram:",
            imprint: "Imprint & Privacy"
        },
        imprint: {
            title: "Imprint & Privacy Policy",
            tmg: {
                title: "Information according to § 5 TMG"
            },
            contact: {
                title: "Contact",
                info: "Email: info@cantuadrian.com<br>Phone: +49 162 2563464"
            },
            responsible: {
                title: "Responsible for content according to § 55 Abs. 2 RStV"
            },
            privacy: {
                title: "Privacy Policy",
                section1: {
                    title: "1. Data Protection at a Glance",
                    general: {
                        title: "General Notes",
                        text: "The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can personally identify you."
                    },
                    data: {
                        title: "Data Collection on this Website",
                        text: "This website uses EmailJS for the contact form functionality. When you submit the contact form, your data is processed through EmailJS's servers. The data is only used to send you a response and is not stored permanently."
                    }
                },
                section2: {
                    title: "2. Hosting",
                    text: "This website is hosted on GitHub Pages. GitHub may collect certain technical data such as IP addresses and browser information. For more information, please refer to GitHub's privacy policy."
                },
                section3: {
                    title: "3. General Notes and Mandatory Information",
                    protection: {
                        title: "Data Protection",
                        text: "The operators of this website take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy."
                    },
                    party: {
                        title: "Note on the Responsible Party",
                        text: "The party responsible for processing data on this website is:"
                    }
                },
                section4: {
                    title: "4. Data Collection on this Website",
                    form: {
                        title: "Contact Form",
                        text: "If you send us inquiries via the contact form, your information from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not share this data without your consent."
                    }
                }
            },
            copyright: {
                title: "Copyright",
                text: "© 2024 Adrian Cantu. All rights reserved. The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator."
            }
        },
        lang: {
            display: "English"
        }
    },
    es: {
        nav: {
            contact: "Contacto",
            back: "Volver"
        },
        hero: {
            title: "LLEVEMOS TU MÚSICA AL SIGUIENTE NIVEL"
        },
        about: {
            title: "SOBRE MÍ",
            text: "Soy guitarrista, productor musical e ingeniero de mezcla de Monterrey, México, actualmente radicado en Berlín, Alemania.",
            text2: "Con más de 10 años de experiencia en el campo musical y un profundo amor por crear paisajes sonoros inmersivos, te ayudaré a elaborar música que inspire y deje una impresión duradera.",
            text3: "Mi enfoque se basa en decisiones angulares y movimientos intuitivos — capturando el espíritu de cada proyecto, empujando límites y siempre manteniéndome fiel a la visión del artista.",
            text4: "Impulsado por la idea de hacer que la música resuene rompiendo fronteras, me enfoco en cada elemento para crear algo tanto personal como universal, aportando una perspectiva única — cada detalle cuenta."
        },
        work: {
            title: "LO QUE YO PUEDO HACER POR TI",
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
            title: "ALGUNOS PROYECTOS CON LOS QUE HE TRABAJADO",
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
            instagram: "Instagram:",
            imprint: "Aviso Legal y Privacidad"
        },
        imprint: {
            title: "Aviso Legal y Política de Privacidad",
            tmg: {
                title: "Información según § 5 TMG"
            },
            contact: {
                title: "Contacto",
                info: "Email: info@cantuadrian.com<br>Teléfono: +49 162 2563464"
            },
            responsible: {
                title: "Responsable del contenido según § 55 Abs. 2 RStV"
            },
            privacy: {
                title: "Política de Privacidad",
                section1: {
                    title: "1. Protección de Datos",
                    general: {
                        title: "Notas Generales",
                        text: "Las siguientes notas proporcionan una descripción simple de lo que sucede con sus datos personales cuando visita este sitio web. Los datos personales son cualquier dato que puede identificarlo personalmente."
                    },
                    data: {
                        title: "Recopilación de Datos en este Sitio Web",
                        text: "Este sitio web utiliza EmailJS para la funcionalidad del formulario de contacto. Cuando envía el formulario de contacto, sus datos se procesan a través de los servidores de EmailJS. Los datos solo se utilizan para enviarle una respuesta y no se almacenan permanentemente."
                    }
                },
                section2: {
                    title: "2. Alojamiento",
                    text: "Este sitio web está alojado en GitHub Pages. GitHub puede recopilar ciertos datos técnicos como direcciones IP e información del navegador. Para más información, consulte la política de privacidad de GitHub."
                },
                section3: {
                    title: "3. Notas Generales e Información Obligatoria",
                    protection: {
                        title: "Protección de Datos",
                        text: "Los operadores de este sitio web toman muy en serio la protección de sus datos personales. Tratamos sus datos personales de manera confidencial y de acuerdo con las regulaciones estatutarias de protección de datos y esta política de privacidad."
                    },
                    party: {
                        title: "Nota sobre la Parte Responsable",
                        text: "La parte responsable del procesamiento de datos en este sitio web es:"
                    }
                },
                section4: {
                    title: "4. Recopilación de Datos en este Sitio Web",
                    form: {
                        title: "Formulario de Contacto",
                        text: "Si nos envía consultas a través del formulario de contacto, su información del formulario de consulta, incluidos los datos de contacto que proporcionó allí, será almacenada por nosotros con el propósito de procesar la consulta y en caso de preguntas de seguimiento. No compartimos estos datos sin su consentimiento."
                    }
                }
            },
            copyright: {
                title: "Derechos de Autor",
                text: "© 2024 Adrian Cantu. Todos los derechos reservados. El contenido y las obras creadas por los operadores del sitio en estas páginas están sujetos a la ley de derechos de autor alemana. La duplicación, procesamiento, distribución o cualquier forma de comercialización de dicho material más allá del alcance de la ley de derechos de autor requerirá el consentimiento previo por escrito de su respectivo autor o creador."
            }
        },
        lang: {
            display: "Español"
        }
    },
    de: {
        nav: {
            contact: "Kontakt",
            back: "Zurück"
        },
        hero: {
            title: "LASS UNS DEINE MUSIK AUF DAS NÄCHSTE LEVEL BRINGEN"
        },
        about: {
            title: "ÜBER MICH",
            text: "Ich bin Gitarrist, Musikproduzent und Mixing Engineer aus Monterrey, Mexiko, und lebe mittlerweile in Berlin, Deutschland.",
            text2: "Mit über zehn Jahren Erfahrung in der Musik und einer tiefen Leidenschaft für immersive Klang, helfe ich dir, Musik zu erschaffen, die inspiriert und einen bleibenden Eindruck hinterlässt.",
            text3: "Mein Ansatz basiert auf präzisen Entscheidungen und intuitiven Impulsen, den Charakter jedes Projekts einfangen, und dabei stets der künstlerischen Vision treu bleiben.",
            text4: "Getrieben von dem Wunsch, Musik zu schaffen, die über Grenzen hinweg berührt, achte ich auf jedes Element, um etwas zu kreieren, das sowohl persönlich als auch universell ist, mit einer einzigartigen Perspektive. Denn jedes Detail zählt."
        },
        work: {
            title: "WAS ICH FÜR DICH TUN KANN",
            production: {
                title: "PRODUKTION",
                text: "Ich unterstütze dich bei jedem Schritt der Entwicklung deines Songs. Von der ersten Idee bis zur finalen Produktion."
            },
            guitar: {
                title: "GITARRENARBEIT",
                text: "Alles rund um die Gitarre. Von hochwertigen Studioaufnahmen bis hin zu Live-Performances."
            },
            mixing: {
                title: "MIXING",
                text: "Professionelle Mischungen, die deiner Musik die Aufmerksamkeit geben die sie verdient."
            },
            reachOut: "KONTAKTIEREN!"
        },
        projects: {
            title: "EINIGE PROJEKTE, MIT DENEN ICH GEARBEITET HABE",
            more: "Und viele mehr..."
        },
        contact: {
            title: "KONTAKTIERE MICH",
            description: "Interessierst du dich für eine Zusammenarbeit? Fülle einfach das Formular aus! Ich melde mich zeitnah bei dir. Ich freue mich darauf, von dir zu hören!",
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
            instagram: "Instagram:",
            imprint: "Impressum & Datenschutz"
        },
        imprint: {
            title: "Impressum & Datenschutzerklärung",
            tmg: {
                title: "Angaben gemäß § 5 TMG"
            },
            contact: {
                title: "Kontakt",
                info: "E-Mail: info@cantuadrian.com<br>Telefon: +49 162 2563464"
            },
            responsible: {
                title: "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV"
            },
            privacy: {
                title: "Datenschutzerklärung",
                section1: {
                    title: "1. Datenschutz auf einen Blick",
                    general: {
                        title: "Allgemeine Hinweise",
                        text: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können."
                    },
                    data: {
                        title: "Datenerfassung auf dieser Website",
                        text: "Diese Website nutzt EmailJS für die Kontaktformular-Funktionalität. Wenn Sie das Kontaktformular absenden, werden Ihre Daten über EmailJS's Server verarbeitet. Die Daten werden nur verwendet, um Ihnen eine Antwort zu senden und werden nicht dauerhaft gespeichert."
                    }
                },
                section2: {
                    title: "2. Hosting",
                    text: "Diese Website wird auf GitHub Pages gehostet. GitHub kann bestimmte technische Daten wie IP-Adressen und Browser-Informationen sammeln. Weitere Informationen finden Sie in GitHubs Datenschutzerklärung."
                },
                section3: {
                    title: "3. Allgemeine Hinweise und Pflichtinformationen",
                    protection: {
                        title: "Datenschutz",
                        text: "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."
                    },
                    party: {
                        title: "Hinweis zur verantwortlichen Stelle",
                        text: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:"
                    }
                },
                section4: {
                    title: "4. Datenerfassung auf dieser Website",
                    form: {
                        title: "Kontaktformular",
                        text: "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
                    }
                }
            },
            copyright: {
                title: "Urheberrecht",
                text: "© 2024 Adrian Cantu. Alle Rechte vorbehalten. Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers."
            }
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
            // Use innerHTML for content that contains HTML tags (like <br>)
            if (value.includes('<br>')) {
                element.innerHTML = value;
            } else {
                element.textContent = value;
            }
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

// Note: Language selection is now handled by languageSwitcher.init() below

// Language switching functionality (mobile optimized)
const languageSwitcher = {
    currentLang: 'en',

    // Get browser language
    getBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const primaryLang = browserLang.split('-')[0];
        return translations[primaryLang] ? primaryLang : 'en';
    },

    init() {
        // Use requestIdleCallback for non-critical initialization
        const initializeLanguage = () => {
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
            
            // Setup language dropdown functionality
            const languageDropdown = document.querySelector('.language-dropdown');
            const langOptions = document.querySelector('.lang-options');
            
            if (languageDropdown) {
                // Handle language selection
                if (langOptions) {
                    langOptions.addEventListener('click', (event) => {
                        if (event.target.tagName === 'LI') {
                            event.stopPropagation();
                            const lang = event.target.getAttribute('data-lang');
                            if (lang) {
                                this.setLanguage(lang);
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
        };

        // Use requestIdleCallback if available, otherwise setTimeout
        if (window.requestIdleCallback) {
            requestIdleCallback(initializeLanguage);
        } else {
            setTimeout(initializeLanguage, 0);
        }
    },

    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;

        // Update current language display
        if (currentLangDisplay && translations[lang].lang && translations[lang].lang.display) {
            currentLangDisplay.textContent = translations[lang].lang.display;
        }

        // Update all translatable elements using the global updateContent function
        updateContent(lang);

        // Store language preference
        localStorage.setItem('preferred-language', lang);
    }
};

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    languageSwitcher.init();
});