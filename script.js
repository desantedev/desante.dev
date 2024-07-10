let logo = document.getElementById('logo-image');
let canvas = document.getElementById('confetti-canvas');

canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });

const FIREWORK_EXPLOSION_COUNT = 10;

let clickCount = 0;
let explosionDebounce = false;

function mouse_stopped() {
    logo.style.transition="transform 500ms cubic-bezier(0.510, 1.580, 0.865, 1.290)";
    logo.style.transform = `rotateX(0deg) rotateY(0deg)`;
}

let debouce;
addEventListener("mousemove", (event) => {

    clearTimeout(debouce);

    const CURSOR_X = event.clientX;
    const CURSOR_Y = event.clientY;

    const CLIENT_WIDTH = canvas.offsetWidth;
    const CLIENT_HEIGHT = canvas.offsetHeight;

    const NORMALIZED_VERT = (CURSOR_X - (CLIENT_WIDTH / 2)) / (CLIENT_WIDTH / 2)
    const NORMALIZED_HORZ = (CURSOR_Y - (CLIENT_HEIGHT / 2)) / (CLIENT_HEIGHT / 2)
    
    const MAX_ROTATION = {
        horz: 45,
        vert: 30
    }

    logo.style.transition="transform 100ms linear";
    logo.style.transform = `rotateX(${(NORMALIZED_HORZ * MAX_ROTATION.horz) * -1}deg) rotateY(${NORMALIZED_VERT * MAX_ROTATION.vert}deg)`;

    debouce = setTimeout(mouse_stopped, 500)
});

logo.addEventListener("click", (event) => {
    
    clickCount++;

    const CLIENT_WIDTH = canvas.offsetWidth;
    const CLIENT_HEIGHT = canvas.offsetHeight;

    const confettiProperties = {
        startVelocity: 20,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount: 100,
    }

    canvas.confetti({
        ...confettiProperties,
        origin: {
            x: (event.clientX + window.scrollX) / CLIENT_WIDTH,     // Added window.scrollX for completnessfhadfh
            y: (event.clientY + window.scrollY) / CLIENT_HEIGHT     // Added window.scrollY to account for the offset created when the user scrolls down
        }
    });

    if (clickCount >= 10) {
        
        if(explosionDebounce) {
            return; // For your own safety... Removal means death by confetti.
        }

        clickCount = 0;
        explosionDebounce = true;
        let explosions = 0;
        
        // Start fireworks
        let interval = setInterval(() => {
            
            if (explosions >= 10) {
                clearInterval(interval);
                explosionDebounce = false;
            }

            canvas.confetti({
                ...confettiProperties,
                origin: {
                    x: Math.random() * (0.9 - 0.1) + 0.1,
                    y: Math.random() * (0.8 - 0.2) + 0.2
                }
            });
            explosions++;
        }, 400);
    }
})