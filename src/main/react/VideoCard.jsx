import React, { Component } from 'react';

import { FaceRecognitionLocalProxyClient } from './lib/FaceRecognitionClient'

import {Card, CardActions, CardHeader, CardMedia} from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';
import Video from './Video'
import async from 'async';

export default class VideoCard extends Component {
  state = {
    isFaceMarkingOn: false,
    isFaceRecognitionOn: false,
    lastFaceChange: [],
    snackbarMsg: ""
  }

  constructor(props) {
    super(props);
    this.client = new FaceRecognitionLocalProxyClient();
  }

  toogleVideo = () => this.refs.video.toogleVideo()
  toogleTracker = () => this.refs.video.toogleTracker()
  toogleFaceMarkingOn = () => this.setState({isFaceMarkingOn: !this.state.isFaceMarkingOn})
  toogleFaceRecognitionOn = () => {
    if (this.state.isFaceRecognitionOn) { this.doOnFaceChange([]) }
    else { this.doOnFaceChange(this.state.lastFaceChange) }
    this.setState({isFaceRecognitionOn: !this.state.isFaceRecognitionOn})
  }

  onTrack = (data) => this.props.onTrack(data)

  onFaceChange = (data) => {
    this.setState({lastFaceChange: data});
    if (!this.state.isFaceRecognitionOn) { return; }
    this.doOnFaceChange(data);
  }

  doOnFaceChange = (data) => {
    async.map(data, (d, callback) => {
      this.client.detect(d.imageUrl, (dataa) => {
        callback(null, {imageUrl: d.imageUrl, position: dataa[0].faceAttributes});
      }, (err, status) => {
        this.setState({snackbarMsg: "MS-FACE-API (" + status + "): " + err.message})
      });
    }, (err, data) => this.props.onRecognition(data));
  }

  snackbarClose = () => {
      this.setState({snackbarMsg: ""})
  }

  render() {
    return (
      <Card zDepth={3}>
        <CardHeader title="Camera" subtitle="Face Detection" />
        <CardMedia>
          <div className="row center-xs">
            <Video ref="video" onTrack={this.onTrack} onFaceChange={this.onFaceChange} isFaceMarkingOn={this.state.isFaceMarkingOn} />
          </div>
        </CardMedia>
        <CardActions>
          <Toggle label="Camera" labelPosition="right" onToggle={this.toogleVideo} />
          <Toggle label="Face detection" labelPosition="right" onToggle={this.toogleTracker} />
          <Toggle label="Face marking" labelPosition="right" onToggle={this.toogleFaceMarkingOn} />
          <Toggle label="Face recognition" labelPosition="right" onToggle={this.toogleFaceRecognitionOn} />
        </CardActions>
        <Snackbar
            open={!!this.state.snackbarMsg}
            message={this.state.snackbarMsg}
            onRequestClose={this.snackbarClose}
            autoHideDuration={4000}
        />
      </Card>
    )
  }
}

VideoCard.propTypes = {
  onTrack: React.PropTypes.func,
  onRecognition: React.PropTypes.func
};
