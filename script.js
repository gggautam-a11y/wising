
document.addEventListener('DOMContentLoaded', () => {
    const legHero = document.getElementById('leg-hero');
    const legContainer = document.getElementById('leg-container');
    const modal = document.getElementById('get-well-modal');
    const mainContent = document.getElementById('main-content');
    const virtualHugBtn = document.getElementById('virtual-hug-btn');
    const sillyGifBtn = document.getElementById('silly-gif-btn');
    const soundToggle = document.getElementById('sound-toggle');
    const shareBtn = document.getElementById('share-btn');

    // --- State & Utility ---
    let soundOn = true;
    const chimeSound = new Audio('yeah-boiii-i-i-i.mp3'); // Replace with your soft sound file
    const sillyGifURL = 'https://giphy.com/gifs/foot-and-heel-injuries-information-center-26FPyTeQa90VpAAQ8'; // Replace with a hosted GIF URL

    // --- Micro-interactions & Animations ---

    // 1. Leg 'Boop' on Hover/Click
    const handleLegInteraction = () => {
        // Stop any current animation to apply the bounce
        legHero.style.animation = 'none';
        legHero.classList.add('boop-bounce');

        if (soundOn) {
            chimeSound.play().catch(e => console.log("Sound failed to play:", e));
        }

        // Remove the class after the transition/animation duration to reset
        setTimeout(() => {
            legHero.classList.remove('boop-bounce');
            // Re-apply the subtle wiggle animation
            legHero.style.animation = 'wiggle 2s ease-in-out infinite alternate';
        }, 300); // Must match the CSS transition time for the bounce
    };

    legContainer.addEventListener('mouseenter', handleLegInteraction);
    legContainer.addEventListener('touchstart', handleLegInteraction); // For mobile

    // 2. Subtle Floating Animation (Confetti/Hearts)
    const createFloatingItem = (container) => {
        const item = document.createElement('div');
        item.classList.add('confetti-item');
        if (Math.random() > 0.5) item.classList.add('heart');

        // Random position and delay for a natural fall effect
        item.style.left = `${Math.random() * 100}%`;
        item.style.animationDelay = `-${Math.random() * 20}s`; // Start some mid-fall

        container.appendChild(item);
    };

    const startFloatingAnimation = (count) => {
        // Create a dedicated container for the floating elements
        let confettiLayer = document.querySelector('.confetti-layer');
        if (!confettiLayer) {
            confettiLayer = document.createElement('div');
            confettiLayer.classList.add('confetti-layer');
            document.body.appendChild(confettiLayer);
        }

        for (let i = 0; i < count; i++) {
            createFloatingItem(confettiLayer);
        }
    };

    // Start the subtle background float immediately
    startFloatingAnimation(25);


    // --- Button Actions ---

    // 'Send a virtual hug' button: Triggers the heart animation burst
    virtualHugBtn.addEventListener('click', () => {
        alert("Hug Sent! Feel the love!"); // Simple confirmation
        // A temporary burst of floating hearts/confetti
        startFloatingAnimation(5);
    });

    // 'See a silly GIF' button: Opens a new window/tab with the GIF
    sillyGifBtn.addEventListener('click', () => {
        window.open(sillyGifURL, '_blank');
        // You could also create a temporary image popup here
    });

    // --- Modal Logic ---

    // 3. Final Panel: Center-screen modal after a few seconds
    const showFinalMessage = () => {
        // Add a class to hide the main content if desired, or just show the modal
        mainContent.style.filter = 'blur(5px)';
        modal.classList.remove('hidden');
    };

    // Show the modal after 5 seconds
    setTimeout(showFinalMessage, 5000);


    // --- Accessibility & Extras ---

    // Sound Toggle
    soundToggle.addEventListener('click', () => {
        soundOn = !soundOn;
        soundToggle.textContent = soundOn ? '🔇 Turn sound off' : '🔊 Turn sound on';
        soundToggle.setAttribute('aria-label', soundOn ? 'Turn sound off' : 'Turn sound on');
        // Note: The chimeSound.play() check handles sound being off for the interaction
    });

    // Social-safe Share Button (Pre-fills a message for copy/paste)
    shareBtn.addEventListener('click', () => {
        const shareText = "Hey [SHANU]! Stop messing with that leg — get well soon! 💖 Check out your cute troll page: [Your Page URL]";

        // Use the modern Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'Get Well Soon, Bestie!',
                text: shareText,
                url: window.location.href,
            }).catch(error => console.log('Error sharing', error));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('The "Get Well Soon" message has been copied to your clipboard! Paste it to Shanu!');
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        }
    });

});