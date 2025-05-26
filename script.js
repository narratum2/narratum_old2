/**
 * Narratum.io - v3 Enhanced Interactive JavaScript
 * Features: Fixed navigation, gentle moving stars, meditative sound
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeLoader();
    initializeStarField();
    initializeApp();
});

function initializeApp() {
    setTimeout(() => {
        initializeNavigation();
        initializeObservers();
        initializeParallax();
        initializeSymbolInteractions();
        initializeFormHandling();
        initializeAudioToggle();
        initializeColorMoodSwitcher();
        initializeInteractiveBackground();
        initializeLoyaltyJourney();
        initializeConstellationBackground();
        initializeTextHighlighting();
        initializeAnchorMenu();
    }, 1000);
}

// Loading Screen
function initializeLoader() {
    const loader = document.querySelector('.loading-screen');
    
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Gentle Moving Star Field
function initializeStarField() {
    const starContainer = document.createElement('div');
    starContainer.className = 'gentle-stars';
    starContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(starContainer);
    
    // Create gentle moving stars
    const createStar = () => {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1; // 1-3px
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 20 + 30; // 30-50s
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${startX}px;
            top: ${window.innerHeight + 10}px;
            box-shadow: 0 0 ${size}px rgba(255, 255, 255, 0.5);
        `;
        
        starContainer.appendChild(star);
        
        // Animate upward with slight horizontal drift
        let progress = 0;
        const horizontalDrift = (Math.random() - 0.5) * 100;
        
        const animateStar = () => {
            progress += 1 / (duration * 60); // 60fps
            
            if (progress >= 1) {
                star.remove();
                return;
            }
            
            const y = window.innerHeight * (1 - progress) - 10;
            const x = startX + Math.sin(progress * Math.PI * 2) * horizontalDrift;
            
            star.style.transform = `translate(${x - startX}px, ${y - window.innerHeight}px)`;
            star.style.opacity = Math.sin(progress * Math.PI) * 0.8;
            
            requestAnimationFrame(animateStar);
        };
        
        animateStar();
    };
    
    // Create initial stars
    for (let i = 0; i < 20; i++) {
        setTimeout(createStar, i * 200);
    }
    
    // Continue creating stars
    setInterval(createStar, 2000);
}

// Fixed Navigation Dots
function initializeNavigation() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Enhanced click event for navigation dots
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = dot.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            
            if (section) {
                const offset = 0;
                const targetPosition = section.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                navDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            }
        });
    });
    
    // Update active dot on scroll
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('data-section');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });
    });
}

// Fixed Anchor Menu
function initializeAnchorMenu() {
    const anchorMenu = document.querySelector('.anchor-menu');
    const sections = document.querySelectorAll('.section');
    
    if (!anchorMenu) return;
    
    // Show/hide anchor menu based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight / 2) {
            anchorMenu.classList.add('visible');
        } else {
            anchorMenu.classList.remove('visible');
        }
        
        // Update active anchor
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('data-section');
            }
        });
        
        const anchors = anchorMenu.querySelectorAll('.anchor-link');
        anchors.forEach(anchor => {
            anchor.classList.remove('active');
            if (anchor.getAttribute('data-section') === currentSection) {
                anchor.classList.add('active');
            }
        });
    });
    
    // Fix anchor links to work properly
    const anchors = anchorMenu.querySelectorAll('.anchor-link');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = anchor.getAttribute('data-section');
            const section = document.getElementById(targetSection);
            
            if (section) {
                const offset = 0;
                const targetPosition = section.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                anchors.forEach(a => a.classList.remove('active'));
                anchor.classList.add('active');
            }
        });
    });
}

// Intersection Observer for Animations
function initializeObservers() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Observer for capability blocks
    const capabilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
                const index = entry.target.getAttribute('data-index');
                entry.target.style.transitionDelay = `${(index - 1) * 0.2}s`;
            }
        });
    }, observerOptions);
    
    const capabilityBlocks = document.querySelectorAll('.capability-block');
    capabilityBlocks.forEach(block => {
        capabilityObserver.observe(block);
    });
    
    // Observer for journey nodes
    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
                const index = entry.target.getAttribute('data-node');
                entry.target.style.transitionDelay = `${(index - 1) * 0.3}s`;
            }
        });
    }, observerOptions);
    
    const journeyNodes = document.querySelectorAll('.journey-node');
    journeyNodes.forEach(node => {
        journeyObserver.observe(node);
    });
    
    // Observer for fade-in elements
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Parallax Effect
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroArc = heroSection.querySelector('.section-arc');
            if (heroArc) {
                heroArc.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        }
        
        // Parallax for other section arcs
        const sectionArcs = document.querySelectorAll('.section-arc:not(.hero .section-arc)');
        sectionArcs.forEach(arc => {
            const section = arc.closest('.section');
            const sectionTop = section.offsetTop;
            const distanceFromTop = scrollY - sectionTop;
            
            if (arc.classList.contains('top')) {
                arc.style.transform = `translateY(${distanceFromTop * 0.2}px)`;
            } else if (arc.classList.contains('bottom')) {
                arc.style.transform = `translateY(${distanceFromTop * 0.1}px)`;
            }
        });
        
        // Parallax for gold line
        const goldLine = document.querySelector('.gold-line');
        if (goldLine) {
            const lineHeight = window.innerHeight;
            const totalHeight = document.body.scrollHeight;
            const scrollPercent = scrollY / (totalHeight - lineHeight);
            const gradientPosition = Math.min(100, Math.max(0, scrollPercent * 100));
            
            goldLine.style.background = `linear-gradient(to bottom, 
                rgba(251, 191, 36, 0),
                rgba(251, 191, 36, 0.3) ${gradientPosition - 10}%,
                rgba(251, 191, 36, 0.5) ${gradientPosition}%,
                rgba(251, 191, 36, 0.3) ${gradientPosition + 10}%,
                rgba(251, 191, 36, 0))`;
        }
    });
}

// Symbol Interactions
function initializeSymbolInteractions() {
    const symbols = document.querySelectorAll('.symbol-item');
    
    symbols.forEach(symbol => {
        symbol.addEventListener('click', function() {
            const wasActive = this.classList.contains('active');
            
            symbols.forEach(s => s.classList.remove('active'));
            
            if (!wasActive) {
                this.classList.add('active');
                createMagicalParticles(this);
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.symbol-item')) {
            symbols.forEach(s => s.classList.remove('active'));
        }
    });
}

// Create magical particles for symbol interaction
function createMagicalParticles(symbolElement) {
    const rect = symbolElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.classList.add('magical-particle');
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = Math.random() > 0.5 ? 'var(--accent-gold)' : 'var(--accent-cyan)';
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.1 + Math.random() * 0.4;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`;
            particle.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(particle);
            }, 1000);
        }, 10);
    }
}

// Form Handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="button-text">Sending...</span>';
            submitButton.disabled = true;
            
            setTimeout(() => {
                contactForm.innerHTML = `
                    <div class="form-success">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="success-icon">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h3>Message Sent</h3>
                        <p>Thank you for reaching out. We'll be in touch soon.</p>
                    </div>
                `;
            }, 1500);
        });
    }
}

// Enhanced Meditative Audio Toggle
function initializeAudioToggle() {
    const audioToggle = document.querySelector('.audio-toggle');
    const soundVisualization = document.querySelector('.sound-visualization');
    let audioContext;
    let masterGain;
    let nodes = {};
    let animationFrame;
    
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            const currentState = audioToggle.getAttribute('data-state');
            
            if (currentState === 'inactive') {
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    masterGain = audioContext.createGain();
                    masterGain.gain.value = 0;
                    masterGain.connect(audioContext.destination);
                    
                    createMeditativeSound();
                }
                
                // Fade in slowly
                masterGain.gain.cancelScheduledValues(audioContext.currentTime);
                masterGain.gain.setValueAtTime(0, audioContext.currentTime);
                masterGain.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 3);
                
                audioToggle.setAttribute('data-state', 'active');
                soundVisualization.classList.add('active');
                
                visualizeAudio();
            } else {
                if (audioContext && masterGain) {
                    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
                    masterGain.gain.setValueAtTime(masterGain.gain.value, audioContext.currentTime);
                    masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2);
                }
                
                audioToggle.setAttribute('data-state', 'inactive');
                soundVisualization.classList.remove('active');
                
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            }
        });
    }
    
    function createMeditativeSound() {
        // Create a deep, meditative drone
        const fundamentalFreq = 110; // A2
        
        // Main drone oscillator
        nodes.drone = audioContext.createOscillator();
        nodes.drone.type = 'sine';
        nodes.drone.frequency.value = fundamentalFreq;
        
        // Sub bass for depth
        nodes.sub = audioContext.createOscillator();
        nodes.sub.type = 'sine';
        nodes.sub.frequency.value = fundamentalFreq / 2;
        
        // Harmonic overtones for richness
        nodes.fifth = audioContext.createOscillator();
        nodes.fifth.type = 'sine';
        nodes.fifth.frequency.value = fundamentalFreq * 1.5;
        
        nodes.octave = audioContext.createOscillator();
        nodes.octave.type = 'sine';
        nodes.octave.frequency.value = fundamentalFreq * 2;
        
        // Create gain nodes for each oscillator
        nodes.droneGain = audioContext.createGain();
        nodes.droneGain.gain.value = 0.4;
        
        nodes.subGain = audioContext.createGain();
        nodes.subGain.gain.value = 0.3;
        
        nodes.fifthGain = audioContext.createGain();
        nodes.fifthGain.gain.value = 0.15;
        
        nodes.octaveGain = audioContext.createGain();
        nodes.octaveGain.gain.value = 0.1;
        
        // Create filter for warmth
        nodes.filter = audioContext.createBiquadFilter();
        nodes.filter.type = 'lowpass';
        nodes.filter.frequency.value = 800;
        nodes.filter.Q.value = 0.5;
        
        // Connect everything
        nodes.drone.connect(nodes.droneGain);
        nodes.sub.connect(nodes.subGain);
        nodes.fifth.connect(nodes.fifthGain);
        nodes.octave.connect(nodes.octaveGain);
        
        nodes.droneGain.connect(nodes.filter);
        nodes.subGain.connect(nodes.filter);
        nodes.fifthGain.connect(nodes.filter);
        nodes.octaveGain.connect(nodes.filter);
        
        nodes.filter.connect(masterGain);
        
        // Start all oscillators
        nodes.drone.start();
        nodes.sub.start();
        nodes.fifth.start();
        nodes.octave.start();
        
        // Create subtle modulation
        nodes.lfo = audioContext.createOscillator();
        nodes.lfo.frequency.value = 0.1; // Very slow modulation
        nodes.lfoGain = audioContext.createGain();
        nodes.lfoGain.gain.value = 2;
        
        nodes.lfo.connect(nodes.lfoGain);
        nodes.lfoGain.connect(nodes.filter.frequency);
        nodes.lfo.start();
        
        // Add subtle volume modulation for breathing effect
        nodes.volumeLfo = audioContext.createOscillator();
        nodes.volumeLfo.frequency.value = 0.05; // Even slower
        nodes.volumeLfoGain = audioContext.createGain();
        nodes.volumeLfoGain.gain.value = 0.02;
        
        nodes.volumeLfo.connect(nodes.volumeLfoGain);
        nodes.volumeLfoGain.connect(masterGain.gain);
        nodes.volumeLfo.start();
    }
    
    function visualizeAudio() {
        const soundBars = document.querySelectorAll('.sound-bar');
        let phase = 0;
        
        function draw() {
            phase += 0.01;
            
            soundBars.forEach((bar, i) => {
                const offset = i * 0.2;
                const height = 30 + Math.sin(phase + offset) * 20 + Math.sin(phase * 2 + offset) * 10;
                const opacity = 0.3 + Math.sin(phase + offset) * 0.2;
                
                bar.style.height = `${height}%`;
                bar.style.opacity = opacity;
            });
            
            animationFrame = requestAnimationFrame(draw);
        }
        
        draw();
    }
}

// Signal Particles Background (Removed - replaced with gentle stars)

// Color Mood Switcher
function initializeColorMoodSwitcher() {
    const moodDots = document.querySelectorAll('.mood-dot');
    const root = document.documentElement;
    
    moodDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const mood = dot.getAttribute('data-mood');
            
            moodDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            switch (mood) {
                case 'default':
                    root.style.setProperty('--bg-primary', '#0a1520');
                    root.style.setProperty('--bg-secondary', '#0d1825');
                    root.style.setProperty('--accent-gold', '#fbbf24');
                    root.style.setProperty('--accent-cyan', '#7dd3fc');
                    break;
                case 'teal':
                    root.style.setProperty('--bg-primary', '#0a2025');
                    root.style.setProperty('--bg-secondary', '#0d2530');
                    root.style.setProperty('--accent-gold', '#2dd4bf');
                    root.style.setProperty('--accent-cyan', '#06b6d4');
                    break;
                case 'purple':
                    root.style.setProperty('--bg-primary', '#1a0a25');
                    root.style.setProperty('--bg-secondary', '#250d30');
                    root.style.setProperty('--accent-gold', '#a78bfa');
                    root.style.setProperty('--accent-cyan', '#8b5cf6');
                    break;
                case 'gold':
                    root.style.setProperty('--bg-primary', '#251a0a');
                    root.style.setProperty('--bg-secondary', '#302510');
                    root.style.setProperty('--accent-gold', '#f59e0b');
                    root.style.setProperty('--accent-cyan', '#fbbf24');
                    break;
            }
        });
    });
}

// Interactive Background
function initializeInteractiveBackground() {
    const cursorFollower = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursorFollower) {
            cursorFollower.style.opacity = '1';
        }
    });
    
    function animateFollower() {
        if (cursorFollower) {
            followerX += (mouseX - followerX) * 0.05;
            followerY += (mouseY - followerY) * 0.05;
            
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        }
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
}

// Loyalty Journey
function initializeLoyaltyJourney() {
    const journeyNodes = document.querySelectorAll('.journey-node');
    
    if (!journeyNodes.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
                const index = entry.target.getAttribute('data-node');
                if (index) {
                    entry.target.style.transitionDelay = `${(parseInt(index) - 1) * 0.2}s`;
                }
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2
    });
    
    journeyNodes.forEach(node => {
        observer.observe(node);
    });
}

// Constellation Background for Hero Section
function initializeConstellationBackground() {
    const constellationStars = document.querySelector('.constellation-stars');
    const constellationLines = document.querySelector('.constellation-lines');
    
    if (!constellationStars || !constellationLines) return;
    
    constellationStars.innerHTML = '';
    constellationLines.innerHTML = '';
    
    // Create fewer, more subtle stars
    const starCount = 15;
    const starPositions = [];
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${1 + Math.random() * 2}px`;
        star.style.height = star.style.width;
        star.style.opacity = Math.random() * 0.5 + 0.3;
        
        if (Math.random() > 0.7) {
            star.classList.add('twinkle');
            star.style.animationDelay = `${Math.random() * 4}s`;
        }
        
        constellationStars.appendChild(star);
        starPositions.push({ x, y, element: star });
    }
}

// Text Highlighting on Scroll
function initializeTextHighlighting() {
    const highlightElements = document.querySelectorAll('.highlight-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                setTimeout(() => {
                    if (!isElementInViewport(entry.target)) {
                        entry.target.classList.remove('active');
                    }
                }, 2000);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1
    });
    
    highlightElements.forEach(element => {
        observer.observe(element);
    });
    
    window.addEventListener('scroll', () => {
        highlightElements.forEach(element => {
            if (isElementInViewport(element, 0.5)) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    });
    
    function isElementInViewport(el, threshold = 0.1) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const elementHeight = rect.bottom - rect.top;
        
        return visibleHeight / elementHeight > threshold;
    }
}

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.querySelectorAll('[class*="animate"]').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        document.querySelectorAll('[class*="animate"]').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const sections = document.querySelectorAll('.section');
    const currentSection = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
    });
    
    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        e.preventDefault();
        sections[currentSection + 1]?.scrollIntoView({ behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        sections[currentSection - 1]?.scrollIntoView({ behavior: 'smooth' });
    }
});

// Error boundary for production
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});
