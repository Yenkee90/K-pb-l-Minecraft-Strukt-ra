document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    const nextButton = document.getElementById('nextButton');
    const pixelatedCanvas = document.getElementById('pixelatedCanvas');
    const ctx = pixelatedCanvas.getContext('2d');
    const imageContainer = document.querySelector('.image-container');
    const selectedPixels = new Set(); // Kijelölt pixelek koordinátáinak tárolására

    let pixelSize = 10; // A "pixel" mérete

    imageUpload.addEventListener('change', (event) => {
        // ... (a korábbi képfeltöltés kezelő kódja) ...
    });

    nextButton.addEventListener('click', () => {
        const img = new Image();
        img.onload = function() {
            const width = img.width;
            const height = img.height;
            const scaledWidth = Math.floor(width / pixelSize);
            const scaledHeight = Math.floor(height / pixelSize);

            pixelatedCanvas.width = scaledWidth;
            pixelatedCanvas.height = scaledHeight;
            pixelatedCanvas.style.width = `${scaledWidth * pixelSize}px`;
            pixelatedCanvas.style.height = `${scaledHeight * pixelSize}px`;
            pixelatedCanvas.style.display = 'block';
            imageContainer.style.display = 'none';

            ctx.drawImage(img, 0, 0, width, height, 0, 0, scaledWidth, scaledHeight);

            ctx.clearRect(0, 0, scaledWidth, scaledHeight);
            for (let y = 0; y < scaledHeight; y++) {
                for (let x = 0; x < scaledWidth; x++) {
                    const pixelData = ctx.getImageData(x, y, 1, 1).data;
                    ctx.fillStyle = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3]})`;
                    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                }
            }

            nextButton.textContent = 'Tovább a 3D-hez'; // Gomb szövegének megváltoztatása
            nextButton.removeEventListener('click', this); // Eltávolítjuk a pixelesítő eseménykezelőt
            nextButton.addEventListener('click', generate3DStructure); // Hozzáadjuk a 3D generáló eseménykezelőt

            // Kijelölés eseménykezelő hozzáadása a canvashoz
            pixelatedCanvas.addEventListener('click', selectPixel); // Egérkattintás
            pixelatedCanvas.addEventListener('touchstart', (e) => { // Érintés
                e.preventDefault(); // Megakadályozza az alapértelmezett érintési viselkedést
                const touch = e.touches[0];
                const rect = pixelatedCanvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                selectPixel({ offsetX: x, offsetY: y }); // Szimuláljuk a kattintást
            });
        };
        img.src = uploadedImage.src;
    });

    function getPixelCoordinates(offsetX, offsetY) {
        const pixelX = Math.floor(offsetX / pixelSize);
        const pixelY = Math.floor(offsetY / pixelSize);
        return `${pixelX}-${pixelY}`;
    }

    function selectPixel(event) {
        const pixelCoordinates = getPixelCoordinates(event.offsetX, event.offsetY);
        const [pixelX, pixelY] = pixelCoordinates.split('-').map(Number);

        if (pixelX >= 0 && pixelX < pixelatedCanvas.width && pixelY >= 0 && pixelY < pixelatedCanvas.height) {
            if (selectedPixels.has(pixelCoordinates)) {
                selectedPixels.delete(pixelCoordinates); // Kijelölés visszavonása
                redrawPixel(pixelX, pixelY, false);
            } else {
                selectedPixels.add(pixelCoordinates); // Pixel kijelölése
                redrawPixel(pixelX, pixelY, true);
            }
        }
    }

    function redrawPixel(x, y, isSelected) {
        const imageData = ctx.getImageData(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        const data = imageData.data;
        const highlightColor = { r: 255, g: 0, b: 0, a: 255 }; // Piros kiemelés

        for (let i = 0; i < data.length; i += 4) {
            if (isSelected) {
                data[i] = highlightColor.r;
                data[i + 1] = highlightColor.g;
                data[i + 2] = highlightColor.b;
                data[i + 3] = highlightColor.a;
            } else {
                // Visszaállítjuk az eredeti színt (ezt bonyolultabb lenne pontosan megtenni)
                // Egy egyszerűbb megoldás lehet a teljes kép újrarajzolása a kijelölt pixelekkel
                const originalImageData = ctx.getImageData(Math.floor(x * pixelSize / pixelSize) * pixelSize, Math.floor(y * pixelSize / pixelSize) * pixelSize, pixelSize, pixelSize);
                for (let j = 0; j < data.length; j += 4) {
                    data[j] = originalImageData.data[j];
                    data[j + 1] = originalImageData.data[j + 1];
                    data[j + 2] = originalImageData.data[j + 2];
                    data[j + 3] = originalImageData.data[j + 3];
                }
            }
        }
        ctx.putImageData(imageData, x * pixelSize, y * pixelSize);
    }

    function generate3DStructure() {
        if (selectedPixels.size > 0) {
            alert(`A kijelölt pixelek száma: ${selectedPixels.size}. Itt fogjuk generálni a 3D struktúrát!`);
            // Következő lépés: a kijelölt pixelek alapján 3D struktúra generálása
        } else {
            alert('Kérlek előbb jelöld ki a struktúrát a bepixelesített képen!');
        }
    }
});
