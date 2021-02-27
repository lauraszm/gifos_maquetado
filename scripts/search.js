
let searchInput = document.getElementById('searchGifos');
const search = document.querySelector('#searchButton');

// search suggestions
const autocomplete = async (ev) => {
    const containerList = document.querySelector('.searchSug > ul');
    containerList.innerHTML= "";
    if (ev.target.value.length >= 3) {
        const tags = await getSearchTags(ev.target.value);
        containerList.innerHTML = "";
        tags.data.forEach(tag => {
            const newLi = document.createElement('li');
            newLi.textContent = tag.name;
            containerList.appendChild(newLi)
        })
    }
    // search on enter
    if (ev.key === 'Enter' || ev.keyCode === '13'){
        const containerGifos = document.querySelector('.containerGifos');
        containerGifos.innerHTML = "";
        containerList.innerHTML= "";
        searchContent();
    }
}
searchInput.addEventListener('keyup', autocomplete);

let gifosOffset = 0;
//getting input for search
const searchContent = async () => {
    const gifosSearch = await getGifosSearch(gifosOffset, searchInput.value)
    fetchSearch(gifosSearch)
}

const viewMore = async() => {
    gifosOffset +=12;
    const gifosSearch = await getGifosSearch(gifosOffset, searchInput.value)
    fetchSearch(gifosSearch)
}

search.addEventListener('click', searchContent);

const createModal = (ev) => {
    const modal = document.querySelector('.modal');
    // console.log(ev.target)
    modal.style.display = "block";
    modal.innerHTML = 
    `<div class="modalImage">
    <img src="${ev.target.image}" alt="${ev.target.title}">
    <i class="closeModal"><img src="./images/close.svg" alt="close"></i>
</div>
<div class="modalInfo">
    <div class="modalUserAndTitle">
    <p>${ev.target.username}</p>
    <h4>${ev.target.title}</h4>
    </div>
    <div class="modalBtns">
        <i class="modalFav"><img src="./images/icon-fav.svg" alt="fav"></i>
        <i class="modalDownload"><img src="./images/icon-download.svg" alt="download"></i>
    </div>
</div>`
    
modal.querySelector('.modalImage > .closeModal').addEventListener('click', function (){
    modal.style.display = 'none'
})

}

// general search function

const fetchSearch = (arr) => {

    let searchResults = document.querySelector('#containerGifs');
    console.log(searchInput.value)

    // searchResults.innerHTML = '';
    if(arr.data.length === 0){
        let noResultsTitle = document.createElement('h2');
        noResultsTitle.innerText = searchInput.value;
        
        let noResultsImg = document.createElement('img');
        noResultsImg.setAttribute('src', './images/icon-busqueda-sin-resultado.svg');

        let noResultsSuggestion = document.createElement('h3');
        noResultsSuggestion.innerText = 'Intenta con otra búsqueda';

        searchResults.append(noResultsTitle,noResultsImg,noResultsSuggestion);

    } else {

        let h2SearchResults = document.createElement('h2');
        h2SearchResults.textContent = searchInput.value;
        searchResults.prepend(h2SearchResults);

        const containerGifos = document.querySelector('.containerGifos')
        arr.data.forEach(el => {
            const divGif = document.createElement('div');
            divGif.classList.add('image');
            const imageURL = el.images.fixed_height.url;
            // divGif.style.backgroundImage = `url(${imageURL})`
            divGif.innerHTML = 
            `<img src="${imageURL}" alt="">
            
            <div class="dataGif">
                <div class="botones">
                    <a class="boton fav"><img src="./images/icon-fav.svg" alt=""></a>
                    <a class="boton maxGif"><img src="./images/icon-max-normal.svg" alt=""></a>
                    <a class="boton download" href="${imageURL}" download><img src="./images/icon-download.svg" alt=""></a>
                </div>
                <div class="info">
                    <p class="user">${el.username}</p>
                    <h4 class="title">${el.title}</h4>
                </div>
            </div>`
            containerGifos.appendChild(divGif);

            const maximise = divGif.querySelector('.maxGif');
            maximise.addEventListener('click', createModal);
            maximise.username = el.username;
            maximise.title = el.title;
            maximise.image = imageURL;

            const image = divGif.querySelector('img');
            image.addEventListener("click", createModal);
            image.username = el.username;
            image.title = el.title;
            image.image = imageURL;

            
            divGif.addEventListener('click', createModal)
        })

        searchInput.innerText = "";

        //show view more button
        let verMas = document.querySelector('.verMas');
        verMas.style.display = "block";
        verMas.addEventListener("click", viewMore)


    }

}
