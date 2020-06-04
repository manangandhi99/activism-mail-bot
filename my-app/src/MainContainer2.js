import React, {Component} from 'react';
import Selector from "./Selector";
import TextField from "./TextField"

class MainContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            name: ""
        }
    }

    usernameChange = newUsername => {
        this.setState({
            username: newUsername.target.value
        });
        console.log("username set");
    };

    passwordChange = newPassword => {
        this.setState({
            endBuilding: newPassword.target.value
        });
        console.log("endBuilding set");
    };

    passwordChange = newName => {
        this.setState({
            name: newName.target.value
        });
        console.log("name set");
    };

    render() {
        return (
            <div>
                <Selector onChange={this.usernameChange} onClear={this.clearusername} building={this.state.username}/>
                <Selector onChange={this.endBuildingChange} onClear={this.clearEndBuilding} building={this.state.endBuilding}/>
            </div>
        );
    }
}

export default MainContainer;

