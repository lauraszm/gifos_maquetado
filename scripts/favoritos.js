

const favoritosArr = []

const printFavs = () => {
    const localFavoritos= JSON.parse (localStorage.getItem('favoritos'));
    const containerFavs = document.querySelector('.favGifs > .containerFavoritos');
    containerFavs.innerHTML = "";
    // localFavoritos.favoritos.forEach(fav => {
    //     const divGif = document.createElement('div');
    //     divGif.classList.add('image');
    //     const imageURL = el.images.fixed_height.url;
    //     divGif.innerHTML = 
    //     `<img class="imagenGif" src="${imageURL}" alt="${el.title}">
        
    //     <div class="dataGif">
    //         <div class="botones">
    //             <a class="boton fav"><img data-id="${el.id}" src="./images/icon-fav.svg" alt=""></a>
    //             <a class="boton maxGif"><img src="./images/icon-max-normal.svg" alt=""></a>
    //             <a class="boton download" href="${imageURL}" download><img src="./images/icon-download.svg" alt=""></a>
    //         </div>
    //         <div class="info">
    //             <p class="user">${el.username}</p>
    //             <h4 class="title">${el.title}</h4>
    //         </div>
    //     </div>`
    //     containerGifos.appendChild(divGif);

    //     const maximise = divGif.querySelector('.dataGif > .botones > .maxGif');
    //     maximise.addEventListener('click', function() {
    //         createModal(imageURL, el.title, el.username, el.id)
    //     });

    //     const image = divGif.querySelector('.imagenGif');
    //     image.addEventListener("click", function() {
    //         createModal(imageURL, el.title, el.username, el.id)
    //     });
    // })
}


const addToFavs = (ev) => {

    const button = ev.target;
    // console.log(button)
    button.src = "./images/icon-fav-active.svg";
    button.style.backgroundColor = "#FFFFFF";
    button.style.opacity = 0.9;
    button.style.borderRadius = "5px";
    button.style.width = "3vw";

    const idGifSelected = button.getAttribute('data-id');
    const localFavs = JSON.parse(localStorage.getItem('favoritos'))
    const favSelected = gifosFound.find(fav => fav.id === idGifSelected);
    console.log(favSelected)
    favoritosArr.push(favSelected);
    localStorage.setItem('favoritos', JSON.stringify(favoritosArr))
    printFavs()
}

