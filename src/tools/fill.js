function fillColor(startX, startY, fillColor) {
    // Get the image data for the entire canvas
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const stack = [
        [startX, startY]
    ];
    // Convert the fill color to RGBA from hex, assuming full opacity
    const color = hexToRgba(fillColor);
    const startColor = getPixel(startX, startY, width, pixels);
    // Check if start color is same as fill color
    if (colorsMatch(startColor, color)) return;

    while (stack.length) {
        let [x, y] = stack.pop();
        let pos = (y * width + x) * 4;

        while (y-- >= 0 && colorsMatch(getPixel(x, y, width, pixels), startColor)) {
            pos -= width * 4;
        }
        pos += width * 4;
        y++;
        let reachLeft = false;
        let reachRight = false;

        while (y++ < height && colorsMatch(getPixel(x, y, width, pixels), startColor)) {
            setPixel(pos, color, pixels);

            if (x > 0) {
                if (colorsMatch(getPixel(x - 1, y, width, pixels), startColor)) {
                    if (!reachLeft) {
                        stack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else if (reachLeft) {
                    reachLeft = false;
                }
            }

            if (x < width - 1) {
                if (colorsMatch(getPixel(x + 1, y, width, pixels), startColor)) {
                    if (!reachRight) {
                        stack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else if (reachRight) {
                    reachRight = false;
                }
            }

            pos += width * 4;
        }
    }

    // Put the modified image data back to the canvas
    ctx.putImageData(imageData, 0, 0);
}

function getPixel(x, y, width, pixels) {
    let pos = (y * width + x) * 4;
    return {
        r: pixels[pos],
        g: pixels[pos + 1],
        b: pixels[pos + 2],
        a: pixels[pos + 3]
    };
}

function setPixel(pos, color, pixels) {
    pixels[pos] = color.r;
    pixels[pos + 1] = color.g;
    pixels[pos + 2] = color.b;
    pixels[pos + 3] = color.a;
}

function colorsMatch(a, b, tolerance = 0) {
    return Math.abs(a.r - b.r) <= tolerance &&
        Math.abs(a.g - b.g) <= tolerance &&
        Math.abs(a.b - b.b) <= tolerance &&
        Math.abs(a.a - b.a) <= tolerance;
}

function hexToRgba(hex) {
    let r = 0,
        g = 0,
        b = 0,
        a = 255; // Default is opaque black
    if (hex.length == 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return { r, g, b, a };
}