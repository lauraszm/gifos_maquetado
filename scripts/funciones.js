
const getSearchTags = async (word) => {
    try {
        const suggestions = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=4&q=${word}`);
        return suggestions.json();
    } catch (error) {
        console.log("ocurrio un error", e)
    }
}

const getGifosSearch = async (offset, query) => {
    try {
        const imagenes = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=12&offset=${offset}&q=${query}`);
        return imagenes.json()
    } catch (error) {
        console.log("ocurrio un error", error)
    }
}

const getGifosTrending = async () => {
    try {
        const resTrending = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ&limit=12');
        return resTrending.json();

    } catch(e) {
        console.log("hubo un error", e)
    }
}

document.addEventListener("DOMContentLoaded", async() => {
    const gifosTrending = await getGifosTrending()
    printTrending(gifosTrending)

})