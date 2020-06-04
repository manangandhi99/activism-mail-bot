import React, {Component} from 'react';
import {MenuItem, Select} from "@material-ui/core";

class Selector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buildings: ""
        };
        this.makeRequestForBuilding()
    }

    /**
    * Adds the buildings to the selector
    *
    * @param requestData is the data that is used to add the buildings to the selector
    */
    generateMenuItems = (requestData) => {
        let menuNames = this.getMenuNames(requestData);
        let menuItems = [];
        for (let i in menuNames) {
            let namePair = menuNames[i];

            let menuItemComponent = (
                <MenuItem key={namePair[0]} value={namePair[0]}>
                    {namePair[1]}
                </MenuItem>
            );
            menuItems.push(menuItemComponent);
        }
        return menuItems;
    };

    /**
    * Deciphers the data from the fetched data to a more usable format for generatedMenuItems()
    *
    * @param requestData is the data from the server that is used to decipher the data
    */
    getMenuNames = (requestData) => {
        let jsonObject = requestData;

        let result = [];
        for (let i in jsonObject) {
            result.push([i, jsonObject[i]]);
        }
        return result;
    };

    render() { // Calling the helper function.
        return (
            <div>
                <p>
                    Your selection : {this.props.building}
                </p>
                <Select onChange={this.props.onChange} value={this.props.building}>
                    {this.state.buildings}
                </Select>
            </div>
        );
    }
}

export default Selector;
