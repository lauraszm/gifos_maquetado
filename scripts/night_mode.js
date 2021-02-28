const changeMode = document.querySelector('#nightmode');
const logo = document.querySelector('.logo-toggle');
const crearGifoBtn = document.querySelector('.crear-gifo-btn');
const sliderLeft = document.querySelector('.slider.left');
const sliderRight = document.querySelector('.slider.right')


changeMode.addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
    
    if(window.matchMedia("(min-width: 768px)").matches) {
        if(changeMode.innerText == "MODO NOCTURNO") {
            changeMode.innerText = "MODO DIURNO";
            logo.src = "./images/logo-mobile-modo-noct.svg";
            crearGifoBtn.src = "./images/CTA-crear-gifo-modo-noc.svg";
            sliderLeft.src = "./images/button-slider-left-md-noct.svg";
            sliderRight.src = "./images/button-slider-right-md-noct.svg";
    
        } else  if (changeMode.innerText == "MODO DIURNO") {
            changeMode.innerText = "MODO NOCTURNO"
            logo.src = "./images/logo-mobile.svg";
            crearGifoBtn.src = "./images/button-crear-gifo.svg";
            sliderLeft.src = "./images/button-slider-left.svg";
            sliderRight.src = "./images/Button-Slider-right.svg"


        }
    } else if (window.matchMedia("(max-width: 767px)").matches) {
        if(changeMode.innerText == "Modo Nocturno") {
            changeMode.innerText = "Modo Diurno";
            logo.src = "./images/logo-mobile-modo-noct.svg";
    
        } else  if (changeMode.innerText == "Modo Diurno") {
            changeMode.innerText = "Modo Nocturno"
            logo.src = "./images/logo-mobile.svg";
        }

    }

})