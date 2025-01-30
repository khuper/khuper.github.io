document.addEventListener('DOMContentLoaded', function() {
    // Snow cursor trail effect
    window.addEventListener('mousemove', function(e) {
        const snowflakes = [1, 0.8, 0.6, 0.4, 0.2];
        
        snowflakes.forEach(function(opacity) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.top = e.pageY + 'px';
            snowflake.style.left = e.pageX + 'px';
            snowflake.style.opacity = opacity;
            
            const size = Math.random() * 4 + 2; // 2-6px
            snowflake.style.width = size + 'px';
            snowflake.style.height = size + 'px';
            
            document.body.appendChild(snowflake);

            setTimeout(function() {
                snowflake.remove();
            }, Math.random() * 1500);
        });
    }, false);

    // Image enlargement functionality
    document.querySelectorAll('#gallery img').forEach(img => {
        img.addEventListener('click', () => {
            img.classList.toggle('enlarged');
        });
    });
});
