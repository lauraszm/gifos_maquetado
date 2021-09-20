let slider = 0;
// console.log(trendingArray)

// const printCarrousel = (arr, container) => {
//     for (i = slider -3; i < slider; i++) {
//         const divBase = document.createElement('div');
//             divBase.classList.add('image');
//             divBase.innerHTML = 
//             `<img src="${arr[i].images.fixed_height.url}" class="imagenGif"/>
//             <div class="dataGif">
//             <div class="botones">
//                 <a class="boton fav" data-id=${arr[i].id}><img src="./images/icon-fav.svg" alt="favearTren"></a>
//                 <a class="boton max"><img src="./images/icon-max-normal.svg" alt="maxTren"></a>
//                 <a class="boton download" href=${arr[i].images.original_mp4.mp4} download="gifos" target="_blank"><img src="./images/icon-download.svg" alt="downloadTren"></a>
//             </div>
//             <div class="info">
//                 <p>${arr[i].username}</p>
//                 <h4>${arr[i].title}</h4>
//             </div>
//         </div>`
//             container.appendChild(divBase);
//             const maximise = divBase.querySelector('.dataGif > .botones > .max');
//             maximise.addEventListener('click', function() {
//                 console.log(arr[i])
//                 createModal(arr[i].images.fixed_height.url, arr[i].title, arr[i].username, arr[i].id)
//             });

//         }
// }

const carrousel = (arr) => {
    const containerImages = document.querySelector('.tren');

    // if (window.matchMedia("(min-width: 768px)").matches) {
        // printCarrousel(trendingArray, containerImages);
        // console.log("desktop")
    // } else {
            arr.forEach(el => {
            
            const divBase = document.createElement('div');
            divBase.classList.add('image');
            divBase.innerHTML = 
            `<img src="${el.images.fixed_height.url}" class="imagenGif"/>
            <div class="dataGif">
            <div class="botones">
                <a class="boton fav" ><img data-id='${el.id}' src="./images/icon-fav.svg" alt="favearTren"></a>
                <a class="boton max"><img src="./images/icon-max-normal.svg" alt="maxTren"></a>
                <a class="boton download" href="${el.images.original.mp4}" download="gifos" target="_blank"><img src="./images/icon-download.svg" alt="downloadTren"></a>
            </div>
            <div class="info">
                <p>${el.username}</p>
                <h4>${el.title}</h4>
            </div>
        </div>`
            containerImages.appendChild(divBase);

            const image = divBase.querySelector('.imagenGif');
            image.addEventListener("click", function() {
                createModal(el.images.fixed_height.url, el.title, el.username, el.id)
            });
            const maximise = divBase.querySelector('.dataGif > .botones > .max');
            maximise.addEventListener('click', function() {
                createModal(el.images.fixed_height.url, el.title, el.username, el.id)
            });


        })        


    }
// }
const carrouselLeft = () => {
    if (slider > 0) {
        slider -= 25;
        const containerImages = document.querySelector('.tren');
        containerImages.style.left = `${slider}vw`
        // slider = 250
    }

}


const carrouselRight = () => {
    slider += 25;
    if (slider == 250) {
        slider = 0
    }
    const containerImages = document.querySelector('.tren');
    containerImages.style.right = `${slider}vw`

};    


const printTrending = (arr) => {
    carrousel(trendingArray)
    const sliderLeft = document.querySelectorAll('.trending-gifs-images >.left');
    const sliderRight = document.querySelectorAll('.trending-gifs-images > .right');
    if (sliderLeft != null) {
        sliderLeft.forEach(slider => {
            slider.addEventListener('click', carrouselLeft)
        })
    }

    if (sliderRight != null) {
        sliderRight.forEach(slider => {

            slider.addEventListener('click', carrouselRight)
        })
    }

}
