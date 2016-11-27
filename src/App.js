import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DataList from './DataList'
import VideoCard from './VideoCard'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ActionFace from 'material-ui/svg-icons/action/face';

import 'flexboxgrid/dist/flexboxgrid.css';

export default class App extends Component {
  state = {
      data: [],
      face: []
  }

  onTrack = (data) => this.setState({data: data});
  onRecognition = (data) => this.setState({face: data});

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Toolbar>
            <ToolbarGroup>
              <ActionFace />
              <ToolbarSeparator />
              <ToolbarTitle text=" PoC: Face Recognition " style={{marginLeft: "10px"}}/>
            </ToolbarGroup>
          </Toolbar>
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <VideoCard onTrack={this.onTrack} onRecognition={this.onRecognition}/>
            </div>
            <div className="col-xs-12 col-sm-6">
              <DataList data={this.state.face} title="List of recognized faces"/>
              <DataList data={this.state.data} title="List of detected faces"/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
