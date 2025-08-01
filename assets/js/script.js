// Slider Teacher

const swiper = new Swiper('.mySwiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    speed: 800,
    grabCursor: true,
    spaceBetween: -100,
    simulateTouch: true,
    touchRatio: 0.1,
    longSwipesMs: 500,
    longSwipesRatio: 0.3,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    on: {
        slideChangeTransitionEnd: updateZIndexes,
        init: function (swiper) {
            updateZIndexes(swiper);

        },
    }
});

function updateZIndexes(swiper) {
    swiper.slides.forEach((slide, index) => {
        const offset = Math.abs(swiper.activeIndex - index);

        slide.style.zIndex = 100 - offset;

        slide.classList.remove('is-active');
    });

    swiper.slides[swiper.activeIndex].classList.add('is-active');
}
// Video YouYube



document.querySelectorAll('.video-container').forEach(container => {
    const videoId = container.getAttribute('data-video-id');
    console.log('videoId for container:', videoId);
    container.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg')`;
});

function playVideo(container) {
    container.classList.add('playing');

    const videoId = container.getAttribute('data-video-id');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.frameBorder = 0;
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    container.innerHTML = ''; // Очищаємо лише цей контейнер
    container.appendChild(iframe); // Вставляємо відео
}

// Preloader

const preloader = document.querySelector('#preloader');
console.log('preloader:', preloader);
if (preloader) {
    console.log('preloader found');
    window.addEventListener('load', () => {
        preloader.remove();
    });
}

// scrollTop

const scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
    if (!scrollTop) return;
    if (window.scrollY > 100) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
}

// Викликаємо при прокрутці
window.addEventListener('scroll', toggleScrollTop);

// Клік — плавно скролить наверх
scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Викликати одразу, щоб кнопка відобразилась, якщо сторінка вже прокручена
toggleScrollTop();


// Burger

const burger = document.querySelector('.burger');
const navMenu = document.getElementById('navmenu');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});


// mobile click effect

document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const isExpanded = card.classList.contains('expanded');
        const body = card.querySelector('.card-body');

        if (!isExpanded) {
            card.style.maxHeight = card.scrollHeight + 'px';
            card.classList.add('expanded');
        } else {
            const isMobile = window.innerWidth <= 768; // змінюй як потрібно
            card.style.maxHeight = isMobile ? '90px' : '115px';
            card.classList.remove('expanded');
        }
    });
});