document.addEventListener('DOMContentLoaded', ()=> {
        const misGifos = JSON.parse (localStorage.getItem('misGifos'));
        const urls = misGifos.map (id => `https://i.giphy.com/${id}.gif`);
        const gifElements = urls.map (url =>  {
            const divBase = document.createElement('div');
            divBase.classList.add('image');
            divBase.innerHTML = 
            `<img src="${url}" class="imagenGif"/>
            <div class="dataGif">
            <div class="botones">
                <a class="boton fav" ><img data-id='${url}' src="./images/icon-fav.svg" alt="favearTren"></a>
                <a class="boton max"><img src="./images/icon-max-normal.svg" alt="maxTren"></a>
                <a class="boton download" href="${url}" download="gifos" target="_blank"><img src="./images/icon-download.svg" alt="downloadTren"></a>
            </div>
            <div class="info">
                <p>...</p>
                <h4>...</h4>
            </div>
        </div>`

        return divBase;
        })

        gifElements.forEach(gif => {
            document.querySelector('.containerMisGifos').appendChild(gif);
        });
        
    
})