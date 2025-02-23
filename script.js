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
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update the countdown elements
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    // Background Image Setup
    function setupBackgroundImage() {
        const backgroundCanvas = document.getElementById('particle-canvas');
        const ctx = backgroundCanvas.getContext('2d');

        const desktopBackgroundImage = new Image();
        const mobileBackgroundImage = new Image();
        
        desktopBackgroundImage.src = 'background.jpg';
        mobileBackgroundImage.src = 'mobile.jpg';

        function resizeCanvas() {
            backgroundCanvas.width = window.innerWidth;
            backgroundCanvas.height = window.innerHeight;
        }

        function drawImage(image) {
            const scale = Math.max(
                backgroundCanvas.width / image.width, 
                backgroundCanvas.height / image.height
            );

            const scaledWidth = image.width * scale;
            const scaledHeight = image.height * scale;

            const centerX = (backgroundCanvas.width - scaledWidth) / 2;
            const centerY = (backgroundCanvas.height - scaledHeight) / 2;

            ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
            ctx.drawImage(image, centerX, centerY, scaledWidth, scaledHeight);
        }

        function selectAndDrawImage() {
            resizeCanvas();
            const isMobile = window.innerWidth <= 768;
            const imageToUse = isMobile ? mobileBackgroundImage : desktopBackgroundImage;

            if (imageToUse.complete) {
                drawImage(imageToUse);
            } else {
                imageToUse.onload = () => drawImage(imageToUse);
            }
        }

        selectAndDrawImage();
        window.addEventListener('resize', selectAndDrawImage);
    }

    // Email Submission
    function setupEmailSubmission() {
        const emailInput = document.querySelector('.email-input');
        const submitBtn = document.querySelector('.submit-btn');

        submitBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                alert('🚀 You\'re on the exclusive early access list!');
                emailInput.value = '';
            } else {
                emailInput.classList.add('error-shake');
                setTimeout(() => emailInput.classList.remove('error-shake'), 500);
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
        setupBackgroundImage();
        setupEmailSubmission();
    }

    init();
});
