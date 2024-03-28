const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let painting = false;
let brushColor = '#000';
let brushSize = 5;

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
    let clientX, clientY;
    if (e.touches) { // Check if it's a touch event
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else { // Mouse event
        clientX = e.clientX;
        clientY = e.clientY;
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
}

// Add touch event listeners
canvas.addEventListener('touchstart', startPosition, { passive: false });
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw, { passive: false });

// Existing mouse event listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

document.getElementById('colorPicker').addEventListener('change', (e) => {
    brushColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
});

function drawEggShape() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const width = 300; // Adjust for egg width
    const height = 350; // Adjust for egg height

    ctx.save(); // Save the current state to restore later if needed
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + height / 2);
    ctx.bezierCurveTo(centerX - width / 2, centerY + height / 2, centerX - width / 2, centerY - height / 2, centerX, centerY - height / 2);
    ctx.bezierCurveTo(centerX + width / 2, centerY - height / 2, centerX + width / 2, centerY + height / 2, centerX, centerY + height / 2);
    ctx.closePath();
    ctx.stroke();
    ctx.clip();

    endPosition();
}

drawEggShape();