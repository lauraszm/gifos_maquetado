let slider = 3;

const printCarrousel = (arr, container) => {
    for (i = slider -3; i < slider; i++) {
        const divBase = document.createElement('div');
            divBase.classList.add('image');
            divBase.innerHTML = 
            `<img src="${arr.data[i].images.fixed_height.url}" class="imagenGif"/>
            <div class="dataGif">
            <div class="botones">
                <a class="boton fav" data-id=${arr.data[i].id}><img src="./images/icon-fav.svg" alt="favearTren"></a>
                <a class="boton max"><img src="./images/icon-max-normal.svg" alt="maxTren"></a>
                <a class="boton download" href="${arr.data[i].images.original.mp4}" download="gifos" target="_blank"><img src="./images/icon-download.svg" alt="downloadTren"></a>
            </div>
            <div class="info">
                <p>${arr.data[i].username}</p>
                <h4>${arr.data[i].title}</h4>
            </div>
        </div>`
            container.appendChild(divBase);
            const maximise = divBase.querySelector('.dataGif > .botones > .max');
            maximise.addEventListener('click', function() {
                createModal(arr.data[i].images.fixed_height.url, arr.data[i].title, arr.data[i].username, arr.data[i].id)
            });

        }
}

const carrousel = (arr) => {
    const containerImages = document.querySelector('.tren');

    if (window.matchMedia("(min-width: 768px)").matches) {
        printCarrousel(arr, containerImages);

    } else {
            arr.data.forEach(el => {
            
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

        })        


    }
}
const carrouselLeft = () => {
    slider--;
    if (slider == 2) {
        slider = 12
    }
    const containerImages = document.querySelector('.tren');
    containerImages.innerHTML = "";
    carrousel(trendingArray[0])

}


const carrouselRight = () => {
    slider++;
    if (slider == 13) {
        slider = 3
    }
    const containerImages = document.querySelector('.tren');
    containerImages.innerHTML = "";
    // const gifosTrending = await getGifosTrending();
    carrousel(trendingArray)
};    


const printTrending = (arr) => {
    carrousel(arr)
    const sliderLeft = document.querySelector('.trending-gifs-images >.left');
    const sliderRight = document.querySelector('.right');

    if (sliderLeft != null) {
        sliderLeft.addEventListener('click', carrouselLeft)
    }

    if (sliderRight != null) {

        sliderRight.addEventListener('click', carrouselRight)
    }
}

   

