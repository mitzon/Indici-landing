// const Swiper = require('./vendor/swiper');

document.addEventListener('click', function(e) {
    const target = e.target;
    if (target.matches('.header__nav-toggle')) {
        let header = target.closest('.header');
        if (header.matches('.header--nav-opened')) {
            header.classList.remove('header--nav-opened');
        } else {
            header.classList.add('header--nav-opened');
        }
    } else {
        let subMenu = target.closest('.header__submenu');
        let menuItem = target.closest('.header__menu-item');
        if (!subMenu && menuItem) {
            subMenu = menuItem.querySelector('.header__submenu');
            if (subMenu) {
                if (menuItem.matches('.header__menu-item--opened')) {
                    menuItem.classList.remove('header__menu-item--opened');
                    subMenu.style.height = '';
                } else {
                    menuItem.classList.add('header__menu-item--opened');
                    subMenu.style.height = subMenu.scrollHeight + 'px';
                }

                e.preventDefault();
                return false;
            }
        }
    }
});

let howItWorksDetailsSlider;
let feedbackQuotesSlider;

function adaptSliders() {
	console.log('resize');
    if (howItWorksDetailsSlider) {
        howItWorksDetailsSlider.destroy(true, true);
        howItWorksDetailsSlider = null;
    } 
	
	if (feedbackQuotesSlider) {
        feedbackQuotesSlider.destroy(true, true);
        feedbackQuotesSlider = null;
    } 

    const viewportWidth = window.innerWidth; // document.documentElement.offsetWidth;

    if (viewportWidth < 1280 && viewportWidth > 749) {
        howItWorksDetailsSlider = new Swiper('.swiper-container', {
            wrapperClass: 'swiper-wrapper',
            slideClass: 'swiper-slide',
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                bulletClass: 'how-it-works__pagination-item',
                bulletActiveClass: 'how-it-works__pagination-item--active',
                renderBullet: function(index, className) {
                    return '<li class="' + className + '"></li>';
                },
            },
        });
    }
	
	if (viewportWidth < 1280) {
        feedbackQuotesSlider = new Swiper('.reviews-list-container', {
            wrapperClass: 'wrapper',
            slideClass: 'reviews-list__item',
            grabCursor: true,
            pagination: {
                el: '.reviews__pagination',
                clickable: true,
                bulletClass: 'reviews__pagination-item',
                bulletActiveClass: 'reviews__pagination-item--active',
                renderBullet: function(index, className) {
                    return '<li class="' + className + '"></li>';
                },
            },
        });
    }

}

window.addEventListener('resize', adaptSliders);
adaptSliders();