document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('background-video');

    // Стилі позиціювання — JS-ом, щоб не чіпати CSS
    Object.assign(video.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    });

    // Контейнер, якщо його нема — створимо
    let wrapper = video.parentElement;
    if (!wrapper || getComputedStyle(wrapper).position === 'static') {
        const w = document.createElement('div');
        w.style.position = 'relative';
        w.style.width = '100%';
        w.style.height = '100vh';
        video.replaceWith(w);
        w.appendChild(video);
        wrapper = w;
    }

    // Створюємо <img> для першого кадру
    const posterImg = document.createElement('img');
    Object.assign(posterImg.style, {
        position: 'absolute',
        inset: '0',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        // спочатку невидима: покажемо, коли матимемо кадр
        opacity: '0',
        transition: 'opacity .3s ease',
        pointerEvents: 'none',
        zIndex: '0'
    });
    wrapper.insertBefore(posterImg, video);

    // Відео поверх
    video.style.zIndex = '1';

    // Коли доступний перший кадр — малюємо його в <canvas> і показуємо як <img>
    function renderFirstFrame() {
        // Якщо розміри ще не відомі — почекаємо наступну подію
        if (!video.videoWidth || !video.videoHeight) return;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        try {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/jpeg', 0.8);
            posterImg.src = dataURL;
            posterImg.style.opacity = '1';
        } catch (e) {
            // Якщо з якихось причин не вдалось — просто не показуємо
            // (відео все одно спробує стартувати)
        }
    }

    // Показати перший кадр, щойно дані готові
    video.addEventListener('loadeddata', () => {
        // Гарантовано на початку
        if (video.currentTime !== 0) {
            try { video.currentTime = 0; } catch { }
        }
        renderFirstFrame();
    });

    // Коли відео реально грає — прибираємо постер
    video.addEventListener('playing', () => {
        posterImg.style.opacity = '0';
    });

    // Якщо відтворення зупинилось/не вдалося — залишаємо постер видимим
    video.addEventListener('pause', () => {
        // якщо зупинилось не через loop або buffering — повернемо постер
        if (video.currentTime <= 0.05) posterImg.style.opacity = '1';
    });

    // Спроба автоплею
    video.play().catch(() => {
        // Якщо autoplay заблокований — покажемо постер і повторимо спробу після взаємодії
        posterImg.style.opacity = '1';

        const tryPlay = () => video.play().catch(() => {/* ігноруємо */ });
        // Торкання на мобільних / клік на десктопі — одноразово
        document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
        document.addEventListener('mousedown', tryPlay, { once: true });
        document.addEventListener('keydown', tryPlay, { once: true });
    });
});
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

