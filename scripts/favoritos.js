

const favoritosArr = [];
const containerFavs = document.querySelector('.favoritos .favs .favGifs .containerFavoritos');


const printFavs = () => {

    if (containerFavs != null) {
        const localFavoritos = JSON.parse(localStorage.getItem('favoritos'));
        containerFavs.innerHTML = "";
        localFavoritos.forEach(fav => {
            const divGif = document.createElement('div');
            divGif.classList.add('image');
            const imageURL = fav.images.fixed_height.url;
            divGif.innerHTML =
                `<img class="imagenGif" src="${imageURL}" alt="${fav.title}">
            
            <div class="dataGif">
                <div class="botones">
                    <a class="boton fav"><img data-id="${fav.id}" src="./images/icon-fav.svg" alt=""></a>
                    <a class="boton maxGif"><img src="./images/icon-max-normal.svg" alt=""></a>
                    <a class="boton download" href="${imageURL}" download><img src="./images/icon-download.svg" alt=""></a>
                </div>
                <div class="info">
                    <p class="user">${fav.username}</p>
                    <h4 class="title">${fav.title}</h4>
                </div>
            </div>`
            containerFavs.appendChild(divGif);

            const maximise = divGif.querySelector('.dataGif > .botones > .maxGif');
            maximise.addEventListener('click', function () {
                createModal(imageURL, fav.title, fav.username, fav.id)
            });

            const image = divGif.querySelector('.imagenGif');
            image.addEventListener("click", function () {
                createModal(imageURL, fav.title, fav.username, fav.id)
            });
        })
    }
}



const addToFavs = (ev) => {

    const button = ev.target;
    button.src = "./images/icon-fav-active.svg";
    button.style.backgroundColor = "#FFFFFF";
    button.style.opacity = 0.9;
    button.style.borderRadius = "5px";
    button.style.width = "3vw";

    if (gifosFound.length > 0) {
        const idGifSelected = button.getAttribute('data-id');
        const localFavs = JSON.parse(localStorage.getItem('favoritos'));
        // console.log(localFavs)
        // console.log(gifosFound)
        const favSelected = gifosFound.find(fav => fav.id === idGifSelected);
        // console.log(favSelected)
        localFavs.push(favSelected);
        localStorage.setItem('favoritos', JSON.stringify(localFavs))
        printFavs()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('favoritos')) {
        printFavs()
    }
})
