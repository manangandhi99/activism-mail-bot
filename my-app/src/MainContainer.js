import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

class MainContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            name: "",
            state: "",
            county: "",
        }
    }

    usernameChange = newUsername => {
        this.setState({
            username: newUsername.target.value
        });
        console.log("username set");
        console.log(this.username);
    };

    passwordChange = newPassword => {
        this.setState({
            password: newPassword.target.value
        });
        console.log("password set");
    };

    passwordChange = newName => {
        this.setState({
            name: newName.target.value
        });
        console.log("name set");
    };

    stateChange = newState => {
        this.setState({
            state: newState.target.value
        });
        console.log("state set");
    };

    countyChange = newCounty => {
        this.setState({
            county: newCounty.target.value
        });
        console.log("county set");
    };

    onClick = () => {
        console.log("hlloe");
        console.log(this.state);
    };

    render() {
        return (
            <div>
            <Grid container component="main">
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div>
                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.usernameChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.passwordChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        onChange={this.nameChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="state"
                        label="State"
                        name="name"
                        autoComplete="state"
                        autoFocus
                        onChange={this.stateChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="county"
                        label="County"
                        name="county"
                        autoComplete="county"
                        autoFocus
                        onChange={this.countyChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.onClick}
                    >
                    Submit
                    </Button>
                    <Box mt={5}>
                    </Box>
                </form>
                </div>
            </Grid>
            </Grid>
        </div>
        );
    }
}

export default MainContainer;