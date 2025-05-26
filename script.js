/**
 * Narratum.io - Perfect Hybrid Interactive JavaScript
 * Features interactive background, symbol interactions, sound elements, and text highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeLoader();
    initializeSignalParticles();
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
        // Simulate loading time for visual effect
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Navigation Dots
function initializeNavigation() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Click event for navigation dots
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSection = dot.getAttribute('data-section');
            const section = document.querySelector(`[data-section="${targetSection}"]`);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Scroll event to update active dot
    window.addEventListener('scroll', () => {
        let currentSection = '';
        let closestDistance = Infinity;
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionMiddle = sectionTop + sectionHeight / 2;
            const distance = Math.abs(scrollPosition - sectionMiddle);
            
            if (distance < closestDistance) {
                closestDistance = distance;
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

// Anchor Menu that appears when scrolling
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
        let closestDistance = Infinity;
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionMiddle = sectionTop + sectionHeight / 2;
            const distance = Math.abs(scrollPosition - sectionMiddle);
            
            if (distance < closestDistance) {
                closestDistance = distance;
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
    
    // Click event for anchor links
    const anchors = anchorMenu.querySelectorAll('.anchor-link');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = anchor.getAttribute('data-section');
            const section = document.querySelector(`[data-section="${targetSection}"]`);
            
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
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
                // Add staggered animation delay
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
                // Add staggered animation delay
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
            // Toggle active state
            const wasActive = this.classList.contains('active');
            
            // Close all other symbols
            symbols.forEach(s => s.classList.remove('active'));
            
            // Toggle current symbol
            if (!wasActive) {
                this.classList.add('active');
                
                // Add magical particle effect
                createMagicalParticles(this);
            }
        });
    });
    
    // Close on click outside
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
        
        // Random position around the symbol
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Set particle properties
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.backgroundColor = Math.random() > 0.5 ? 'var(--accent-gold)' : 'var(--accent-cyan)';
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.1 + Math.random() * 0.4;
        
        // Add to DOM
        document.body.appendChild(particle);
        
        // Animate and remove
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
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="button-text">Sending...</span>';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Show success message
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

// Audio Toggle with Enhanced Sound
function initializeAudioToggle() {
    const audioToggle = document.querySelector('.audio-toggle');
    const soundVisualization = document.querySelector('.sound-visualization');
    let audioContext;
    let masterGain;
    let oscillators = [];
    let analyser;
    let animationFrame;
    
    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            const currentState = audioToggle.getAttribute('data-state');
            
            if (currentState === 'inactive') {
                // Initialize audio context if not already created
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    masterGain = audioContext.createGain();
                    masterGain.gain.value = 0;
                    masterGain.connect(audioContext.destination);
                    
                    // Create analyser for visualization
                    analyser = audioContext.createAnalyser();
                    analyser.fftSize = 32;
                    masterGain.connect(analyser);
                    
                    // Create ambient sound
                    createAmbientSound();
                }
                
                // Fade in
                masterGain.gain.cancelScheduledValues(audioContext.currentTime);
                masterGain.gain.setValueAtTime(masterGain.gain.value, audioContext.currentTime);
                masterGain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 2);
                
                audioToggle.setAttribute('data-state', 'active');
                soundVisualization.classList.add('active');
                
                // Start visualization
                visualizeAudio();
            } else {
                // Fade out
                if (audioContext && masterGain) {
                    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
                    masterGain.gain.setValueAtTime(masterGain.gain.value, audioContext.currentTime);
                    masterGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);
                }
                
                audioToggle.setAttribute('data-state', 'inactive');
                soundVisualization.classList.remove('active');
                
                // Stop visualization
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            }
        });
    }
    
    function createAmbientSound() {
        // Base frequencies for a calming ambient sound
        const frequencies = [
            55, // A1
            110, // A2
            220, // A3
            330, // E4
            440, // A4
        ];
        
        // Create oscillators for each frequency
        frequencies.forEach(freq => {
            // Main oscillator
            const osc = audioContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            // Individual gain for this oscillator
            const gain = audioContext.createGain();
            gain.gain.value = 0.1 + Math.random() * 0.1;
            
            // Connect oscillator to its gain node
            osc.connect(gain);
            
            // Connect gain to master gain
            gain.connect(masterGain);
            
            // Start oscillator
            osc.start();
            
            // Store oscillator for later reference
            oscillators.push(osc);
            
            // Modulate the frequency slightly over time for organic feel
            setInterval(() => {
                const now = audioContext.currentTime;
                osc.frequency.setValueAtTime(osc.frequency.value, now);
                osc.frequency.linearRampToValueAtTime(
                    freq * (0.99 + Math.random() * 0.02), 
                    now + 2 + Math.random() * 3
                );
            }, 5000);
        });
        
        // Add subtle noise for texture
        const bufferSize = 2 * audioContext.sampleRate;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noise = audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;
        
        const noiseGain = audioContext.createGain();
        noiseGain.gain.value = 0.01;
        
        noise.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start();
    }
    
    function visualizeAudio() {
        if (!analyser) return;
        
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const soundBars = document.querySelectorAll('.sound-bar');
        
        function draw() {
            analyser.getByteFrequencyData(dataArray);
            
            // Update visualization bars
            soundBars.forEach((bar, i) => {
                const index = Math.floor(i / soundBars.length * dataArray.length);
                const value = dataArray[index] / 255;
                const height = Math.max(10, value * 100);
                bar.style.height = `${height}%`;
                bar.style.opacity = 0.3 + value * 0.7;
            });
            
            animationFrame = requestAnimationFrame(draw);
        }
        
        draw();
    }
}

// Signal Particles Background
function initializeSignalParticles() {
    const container = document.querySelector('.signal-particles');
    
    if (container) {
        // Create initial particles
        for (let i = 0; i < 30; i++) {
            createParticle();
        }
        
        // Continue creating particles at intervals
        setInterval(createParticle, 2000);
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('signal-particle');
        
        // Random position, size, and duration
        const size = 1 + Math.random() * 3;
        const posX = Math.random() * 100;
        const duration = 15 + Math.random() * 20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.animationDuration = `${duration}s`;
        
        // Add to container
        container.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            container.removeChild(particle);
        }, duration * 1000);
    }
}

// Color Mood Switcher
function initializeColorMoodSwitcher() {
    const moodDots = document.querySelectorAll('.mood-dot');
    const root = document.documentElement;
    
    moodDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const mood = dot.getAttribute('data-mood');
            
            // Remove active class from all dots
            moodDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            dot.classList.add('active');
            
            // Apply color scheme based on mood
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
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Show cursor follower
        if (cursorFollower) {
            cursorFollower.style.opacity = '1';
        }
        
        // Trigger hover effect on nearby stars
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const rect = star.getBoundingClientRect();
            const starX = rect.left + rect.width / 2;
            const starY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(mouseX - starX, 2) + Math.pow(mouseY - starY, 2));
            
            // If mouse is close to star, make it glow
            if (distance < 100) {
                const intensity = 1 - distance / 100;
                star.style.transform = `scale(${1 + intensity * 0.5})`;
                star.style.opacity = Math.min(1, 0.2 + intensity * 0.8);
                star.style.boxShadow = `0 0 ${10 * intensity}px ${5 * intensity}px rgba(251, 191, 36, ${intensity * 0.5})`;
            } else {
                star.style.transform = '';
                star.style.opacity = '';
                star.style.boxShadow = '';
            }
        });
    });
    
    // Animate cursor follower
    function animateFollower() {
        if (cursorFollower) {
            // Smooth follow with easing
            followerX += (mouseX - followerX) * 0.05;
            followerY += (mouseY - followerY) * 0.05;
            
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        }
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Make stars occasionally follow cursor
    const stars = document.querySelectorAll('.signal-particle');
    
    document.addEventListener('mousemove', (e) => {
        // Randomly select some particles to follow cursor
        if (Math.random() > 0.95) {
            const randomStar = stars[Math.floor(Math.random() * stars.length)];
            if (randomStar) {
                randomStar.style.transition = 'transform 2s ease-out';
                randomStar.style.transform = `translate(${e.clientX - parseInt(randomStar.style.left)}px, ${e.clientY}px)`;
                
                // Reset after animation
                setTimeout(() => {
                    randomStar.style.transition = '';
                    randomStar.style.transform = '';
                }, 2000);
            }
        }
    });
}


// Loyalty Journey
function initializeLoyaltyJourney() {
    // Simply observe the nodes for visibility animation
    const journeyNodes = document.querySelectorAll('.journey-node');
    
    if (!journeyNodes.length) return; // Exit if no journey nodes found
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-visible', 'true');
                // Add staggered animation delay
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
                
                // Create connecting line
                const line = document.createElement('div');
                line.classList.add('journey-connection');
                line.style.position = 'absolute';
                line.style.top = `${currentRect.top + currentRect.height / 2}px`;
                line.style.left = `${currentRect.left + currentRect.width / 2}px`;
                line.style.width = `${nextRect.left - currentRect.left}px`;
                line.style.height = '2px';
                line.style.background = 'var(--accent-gold)';
                line.style.opacity = '0.3';
                line.style.transformOrigin = 'left center';
                line.style.transform = 'scaleX(0)';
                line.style.transition = 'transform 1s ease';
                
                document.body.appendChild(line);
                
                // Animate line when nodes become visible
                const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        setTimeout(() => {
                            line.style.transform = 'scaleX(1)';
                        }, 500);
                });
                
                observer.observe(node);
            }
        }
    });
}

// Constellation Background for Hero Section
function initializeConstellationBackground() {
    const constellationStars = document.querySelector('.constellation-stars');
    const constellationLines = document.querySelector('.constellation-lines');
    
    if (!constellationStars || !constellationLines) return;
    
    // Clear existing stars and lines
    constellationStars.innerHTML = '';
    constellationLines.innerHTML = '';
    
    // Create stars
    const starCount = 30; // Reduced number of stars
    const starPositions = [];
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Some stars are brighter
        if (Math.random() > 0.7) {
            star.classList.add('bright');
        }
        
        // Some stars twinkle
        if (Math.random() > 0.5) {
            star.classList.add('twinkle');
            star.style.animationDelay = `${Math.random() * 4}s`;
        }
        
        // Add subtle movement animation
        star.style.animation = `starFloat ${20 + Math.random() * 10}s ease-in-out infinite alternate`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        constellationStars.appendChild(star);
        
        // Store position for line creation
        starPositions.push({ x, y, element: star });
    }
    
    // Create constellation lines - fewer lines
    const lineCount = 8; // Reduced number of lines
    
    for (let i = 0; i < lineCount; i++) {
        // Pick two random stars that are somewhat close to each other
        let star1, star2;
        let attempts = 0;
        let validPair = false;
        
        while (!validPair && attempts < 20) {
            star1 = starPositions[Math.floor(Math.random() * starPositions.length)];
            star2 = starPositions[Math.floor(Math.random() * starPositions.length)];
            
            // Calculate distance between stars
            const dx = star2.x - star1.x;
            const dy = star2.y - star1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Only connect stars that are somewhat close but not too close
            if (distance > 10 && distance < 40 && star1 !== star2) {
                validPair = true;
            }
            
            attempts++;
        }
        
        if (!validPair) continue;
        
        // Calculate line properties
        const dx = star2.x - star1.x;
        const dy = star2.y - star1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        // Create line
        const line = document.createElement('div');
        line.classList.add('constellation-line');
        line.style.width = `${distance}%`;
        line.style.left = `${star1.x}%`;
        line.style.top = `${star1.y}%`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.opacity = '0.3';
        line.style.animation = `linePulse ${5 + Math.random() * 5}s ease-in-out infinite alternate`;
        
        constellationLines.appendChild(line);
    }
    
    // Add floating dots
    for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div');
        dot.classList.add('floating-dot');
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        dot.style.left = `${x}%`;
        dot.style.top = `${y}%`;
        dot.style.width = `${1 + Math.random() * 2}px`;
        dot.style.height = dot.style.width;
        
        // Animation
        dot.style.animation = `dotFloat ${30 + Math.random() * 20}s linear infinite`;
        dot.style.animationDelay = `${Math.random() * 10}s`;
        
        constellationStars.appendChild(dot);
    }
}

// Text Highlighting on Scroll
function initializeTextHighlighting() {
    const highlightElements = document.querySelectorAll('.highlight-text');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When element enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Remove active class after element is no longer in focus
                setTimeout(() => {
                    if (!isElementInViewport(entry.target)) {
                        entry.target.classList.remove('active');
                    }
                }, 2000);
            } else {
                // When element leaves viewport
                entry.target.classList.remove('active');
            }
        });
    }, {
        root: null,
        rootMargin: '-10% 0px -10% 0px', // Trigger when element is 10% inside viewport
        threshold: 0.1
    });
    
    // Observe all highlight elements
    highlightElements.forEach(element => {
        observer.observe(element);
    });
    
    // Also update on scroll for smoother transitions
    window.addEventListener('scroll', () => {
        highlightElements.forEach(element => {
            if (isElementInViewport(element, 0.5)) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    });
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el, threshold = 0.1) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Element is considered in viewport if it's at least threshold% visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const elementHeight = rect.bottom - rect.top;
        
        return visibleHeight / elementHeight > threshold;
    }
}

// Handle visibility change (pause animations when tab is not visible)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations
        document.querySelectorAll('[class*="animate"]').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations
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
    // In production, send to error tracking service
});
