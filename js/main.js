// ----------- Show Videos ---------
document.addEventListener("DOMContentLoaded", function () {
    const videoButtons = document.querySelectorAll(".video__button");
    const videoThumbnail = document.querySelector(".video__thumbnail");
    const modal = document.createElement("div");
    modal.classList.add("video-modal");
    modal.innerHTML = `
      <div class="video-modal__overlay"></div>
      <div class="video-modal__content">
        <button class="video-modal__close">&times;</button>
        <iframe class="video-modal__iframe" frameborder="0" allowfullscreen></iframe>
      </div>
    `;
    document.body.appendChild(modal);
    const modalOverlay = modal.querySelector(".video-modal__overlay");
    const modalClose = modal.querySelector(".video-modal__close");
    const modalIframe = modal.querySelector(".video-modal__iframe");
    const videoUrls = [
        "https://www.youtube.com/embed/41xLXUZtoq8",
        "https://www.youtube.com/embed/BkKn4IVrHjU",
    ];
    let currentVideo = videoUrls[0];
    function changeVideo(videoUrl) {
        currentVideo = videoUrl;
        videoThumbnail.querySelector("img").src = `https://img.youtube.com/vi/${videoUrl.split('/').pop()}/hqdefault.jpg`;
    }
    videoButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            changeVideo(videoUrls[index]);
        });
    });
    videoThumbnail.addEventListener("click", function () {
        modal.classList.add("active");
        modalIframe.src = currentVideo + "?autoplay=1";
    });
    function closeModal() {
        modal.classList.remove("active");
        modalIframe.src = "";
    }

    modalOverlay.addEventListener("click", closeModal);
    modalClose.addEventListener("click", closeModal);
});


//------Responsive Slider -----------


document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.membership-plans__cards');
    const cards = document.querySelectorAll('.pricing-card');
    let currentIndex = 0;
    let isSliderActive = false;

    const createSliderNavigation = () => {
        const navContainer = document.createElement('div');
        navContainer.className = 'slider-navigation';

        const prevButton = document.createElement('button');
        prevButton.className = 'slider-button slider-button--prev';
        prevButton.innerHTML = '&lt;';
        prevButton.addEventListener('click', () => navigateSlider('prev'));

        const nextButton = document.createElement('button');
        nextButton.className = 'slider-button slider-button--next';
        nextButton.innerHTML = '&gt;';
        nextButton.addEventListener('click', () => navigateSlider('next'));

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';

        cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => navigateSlider(index));
            dotsContainer.appendChild(dot);
        });

        navContainer.appendChild(prevButton);
        navContainer.appendChild(dotsContainer);
        navContainer.appendChild(nextButton);

        return navContainer;
    };

    const navigateSlider = (direction) => {
        if (!isSliderActive) return;

        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        } else if (direction === 'next') {
            currentIndex = (currentIndex + 1) % cards.length;
        } else if (typeof direction === 'number') {
            currentIndex = direction;
        }

        updateSlider();
    };
    const updateSlider = () => {
        if (!isSliderActive) return;

        cards.forEach((card, index) => {
            card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });

        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };
    const handleResize = () => {
        const shouldBeSlider = window.innerWidth <= 663;

        if (shouldBeSlider && !isSliderActive) {
            isSliderActive = true;
            cardsContainer.classList.add('slider-active');

            cards.forEach((card, index) => {
                card.style.position = 'absolute';
                card.style.left = '0';
                card.style.width = '100%';
                card.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
                card.style.transition = 'transform 0.5s ease';
            });

            if (!document.querySelector('.slider-navigation')) {
                const nav = createSliderNavigation();
                cardsContainer.parentNode.insertBefore(nav, cardsContainer.nextSibling);
            }
        } else if (!shouldBeSlider && isSliderActive) {
            isSliderActive = false;
            cardsContainer.classList.remove('slider-active');
            cards.forEach(card => {
                card.style.position = '';
                card.style.left = '';
                card.style.width = '';
                card.style.transform = '';
                card.style.transition = '';
            });

            const nav = document.querySelector('.slider-navigation');
            if (nav) nav.remove();
        }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
});