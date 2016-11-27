import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

export default class DataList extends Component {
  render() {
    if (this.props.data.length <= 0) {
      return (<div />);
    }
    return (
      <Paper zDepth={3}>
        <List>
          <Subheader>{this.props.title}</Subheader>
          {this.props.data.map( (row, i) => (
              <ListItem key={i}
                leftAvatar={<Avatar src={row.imageUrl} />}
                primaryText={"Face: " + (i+1)}
                secondaryText={ <p> {JSON.stringify(row.position)} </p> }
                secondaryTextLines={2}
              />
          ))}
       </List>
     </Paper>
    );
  }
}

DataList.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array
};
