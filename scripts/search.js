
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
            containerList.appendChild(newLi);

            newLi.addEventListener("click", function() {
                searchContent();
                containerList.innerHTML = "";
            })
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

if (searchInput != null) {

    searchInput.addEventListener('keyup', autocomplete);
}

//getting input for search
const searchContent = async () => {
    const gifosSearch = await getGifosSearch(gifosOffset, searchInput.value);
    fetchSearch(gifosSearch)
}

// trending terms

const getTrendingTerms = (arr) => {
    const trendingTerms = document.querySelector('#trending-text');
    arr.forEach(el => {
        const newTerm = document.createElement('span');
        newTerm.classList.add("trendingTerms")
        newTerm.textContent = ` ${el} -`;
        trendingTerms.append(newTerm);
        newTerm.style.textTransform = "Capitalize";
        newTerm.style.cursor = "Pointer";

        newTerm.addEventListener("click", async function() {
            const gifosSearch = await getGifosSearch(gifosOffset, el);
            fetchSearch(gifosSearch)
        }) 
    })
}

let gifosOffset = 0;

const viewMore = async() => {
    gifosOffset +=12;
    const gifosSearch = await getGifosSearch(gifosOffset, searchInput.value);
    fetchSearch(gifosSearch)
}

if(search != null) {

    search.addEventListener('click', searchContent);
}

const createModal = (image, title, username, id) => {
    const modal = document.querySelector('.modal');
    modal.style.display = "block";
    modal.innerHTML = 
    `<div class="modalImage">
    <img src="${image}" alt="${title}">
    <i class="closeModal"><img src="./images/close.svg" alt="close"></i>
</div>
<div class="modalInfo">
    <div class="modalUserAndTitle">
    <p>${username}</p>
    <h4>${title}</h4>
    </div>
    <div class="modalBtns">
        <i class="modalFav"><img data-id='${id}' src="./images/icon-fav.svg" alt="fav"></i>
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

        let h2SearchResults = document.querySelector('#containerGifs > h2');
        h2SearchResults.textContent = searchInput.value;
        searchResults.prepend(h2SearchResults);
        const containerGifos = document.querySelector('.containerGifos')
        arr.data.forEach(el => {
            gifosFound.push(el);
            const divGif = document.createElement('div');
            divGif.classList.add('image');
            const imageURL = el.images.fixed_height.url;
            divGif.innerHTML = 
            `<img class="imagenGif" src="${imageURL}" alt="${el.title}">
            
            <div class="dataGif">
                <div class="botones">
                    <a class="boton fav"><img data-id="${el.id}" src="./images/icon-fav.svg" alt=""></a>
                    <a class="boton maxGif"><img src="./images/icon-max-normal.svg" alt=""></a>
                    <a class="boton download" href="${imageURL}" download><img src="./images/icon-download.svg" alt=""></a>
                </div>
                <div class="info">
                    <p class="user">${el.username}</p>
                    <h4 class="title">${el.title}</h4>
                </div>
            </div>`
            containerGifos.appendChild(divGif);

            const maximise = divGif.querySelector('.dataGif > .botones > .maxGif');
            maximise.addEventListener('click', function() {
                createModal(imageURL, el.title, el.username, el.id)
            });

            const image = divGif.querySelector('.imagenGif');
            image.addEventListener("click", function() {
                createModal(imageURL, el.title, el.username, el.id)
            });

            divGif.querySelector('.fav').addEventListener('click', addToFavs)
        })

        searchInput.innerText = "";

        //show view more button
        let verMas = document.querySelector('.verMas');
        verMas.style.display = "block";
        verMas.addEventListener("click", viewMore)



    }

}


