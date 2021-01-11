const baseURL = 'https://api.giphy.com/v1/gifs/';
const endpointTrending = 'trending';
const endpointSearch = 'search';
const endpointAutocomplete = 'tags';
const apiKey = 'api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ';
const limit = 3;

let searchInput = document.getElementById('searchGifos');
const search = document.querySelector('#searchButton');
searchInput.addEventListener('keyup', autocomplete);

// search suggestions
async function autocomplete(event) {
    const autocomplete = await fetch(`${baseURL}${endpointSearch}/${endpointAutocomplete}?${apiKey}&limit=4&q=${event.target.value}`);
    let autocompleteJson = await autocomplete.json();
    console.log(event.target.value)

    //search on enter
    if (event.key === 'Enter' || event.keyCode === '13'){
        fetchSearch(event.target.value);
        console.log(event.target.value)
    }
}

// //getting input for search
function searchContent(){
    fetchSearch(searchInput.value)
    console.log(searchInput.value)
}

search.addEventListener('click', searchContent);

// general search function
async function fetchSearch(search){
    const resSearch = await fetch(`${baseURL}${endpointSearch}?${apiKey}&limit=12&q=${search}`);
    const resSearchJson = await resSearch.json();
    console.log(resSearchJson)
    let searchResults = document.querySelector('.containerGifos');
    let h2SearchResults = document.querySelector('#ContainerGifs')

    // searchResults.innerHTML = '';
    if(resSearchJson.data.length === 0){
        let noResultsTitle = document.createElement('h2');
        noResultsTitle.innerText = search;
        
        let noResultsImg = document.createElement('img');
        noResultsImg.setAttribute('src', './images/icon-busqueda-sin-resultado.svg');

        let noResultsSuggestion = document.createElement('h3');
        noResultsSuggestion.innerText = 'Intenta con otra búsqueda';

        searchResults.append(noResultsTitle,noResultsImg,noResultsSuggestion);

    } else {
        let h2 = document.createElement('div');
        h2.classList.add('h2-gifs');
        h2.innerHTML = `<h2>${search}</h2>`;
        h2SearchResults.prepend(h2);

        for (let i = 0; i < resSearchJson.data.length; i++){
            console.log(resSearchJson.data[i].images.fixed_height.url)
            
            //create div=image
            let image = document.createElement('div');
            image.classList.add('image');
            image.style.backgroundImage = "url('"+resSearchJson.data[i].images.fixed_height.url+"')"
            searchResults.appendChild(image);

            //create div dataGif
            let dataGif = document.createElement('div');
            dataGif.classList.add('dataGif');
            image.appendChild(dataGif);

            //create buttons div
            let buttons = document.createElement('div');
            buttons.classList.add('buttons')
            let iconFav = document.createElement('img');
            iconFav.setAttribute('src', './images/icon-fav.svg');
            let iconDownload = document.createElement('img');
            iconDownload.setAttribute('src', './images/icon-download.svg');
            let iconMax = document.createElement('img');
            iconMax.setAttribute('src', './images/icon-max-normal.svg');

            buttons.append(iconFav,iconDownload,iconMax);

            //add user and title
            let userAndTitle = document.createElement('div');
            userAndTitle.classList.add('userAndTitle');
            let user = document.createElement('p');
            user.innerText = resSearchJson.data[i].username;
            let title = document.createElement('h4');
            title.innerText = resSearchJson.data[i].title;

            userAndTitle.append(user, title);
            dataGif.append(buttons, userAndTitle)
            

        }
        
        let verMas = document.createElement('div');
        verMas.classList.add('verMas');
        verMas.innerText = 'ver más'
        h2SearchResults.appendChild(verMas)
    }

}

//mostrar trending
// async function fetchTrending () {
//     try {
//         const res = await fetch(`${baseURL}${endpointTrending}?${apiKey}&limit=${limit}`);
//         const resJson = await res.json();
//         let containerTrending = document.getElementById('trending-gifs');

//         for(let i = 0; i < resJson.data.length; i++){
//             let newTrending = document.createElement('img');
//             newTrending.classList.add('newTrendingGifos');
//             newTrending.setAttribute('src', resJson.data[i].images.fixed_height.url);
//             containerTrending.appendChild(newTrending)
//             //create carrousel and change limit
//         }
//     } catch (e) {
//         console.log('error', e)
//     }
// }

// fetchTrending()