document.querySelectorAll('#gallery img').forEach(img => {
    img.addEventListener('click', () => {
        img.classList.toggle('enlarged');
    });
});
