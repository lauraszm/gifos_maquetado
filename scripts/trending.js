const printTrending = (arr) => {
    const containerImages = document.querySelector('.tren');
    arr.data.forEach(el => {

            const divBase = document.createElement('div');
            divBase.classList.add('imageTren');
            divBase.style.backgroundImage = `url(${el.images.fixed_height.url})`
            divBase.innerHTML = 
            `<div class="dataGifTren">
            <div class="buttonsTren">
                <a><img src="./images/icon-fav.svg" alt="favearTren"></a>
                <a href="${el.images.original.mp4}" download="gifos" target="_blank"><img src="./images/icon-download.svg" alt="downloadTren"></a>
                <a><img src="./images/icon-max-normal.svg" alt="maxTren"></a>
            </div>
            <div class="userAndTitleTren">
                <p>${el.username}</p>
                <h4>${el.title}</h4>
            </div>
        </div>`
            containerImages.appendChild(divBase);
        })        
}
 