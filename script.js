document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    const nextButton = document.getElementById('nextButton');

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block'; // Kép megjelenítése
                nextButton.disabled = false; // Tovább gomb engedélyezése
            };
            reader.readAsDataURL(file);
        } else {
            uploadedImage.src = '#';
            uploadedImage.style.display = 'none'; // Kép elrejtése, ha nincs feltöltve
            nextButton.disabled = true; // Tovább gomb letiltása
        }
    });

    nextButton.addEventListener('click', () => {
        const currentImageSrc = uploadedImage.src;
        if (currentImageSrc && currentImageSrc !== '#') {
            // Ha van feltöltött kép, továbblépünk a következő fázisra
            alert('A következő lépés a kép bepixelesítése és az objektum kijelölése lesz!');
            // Itt majd a következő lépés kódja következik
        } else {
            alert('Kérlek előbb tölts fel egy képet!');
        }
    });
});
