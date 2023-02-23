"use strict"

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any: function() {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function(e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}

// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');

    })
}

// Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.toggle('_lock');
                iconMenu.classList.toggle('_active');
                menuBody.classList.toggle('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}

// SLIDER

let slideIndex = 1;
let offset = 0;

const slides = document.querySelectorAll('.main-block__slide'),
    slidesWrapper = document.querySelector('.main-block__wrapper'),
    slidesField = document.querySelector('.main-block__inner'),
    width = window.getComputedStyle(slidesWrapper).width,
    tabs = document.querySelectorAll('.dots__item')

slidesField.style.width = 100 * slides.length + "%";

slides.forEach(slide => {
    slide.style.width = width;
})


tabs[slideIndex - 1].classList.add('dots__item-active');

function slideActive(index) {
    tabs.forEach(tab => {
        tab.classList.remove('dots__item-active')
    });
    tabs[index - 1].classList.add('dots__item-active')
}

function deleteNotDigits(str) {
    return Math.round(+str.slice(0, -2))
    // return +str.replace(/\D/g, '');
}

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to')

        slideIndex = slideTo;

        offset = deleteNotDigits(width) * (slideTo - 1);
        slidesField.style.transform = `translateX(-${offset}px)`;

        slideActive(slideIndex);
    })
})