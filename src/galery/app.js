fetch('./backend/loadImages.php')
    .then(response => response.json())
    .then(imagePaths => {
        const gallery = document.getElementById('galery');
        imagePaths.forEach(imagePath => {
            // Create the block element
            const blockDiv = document.createElement('div');
            blockDiv.className = 'block';

            // Extract the image name from the path
            const imageName = imagePath.split('/').pop().split('.')[0]; // Adjust this line if the path format changes

            // Replace underscores or hyphens with spaces and capitalize each word for the title
            const imageTitle = imageName.replace(/[_-]/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            // Create the title element
            const titleH2 = document.createElement('h2');
            titleH2.textContent = imageTitle; // Use the file name as the title

            // Create the image element
            const imgElement = document.createElement('img');
            imgElement.src = imagePath; // Set the source to the image path
            imgElement.alt = imageTitle; // Use the title as alt text for accessibility

            const imgCont = document.createElement('div')
            imgCont.className = 'img-cont'
            imgCont.append(imgElement)

            // Assemble the block
            blockDiv.appendChild(titleH2);
            blockDiv.appendChild(imgCont);

            // Append the block to the gallery
            gallery.appendChild(blockDiv);
        });
    })
    .catch(error => console.error('Error fetching images:', error));


function openEditor() {
    window.location.href = './creator.html';
}