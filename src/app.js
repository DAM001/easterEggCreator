let brushColor = '#000';
let brushSize = 5;

document.getElementById('colorPicker').addEventListener('change', (e) => {
    brushColor = e.target.value;
});

document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
});

function drawEggShape() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const width = 300;
    const height = 350;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + height / 2);
    ctx.bezierCurveTo(centerX - width / 2, centerY + height / 2, centerX - width / 2, centerY - height / 2, centerX, centerY - height / 2);
    ctx.bezierCurveTo(centerX + width / 2, centerY - height / 2, centerX + width / 2, centerY + height / 2, centerX, centerY + height / 2);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke();
    ctx.clip();

    endPosition();
}

drawEggShape();