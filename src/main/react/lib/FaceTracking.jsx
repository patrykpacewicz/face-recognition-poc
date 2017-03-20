import 'tracking/build/tracking.js'
import 'tracking/build/data/face.js'
import EventEmitter from 'events';

export default class FaceTracking {
  constructor(video) {
    this.video = video;
    this.isTrackingOn = false;
    this.emiter = new EventEmitter();
    this.tracker = null;
    this.trackerTask = null;
    this.faceDetection = {
      actualFaceNumber: 0,
      nextFaceNumber: 0,
      lastTimeFaceOccur: 0,
      faceChangeTimeout: 300
    };
    this.initialize();
  }

  toogle = () => {
    if (this.isTrackingOn) { this.stop(); }
    else { this.start(); }
  };

  start = () => {
    if (this.isTrackingOn) { return; }
    this.trackerTask.run();
    this.isTrackingOn = true;
  };

  stop = () => {
    if (!this.isTrackingOn) { return; }
    this.trackerTask.stop();
    this.isTrackingOn = false;
    this.emiter.emit('track', []);
  };

  onTrack = (fun) => {
    this.emiter.on('track', fun);
  };

  onFaceChange = (fun) => {
    this.emiter.on('faceChange', fun);
  };

  imageCapture = (position, size) => {
    let ww = position.width / size.width;
    let hh = position.height / size.height;

    let canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    let ctx = canvas.getContext('2d');

    ctx.drawImage(this.video, -position.x/ww, -position.y/hh, this.video.width/ww, this.video.height/hh);
    return canvas.toDataURL('image/jpeg');
  }

  initialize = () => {
    this.tracker = new window.tracking.ObjectTracker('face');
    this.trackerTask = window.tracking.track(this.video, this.tracker).stop();

    this.tracker.setInitialScale(4);
    this.tracker.setStepSize(2);
    this.tracker.setEdgesDensity(0.1);

    this.tracker.on('track', this.doOnTrackerTrack);
    this.emiter.on('track', this.doOnTrackerFaceChange);
  }

  doOnTrackerTrack = (data) => {
    this.emiter.emit('track', data.data.map( a => {
      let imageUrl = this.imageCapture(a, {width: 64, height: 64});
      return { position: {x: a.x, y: a.y, width: a.width, height: a.height}, imageUrl };
    }));
  }

  doOnTrackerFaceChange = (data) => {
    if (data.length === this.faceDetection.actualFaceNumber) {
      this.faceDetection.nextFaceNumber = this.faceDetection.actualFaceNumber;
      return ;
    }

    if (data.length !== this.faceDetection.nextFaceNumber) {
      this.faceDetection.nextFaceNumber = data.length;
      this.faceDetection.lastTimeFaceOccur = Date.now();
      return ;
    }

    if ((this.faceDetection.lastTimeFaceOccur + this.faceDetection.faceChangeTimeout) <  Date.now()) {
      this.emiter.emit('faceChange', data);
      this.faceDetection.actualFaceNumber = data.length;
      return ;
    }
  }
}
