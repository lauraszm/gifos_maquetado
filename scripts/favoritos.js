const inicializarFavoritos = () => {

    if(localStorage.getItem('favoritos')) {
        console.log("favoritos")
        // pintarFavoritos();
    }else {
        localStorage.setItem('favoritos',JSON.stringify({favoritos: []}));
    }
    localStorage.setItem('gifs',JSON.stringify({gifs: []}));
}


const addToFavs = (ev) => {

    const button = ev.target;
    console.log(button.src)
    // <a class="boton fav"><img src="./images/icon-fav.svg" alt=""></a>
    if(button.src == "./images/icon-fav.svg") {
        button.src = "./images/icon-fav-active.svg";
        button.style.backgroundColor = "#FFFFFF";
        button.style.opacity = 0.9;
        button.style.borderRadius = "5px";
        button.style.width = "3vw";
    } else if (button.src == "./images/icon-fav-active.svg") {
        button.src = "./images/icon-fav.svg"
    }

}