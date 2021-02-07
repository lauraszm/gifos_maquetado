
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
        searchContent();
    }
}
searchInput.addEventListener('keyup', autocomplete);


//getting input for search
const searchContent = async () => {
    const gifosSearch = await getGifosSearch(0, searchInput.value)
    fetchSearch(gifosSearch)
}

search.addEventListener('click', searchContent);

const createModal = (ev) => {
    const modal = document.querySelector('.modal');
    console.log(ev.target.background)
    modal.style.display = "block";
    modal.innerHTML = `<div class="modalImage">
    <i class="closeModal"><img src="./images/close.svg" alt="close"></i>
    <div class="gif"></div>
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
</div>
</div>`
modal.querySelector('.modalImage > .gif').style.backgroundImage = `url(${ev.target.background})`;
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
        noResultsTitle.innerText = search;
        
        let noResultsImg = document.createElement('img');
        noResultsImg.setAttribute('src', './images/icon-busqueda-sin-resultado.svg');

        let noResultsSuggestion = document.createElement('h3');
        noResultsSuggestion.innerText = 'Intenta con otra búsqueda';

        searchResults.append(noResultsTitle,noResultsImg,noResultsSuggestion);

    } else {

        // let h2SearchResults = document.createElement('h2');
        // h2SearchResults.innerHTML = `<h2>${search}</h2>`;
        // h2SearchResults.appendChild(searchResults);

        const containerGifos = document.querySelector('.containerGifos')
        arr.data.forEach(el => {
            const divGif = document.createElement('div');
            divGif.classList.add('image');
            const imageURL = el.images.fixed_height.url;
            divGif.style.backgroundImage = `url(${imageURL})`
            divGif.innerHTML = 
            `<div class="dataGif">
            <span class="hidden">${imageURL}</span>
            <div class="buttons">
                <a><img src="./images/icon-fav.svg" alt="favear"></a>
                <a href="${el.images.original.mp4}" download="gifos" target="_blank"><img src="./images/icon-download.svg" alt="download"></a>
                <a><img class="maxGif" src="./images/icon-max-normal.svg" alt="max"></a>
            </div>
            <div class="userAndTitle">
                <p>${el.username}</p>
                <h4>${el.title}</h4>
            </div>
            </div>`
            containerGifos.appendChild(divGif);

            const maximise = divGif.querySelector('.maxGif')
            maximise.addEventListener('click', createModal);
            maximise.username = el.username;
            maximise.title = el.title;
            maximise.background = imageURL;
            
            // divGif.addEventListener('click', createModal)
        })

        searchInput.innerText = "";

        //create view more button
        let verMas = document.createElement('div');
        verMas.classList.add('verMas');
        verMas.innerText = 'ver más'
        searchResults.appendChild(verMas);


    }

}