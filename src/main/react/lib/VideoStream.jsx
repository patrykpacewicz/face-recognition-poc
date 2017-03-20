export default class VideoStream {
  constructor(video) {
    this.video = video;
    this.isVideoOn = false;
  }

  toogle = () => {
    if (this.isVideoOn) { this.stop(); }
    else { this.start(); }
  }

  start = () => {
    if (this.isVideoOn) { return; }
    this.startVideoStream(this.video);
  }

  stop = () => {
    if (!this.isVideoOn) { return; }
    this.stopVideoStream(this.video);
  }

  imageCapture = () => {
    if (!this.isVideoOn) { return; }

    let canvas = document.createElement('canvas');
    canvas.width = this.video.width;
    canvas.height = this.video.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
  }

  startVideoStream = (element) => {
    let options = {video: true, audio: false};
    window.navigator.getUserMedia(options, (stream) => {
      element.src = window.URL.createObjectURL(stream);
      element.stream = stream;
      element.play();
      this.isVideoOn = true;
    }, (error) => {
      console.log(error);
      throw new Error("Error while starting video streaming: " + error.name);
    });
  }

  stopVideoStream = (element) => {
    element.pause();
    element.src = "";
    element.stream.getTracks()[0].stop();
    element.stream = null;
    this.isVideoOn = false;
  }
}
