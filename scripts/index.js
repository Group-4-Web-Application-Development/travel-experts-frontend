const carouselSlide = document.getElementById('carousel-slide');
        const carouselItems = document.querySelectorAll('.carousel-item');
        let counter = 0;
        const size = carouselItems[0].clientWidth;

        // Move the carousel to the next slide
        document.getElementById('nextBtn').addEventListener('click', () => {
            if (counter >= carouselItems.length - 2) counter = -1; // Show only two items at a time
            counter++;
            carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        });

        // Move the carousel to the previous slide
        document.getElementById('prevBtn').addEventListener('click', () => {
            if (counter <= 0) counter = carouselItems.length - 2; // Show only two items at a time
            counter--;
            carouselSlide.style.transform = `translateX(${-size * counter}px)`;
        });

        // For smooth transitions
        carouselSlide.style.transition = 'transform 0.5s ease-in-out';