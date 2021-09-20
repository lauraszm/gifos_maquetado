const inicializarFavoritos = () => {

    if(!localStorage.getItem('favoritos')) {
        
        localStorage.setItem('favoritos',JSON.stringify({favoritos: []}));
    }
    // localStorage.setItem('gifs',JSON.stringify({gifs: []}));
}

const inicializarNightMode = () => {

    if(!localStorage.getItem('nightMode')) {
        
        localStorage.setItem('nightMode',JSON.stringify({nightMode: 0}));
    }
    // localStorage.setItem('gifs',JSON.stringify({gifs: []}));
}



const getSearchTags = async (word) => {
    try {
        const suggestions = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=4&q=${word}`);
        return suggestions.json();
    } catch (error) {
        console.log("ocurrio un error", e)
    }
}
const gifosFound =[];

const getGifosSearch = async (offset, query) => {
    try {
        const imagenes = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=12&offset=${offset}&q=${query}`);
        return imagenes.json()
    } catch (error) {
        console.log("ocurrio un error", error)
    }
}

const trendingArray = [];

const getGifosTrending = async () => {
    try {
        const resTrending = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=12');
        return resTrending.json();

    } catch(e) {
        console.log("hubo un error", e)
    }
}

const trendingToArr = (arr) => {
    arr.forEach(el => {
        trendingArray.push(el)
    })
}

const fetchTrendingTerms = async () => {
    try {
        const resTrendingTerms = await fetch('https://api.giphy.com/v1/trending/searches?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ');
        return resTrendingTerms.json();
    } catch(e) {
        console.log("hubo un error", e)
    }
}

trendingTermsArr = [];
const trendingTermsToArr = (arr) => {
    for (let i = 0; i < 5; i++) {
        trendingTermsArr.push(arr[i])
    }
}

document.addEventListener("DOMContentLoaded", async() => {
    const gifosTrending = await getGifosTrending();
    trendingToArr(gifosTrending.data);
    printTrending(gifosTrending);
    inicializarFavoritos();
    const trendingTermsData  = await fetchTrendingTerms();
    trendingTermsToArr(trendingTermsData.data);
    getTrendingTerms(trendingTermsArr);
    inicializarNightMode()
})