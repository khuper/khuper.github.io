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

// Poll functionality
document.addEventListener('DOMContentLoaded', function() {
    const pollOptions = document.querySelectorAll('.poll-option');
    
    pollOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Check if user has already voted
            const hasVoted = localStorage.getItem('moviePollVoted');
            
            if (!hasVoted) {
                // Get current votes
                const movieId = this.dataset.movie;
                
                // Simulate API call to record vote
                // In a real implementation, you'd send this to your server
                console.log(`Vote recorded for ${movieId}`);
                
                // Mark as voted
                localStorage.setItem('moviePollVoted', movieId);
                this.classList.add('voted');
                
                // Update percentages (in a real app, these would come from the server)
                updatePollResults();
                
                // Show success message
                alert('Thanks for voting! Check back later for the final results.');
            } else {
                alert('You have already voted in this poll!');
            }
        });
        
        // Add hover effect to show which one user is about to vote for
        option.addEventListener('mouseenter', function() {
            this.querySelector('.poll-overlay').style.opacity = '1';
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('voted')) {
                this.querySelector('.poll-overlay').style.opacity = '0';
            }
        });
    });
    
    function updatePollResults() {
        // In a real app, you would fetch these values from your server
        // This is just for demonstration
        const results = {
            'furiosa': '35%',
            'alien-romulus': '22%',
            'gladiator-2': '18%',
            'bad-boys': '15%',
            'inside-out-2': '10%'
        };
        
        pollOptions.forEach(option => {
            const movieId = option.dataset.movie;
            const percentage = results[movieId].replace('%', '');
            
            option.querySelector('.poll-bar').style.width = results[movieId];
            option.querySelector('.poll-percentage').textContent = results[movieId];
        });
    }
});

