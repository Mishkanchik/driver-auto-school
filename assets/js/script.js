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
const swiperContainer = document.querySelector('.mySwiper');

const swiperObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            swiper.autoplay.start();
        } else {
            swiper.autoplay.stop();
        }
    });
}, {
    threshold: 0.3 // 30% слайдера має бути видно
});

if (swiperContainer) {
    swiperObserver.observe(swiperContainer);
}

// Car Slider

document.addEventListener('DOMContentLoaded', function () {
    var main = new Splide('#car-main-slider', {
        type: 'fade',
        heightRatio: 0.5,
        pagination: false,
        autoplay: true,
        interval: 4000,
        rewind: true,
        pauseOnHover: true,
        pauseOnFocus: true,
        arrows: true,
        cover: true,
    });

    var thumbnails = new Splide('#car-thumbnail-slider', {
        fixedWidth: 100,
        fixedHeight: 75,
        isNavigation: true,
        gap: 10,
        focus: 'center',

        pagination: false,
        cover: true,
        arrows: false,
        breakpoints: {
            600: {
                fixedWidth: 66,
                fixedHeight: 50,
            },
        },
    });

    main.sync(thumbnails);
    main.mount();
    thumbnails.mount();
});





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




document.querySelectorAll('#navmenu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// reviews play video

$('.reviews-video-slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
});

document.querySelectorAll('.reviews-video-box').forEach(container => {
    const videoId = container.getAttribute('data-video-id');
    container.style.backgroundImage = `url('https://img.youtube.com/vi/${videoId}/hqdefault.jpg')`;
});

function reviewsPlayVideo(container) {
    if (container.classList.contains('reviews-playing')) return;
    container.classList.add('reviews-playing');

    const videoId = container.getAttribute('data-video-id');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    container.innerHTML = '';
    container.appendChild(iframe);
}

document.querySelectorAll('.reviews-video-box').forEach(box => {
    box.addEventListener('click', () => reviewsPlayVideo(box));
});



// footer contact hover 

document.querySelectorAll('.contact-messenger img').forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.dataset.hover;

    img.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
    });

    img.addEventListener('mouseleave', () => {
        img.src = originalSrc;
    });
});

