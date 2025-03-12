// Auto Scroll Carousel
(function(){
  let timing = 3; // transition every 3 seconds
  let direction = 1; // 1 = forwards, 0 = backwards
  
  function AutoScrollCarousel(element){
    let interval;
    let intervalTime = 1000 * timing;
    let isPaused = false;
    let isVisible = true;
    let navButtons = element.querySelectorAll('button[class*="__arrow-button"]');
    
    function startInterval() {
      interval = setInterval(moveCarousel, intervalTime);
    }
    
    function moveCarousel() {
      if (!isPaused && isVisible) {
        navButtons[direction].click();
      }
    }
    
    // Pause on user interaction
    ["mousedown", "touchstart"].forEach(event => {
      element.addEventListener(event, function() {
        isPaused = true;
      });
    });
    
    // Resume after user interaction
    ["mouseup", "touchend"].forEach(event => {
      element.addEventListener(event, function() {
        isPaused = false;
        clearInterval(interval);
        startInterval();
      });
    });
    
    // Start the carousel
    if (navButtons[direction]) {
      startInterval();
    }
  }
  
  window.addEventListener("load", function() {
    const carousel = document.querySelector(".carousel-container"); // Update with your carousel's class
    new AutoScrollCarousel(carousel);
  });
})();
