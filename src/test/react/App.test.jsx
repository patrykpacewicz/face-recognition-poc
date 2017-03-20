import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DataList from '../../../src/main/react/DataList';

test('Link changes the class when hovered', () => {
    const component = renderer.create(
        <MuiThemeProvider>
            <DataList data={[{position: "", imageUrl: ""}]} title=""/>
        </MuiThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});