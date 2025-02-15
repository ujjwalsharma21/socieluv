document.addEventListener('DOMContentLoaded', () => {
    // Countdown Initialization
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 90);
    launchDate.setHours(0, 0, 0, 0);

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const difference = launchDate - now;

        if (difference <= 0) {
            [daysElement, hoursElement, minutesElement, secondsElement].forEach(el => {
                el.textContent = '00';
            });
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        animateValue(daysElement, parseInt(daysElement.textContent), days);
        animateValue(hoursElement, parseInt(hoursElement.textContent), hours);
        animateValue(minutesElement, parseInt(minutesElement.textContent), minutes);
        animateValue(secondsElement, parseInt(secondsElement.textContent), seconds);
    }

    function animateValue(element, start, end) {
        if (start === end) return;
        
        const range = end - start;
        let current = start;
        const increment = end > start ? 1 : -1;
        const stepTime = 50;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = current.toString().padStart(2, '0');
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Particle System
    function initParticleSystem() {
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.color = `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random() * 0.5})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }
        }

        const particlesArray = [];
        const particleCount = 200;

        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particlesArray.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Email Submission
    function setupEmailSubmission() {
        const emailInput = document.querySelector('.email-input');
        const submitBtn = document.querySelector('.submit-btn');

        submitBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulated submission (replace with actual backend logic)
                gsap.to(submitBtn, {
                    scale: 1.1,
                    rotation: 360,
                    duration: 0.5,
                    onComplete: () => {
                        alert('🚀 You\'re on the exclusive early access list!');
                        emailInput.value = '';
                    }
                });
            } else {
                gsap.to(emailInput, {
                    x: [-10, 10, -10, 10, 0],
                    duration: 0.3,
                    ease: 'power1.inOut'
                });
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Initialize all functions
    function init() {
        updateCountdown();
        setInterval(updateCountdown, 1000);
        initParticleSystem();
        setupEmailSubmission();
    }

    init();
});