document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    const nextButton = document.getElementById('nextButton');
    const pixelatedCanvas = document.getElementById('pixelatedCanvas');
    const ctx = pixelatedCanvas.getContext('2d');

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block';
                nextButton.disabled = false;
            };
            reader.readAsDataURL(file);
        } else {
            uploadedImage.src = '#';
            uploadedImage.style.display = 'none';
            nextButton.disabled = true;
            pixelatedCanvas.style.display = 'none'; // Canvas elrejtése is
        }
    });

    nextButton.addEventListener('click', () => {
        const img = new Image();
        img.onload = function() {
            const width = img.width;
            const height = img.height;
            const pixelSize = 10; // A "pixel" mérete (állítható)
            const scaledWidth = Math.floor(width / pixelSize);
            const scaledHeight = Math.floor(height / pixelSize);

            pixelatedCanvas.width = scaledWidth;
            pixelatedCanvas.height = scaledHeight;
            pixelatedCanvas.style.width = `${scaledWidth * pixelSize}px`;
            pixelatedCanvas.style.height = `${scaledHeight * pixelSize}px`;
            pixelatedCanvas.style.display = 'block'; // Canvas megjelenítése

            ctx.drawImage(img, 0, 0, width, height, 0, 0, scaledWidth, scaledHeight);

            // Rajzoljuk a "pixelesített" képet a nagyobb méretű canvasra
            ctx.clearRect(0, 0, scaledWidth, scaledHeight);
            for (let y = 0; y < scaledHeight; y++) {
                for (let x = 0; x < scaledWidth; x++) {
                    const pixelData = ctx.getImageData(x, y, 1, 1).data;
                    ctx.fillStyle = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`;
                    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                }
            }

            alert('A kép bepixelesítve. A következő lépés az objektum kijelölése lesz!');
            // Itt majd a következő lépés kódja következik a kijelöléshez
        };
        img.src = uploadedImage.src;
    });
});
