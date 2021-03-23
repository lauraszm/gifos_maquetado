const comenzar = document.querySelector(".comenzar");
const grabar = document.querySelector('.grabar');
const finalizar = document.querySelector('.finalizar');
const subit = document.querySelector('.subir');

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
         recorder.stopRecording(function () {
            const blob = this.blob;
            console.log("end");
            let form = new FormData();
            form.append('file', recorder.getBlob(), 'myGif.gif');
            console.log(form.get('file'))
         })
         
      })


   })

}


comenzar.addEventListener('click', getStreamAndRecord)