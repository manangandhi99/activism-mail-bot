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
            email: "",
            password: "",
            name: "",
            state: "",
            county: "",
        }
    }

    emailChange = newEmail => {
        this.setState({
            email: newEmail.target.value
        });
        console.log("username set");
        console.log(this.email);
    };

    passwordChange = newPassword => {
        this.setState({
            password: newPassword.target.value
        });
        console.log("password set");
    };

    nameChange = newName => {
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

        console.log(this.state);

        fetch('https://activism-mail-bot.herokuapp.com/sendEmail', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(this.state)
        }).then(
            function (response) {
                //setIsLoaded(true);
                console.log(response);
                //setResponseCode(response.status);
            }
        )
    };

    render() {
        return (
            <div>
            <Grid container component="main">
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div>
                <form noValidate onSubmit={e => e.preventDefault()}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.emailChange}
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
                        onChange={this.passwordChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
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
                        name="state"
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