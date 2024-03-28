<?php
$target_dir = "./images/";

if (isset($_POST['image']) && isset($_POST['name'])) {
    $imageName = preg_replace('/[^a-zA-Z0-9_-]/', '', $_POST['name']); // Basic sanitization
    $filePath = $target_dir . $imageName . ".png";

    // Check if the file already exists
    if (file_exists($filePath)) {
        echo json_encode(['message' => 'An image with this name already exists. Please choose a different name.']);
    } else {
        $imageData = base64_decode($_POST['image']);
        if (file_put_contents($filePath, $imageData)) {
            echo json_encode(['message' => 'Image saved successfully.']);
        } else {
            echo json_encode(['message' => 'Failed to save image.']);
        }
    }
} else {
    echo json_encode(['message' => 'No image data or name provided.']);
}
?>
