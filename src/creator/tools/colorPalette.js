const colors = [
    "#000000", // ♦ 000,000,000 #000000
    "#FFFFFF", // ♦ 255,255,255 #FFFFFF
    "#808080", // ♦ 128,128,128 #808080
    "#C0C0C0", // ♦ 192,192,192 #C0C0C0
    "#FF0000", // ♦ 255,000,000 #FF0000
    "#800000", // ♦ 128,000,000 #800000
    "#FFFF00", // ♦ 255,255,000 #FFFF00
    "#808000", // ♦ 128,128,000 #808000
    "#00FF00", // ♦ 000,255,000 #00FF00
    "#008000", // ♦ 000,128,000 #008000
    "#00FFFF", // ♦ 000,255,255 #00FFFF
    "#008080", // ♦ 000,128,128 #008080
    "#0000FF", // ♦ 000,000,255 #0000FF
    "#000080", // ♦ 000,000,128 #000080
    "#FF00FF", // ♦ 255,000,255 #FF00FF
    "#800080", // ♦ 128,000,128 #800080
    "#FFFF80", // ♦ 255,255,128 #FFFF80
    "#808040", // ♦ 128,128,064 #808040
    "#00FF80", // ♦ 000,255,128 #00FF80
    "#004040", // ♦ 000,064,064 #004040
    "#80FFFF", // ♦ 128,255,255 #80FFFF
    "#0080FF", // ♦ 000,128,255 #0080FF
    "#8080FF", // ♦ 128,128,255 #8080FF
    "#004080", // ♦ 000,064,128 #004080
    "#FF0080", // ♦ 255,000,128 #FF0080
    "#8000FF", // ♦ 128,000,255 #8000FF
    "#FF8040", // ♦ 255,128,064 #FF8040
    "#804000" // ♦ 128,064,000 #804000
];

function setupColorButtons(colors) {
    const container = document.querySelector('.colors');
    container.className = 'color-grid';

    colors.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-button';
        button.style.backgroundColor = color;
        button.dataset.color = color;

        // Event listener to change the brush color and highlight the button
        button.addEventListener('click', function() {
            // Remove highlight from all buttons
            document.querySelectorAll('.color-button').forEach(btn => {
                btn.classList.remove('selected');
            });

            // Highlight the selected button
            this.classList.add('selected');

            // Change the brush color
            brushColor = color;
        });

        container.appendChild(button);
    });
}


window.onload = function() {
    setupColorButtons(colors);
};