const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let painting = false;

function startPosition(e) {
    painting = true;
    if (e.touches) e.preventDefault(); // Prevent scrolling on touch devices
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    // Prevent the default action to avoid potential issues with touch devices
    e.preventDefault();

    // Get the bounding rectangle of the canvas
    const rect = canvas.getBoundingClientRect();

    // Calculate the correct mouse or touch position accounting for scrolling
    let x, y;
    if (e.touches) {
        // For touch events
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        // For mouse events
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }

    // Adjust the coordinates considering the canvas might be scaled by CSS
    x *= canvas.width / rect.width;
    y *= canvas.height / rect.height;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    // Ensure drawing operations use the updated position
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}


// Add touch event listeners
canvas.addEventListener('touchstart', startPosition, { passive: false });
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw, { passive: false });

// Existing mouse event listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);