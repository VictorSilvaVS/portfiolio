document.addEventListener('DOMContentLoaded', () => {
            // Typewriter effect for the title
            function typeWriter(element, text, callback, isName = false) {
                let charIndex = 0;
                const typeSpeed = isName ? 100 : 70;
                
                if (isName) {
                    element.classList.add('typing');
                }

                function type() {
                    if (charIndex < text.length) {
                        if (isName) {
                            element.innerHTML = `<span class="text-gradient">${text.substring(0, charIndex + 1)}</span>`;
                        } else {
                            element.textContent = text.substring(0, charIndex + 1);
                        }
                        charIndex++;
                        setTimeout(type, typeSpeed);
                    } else if (callback) {
                        if (isName) {
                            element.classList.remove('typing');
                        }
                        setTimeout(callback, 500);
                    }
                }
                type();
            }

            function startTitleTypewriter() {
                const texts = ['IA & Backend', 'Machine Learning', 'Data Scientist'];
                let textIndex = 0;
                const element = document.getElementById('typewriter');

                function typeNextText() {
                    if (element) {
                        element.textContent = '';
                        typeWriter(element, texts[textIndex], () => {
                            setTimeout(() => {
                                if (element.textContent.length > 0) {
                                    let charIndex = element.textContent.length;
                                    const deleteInterval = setInterval(() => {
                                        element.textContent = element.textContent.substring(0, charIndex - 1);
                                        charIndex--;
                                        if (charIndex === 0) {
                                            clearInterval(deleteInterval);
                                            textIndex = (textIndex + 1) % texts.length;
                                            typeNextText();
                                        }
                                    }, 100);
                                }
                            }, 2000);
                        });
                    }
                }

                const nameElement = document.getElementById('name-typewriter');
                if (nameElement) {
                    typeWriter(nameElement, 'Victor Silva', () => {
                        typeNextText();
                    }, true);
                }
            }

            startTitleTypewriter();

            // Mobile menu toggle
            const menuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                menuButton.innerHTML = mobileMenu.classList.contains('hidden') ? 
                    '<i class="fas fa-bars text-2xl"></i>' : '<i class="fas fa-times text-2xl"></i>';
            });

            // Close mobile menu when a link is clicked
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    menuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
                });
            });

            // Fade-in on scroll animation
            const faders = document.querySelectorAll('.fade-in');
            const appearOptions = {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            };

            const appearOnScroll = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                });
            }, appearOptions);

            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });

            // Back to top button
            const backToTopButton = document.getElementById('back-to-top');
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.remove('opacity-0', 'invisible');
                    backToTopButton.classList.add('opacity-100', 'visible');
                } else {
                    backToTopButton.classList.remove('opacity-100', 'visible');
                    backToTopButton.classList.add('opacity-0', 'invisible');
                }
            });

            backToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const offset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Animate progress bars when they come into view
            const progressBars = document.querySelectorAll('.progress-fill');
            const progressObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const width = entry.target.style.width;
                        entry.target.style.width = '0';
                        setTimeout(() => {
                            entry.target.style.width = width;
                        }, 100);
                    }
                });
            }, { threshold: 0.5 });

            progressBars.forEach(bar => {
                progressObserver.observe(bar);
            });

            // Lava Lamp Effect =====>
            function initLavaLamp() {
                const lavaLampContainer = document.querySelector('.lava-lamp');
                if (!lavaLampContainer) return;

                const blobs = lavaLampContainer.querySelectorAll('.blob');
                const colors = ['var(--primary)', 'var(--secondary)'];
                const keyframes = ['move1', 'move2', 'move3', 'move4'];

                blobs.forEach(blob => {
                    const size = Math.random() * 250 + 150; 
                    const duration = Math.random() * 20 + 20;
                    const delay = Math.random() * 5;
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    const animation = keyframes[Math.floor(Math.random() * keyframes.length)];

                    blob.style.width = `${size}px`;
                    blob.style.height = `${size}px`;
                    blob.style.top = `${Math.random() * 100 - 25}%`;
                    blob.style.left = `${Math.random() * 100 - 25}%`;
                    blob.style.backgroundColor = color;
                    blob.style.animation = `${animation} ${duration}s ease-in-out infinite alternate`;
                    blob.style.animationDelay = `-${delay}s`;
                });
            }
            initLavaLamp();

            // Project card video hover effect
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                const video = card.querySelector('video');
                if (video) {
                    card.addEventListener('mouseenter', () => {
                        video.play();
                    });
                    card.addEventListener('mouseleave', () => {
                        video.pause();
                        video.currentTime = 0; // Reinicia o vídeo para o início
                    });
                }
            });
        });