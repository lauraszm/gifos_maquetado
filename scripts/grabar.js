const comenzar = document.querySelector(".comenzar");
const grabar = document.querySelector('.grabar');
const finalizar = document.querySelector('.finalizar');
const subir = document.querySelector('.subir');

const uploadEndpoint = 'http://upload.giphy.com/v1/gifs?api_key=j4As5HO2OpUG2w2gTuuqQnIGuwOu2nnJ'


function mostrarPreview ({id}) {
   const containerVideo = document.querySelector(".filmSection");
   containerVideo.innerHTML= `<img class='preview' data-id='${id}' src='https://i.giphy.com/${id}.gif' />`;

}

subir.addEventListener('click', function (ev) {

   const actualPreviewId = document.querySelector('.preview').getAttribute('data-id')
   const misGifos = JSON.parse(localStorage.getItem('misGifos')) || [];
   misGifos.push(actualPreviewId);
   localStorage.setItem('misGifos',JSON.stringify(misGifos));
})

async function uploadGif(formData) {

   const response = await fetch(uploadEndpoint,{
      method: 'POST',
      body: formData
   });
    
   return response.json()
}
const startVideo = () => {
   const containerVideo = document.querySelector(".filmSection");
   containerVideo.innerHTML = "<video>";
   containerVideo.style.paddingTop = "10vh";
   comenzar.style.display = "none";
   grabar.style.display = "block"
}

function getStreamAndRecord() {
   startVideo();
   const video = document.querySelector("video")
   navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
         height: { max: 240 }
      }
   }).then(function (stream) {
      video.srcObject = stream;
      video.play();


      const recorder = RecordRTC(stream, {
         type: 'gif', // audio or video or gif or canvas
         frameRate: 1,
         quality: 10,
         width: 360,
         hidden: 240,
         onGifRecordingStarted: function () {
            console.log('started')
         }

      });

      grabar.addEventListener('click', function () {
         grabar.style.display = "none";
         finalizar.style.display = "block";
         recorder.startRecording()
      })
      finalizar.addEventListener("click", function stopRecording() {
         recorder.stopRecording(async function () {
            const blob = this.blob;
            console.log("end");
            let form = new FormData();
            form.append('file', recorder.getBlob(), 'myGif.gif');
            finalizar.style.display = "none";
            const { data:gifData } =  await uploadGif(form);
            subir.style.display = "block";
            mostrarPreview(gifData);
         })
      })
   })

}


comenzar.addEventListener('click', getStreamAndRecord)