document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 1;
    const TOTAL_ITEMS = 7; 
    
    function changeCarousel() {
        document.getElementById(`carousel-${currentIndex}`).checked = false;

        currentIndex = (currentIndex % TOTAL_ITEMS) + 1;

        document.getElementById(`carousel-${currentIndex}`).checked = true;
    }

    setInterval(changeCarousel, 5000);
});
