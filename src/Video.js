import React, { Component } from 'react';
import VideoStream from './lib/VideoStream';
import FaceTracking from './lib/FaceTracking';

export default class Video extends Component {
  componentDidMount() {
    this.videoStream = new VideoStream(this.refs.video);
    this.tracker = new FaceTracking(this.refs.video);

    this.tracker.onTrack(this.onTrack);
    this.tracker.onTrack(event => this.markFace(this.refs.canvas, event));
    this.tracker.onFaceChange(this.onFaceChange);

    if (this.props.isVideoOn) { this.videoStream.start(); }
    if (this.props.isTrackingOn) { this.tracker.start(); }
  }

  onTrack = (data) => this.props.onTrack(data)
  onFaceChange = (data) => this.props.onFaceChange(data)
  toogleVideo = () => this.videoStream.toogle()
  toogleTracker = () => this.tracker.toogle()

  markFace = (canvas, event) => {
      let context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (!this.props.isFaceMarkingOn) { return ; }

      event.forEach((rect) => {
        context.strokeStyle = '#a64ceb';
        context.lineWidth = 3;
        context.strokeRect(rect.position.x, rect.position.y, rect.position.width, rect.position.height);
    });
  }

  render() {
    let width = `${this.props.width || 320}px`;
    let height =`${this.props.height || 240}px`;

    return (
        <div style={{width, height , display: "flex"}} >
          <video ref="video" width={width} height={height} style={{position: "absolute"}} preload autoPlay loop muted />
          <canvas ref="canvas" width={width} height={height} style={{position: "absolute"}} />
        </div>
    )
  }
}

Video.propTypes = {
  onTrack: React.PropTypes.func,
  onFaceChange: React.PropTypes.func,
  isFaceMarkingOn: React.PropTypes.bool,
  isVideoOn: React.PropTypes.bool,
  isTrackingOn: React.PropTypes.bool,
  width: React.PropTypes.number,
  height: React.PropTypes.number
};
