<?php
$target_dir = "./images/";
$images = [];

// Open a directory, and read its contents
if (is_dir($target_dir)) {
    if ($dir = opendir($target_dir)) {
        while (($file = readdir($dir)) !== false) {
            if ($file != "." && $file != "..") {
                $images[] = "./backend/" . $target_dir . $file;
            }
        }
        closedir($dir);
    }
}

echo json_encode($images);
?>
