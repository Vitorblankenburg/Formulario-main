const cam = document.querySelector('#video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('assets/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('assets/models'),
]).then(startVideo)

async function startVideo() {
    const constraints = { video: true}

    try{
        let stream = await navigator.mediaDevices.getUserMedia(constraints)

        cam.srcObject = stream
        cam.onloadedmetadata = () => {
            cam.play()
        }
    }catch(error){
        console.error(error)
    }
}

cam.addEventListener('play', () =>{
    const canvas = faceapi.createCanvasFromMedia(cam)
    document.body.append(canvas)

    const displaytSize = {width: cam.width, height: cam.height}

    faceapi.matchDimensions(canvas, displaytSize)
    setInterval(async () => {

        const detections = await faceapi.detectAllFaces(
            cam,
            new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions()

        const resizedDetections = faceapi.resizeResults(detections, displaytSize)
        
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        //faceapi.draw.drawDetections(canvas, resizedDetections)
        //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    },100)
})
// Código de inicialização da câmera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        var video = document.getElementById('video');
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
    .catch(function(err) {
        console.log('Ocorreu um erro ao acessar a câmera: ' + err);
    });
