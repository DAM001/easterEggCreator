function saveImage() {
    const canvas = document.getElementById('canvas'); // Ensure your canvas has the ID 'canvas'
    const imageName = document.getElementById('name').value.trim();
    const imageData = canvas.toDataURL("image/png").replace(/^data:image\/\w+;base64,/, "");

    if (!imageName) {
        alert('Please enter a name for your egg.');
        return;
    }

    fetch('./backend/server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(imageName)}&image=${encodeURIComponent(imageData)}`
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error saving your creation.');
        });
}