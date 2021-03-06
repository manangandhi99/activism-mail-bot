import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const styles = theme => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://preview.redd.it/p1zvxr9fkw251.jpg?width=960&crop=smart&auto=webp&s=c5087c1c61a6903a8b6d2b44ca08ad8f707dbe01)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(4, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 1),
    },
  });

  class MainContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            state: "",
            county: "",
            emailsSent: 0,
            states: [
                {name: "California", id: 1},
                {name: "Massechusets", id: 2}
            ]
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

    setNumEmailsSent(data) {
        this.setState({
            emailsSent: data["number of emails sent"]
        })
        console.log("updated");
        console.log(data["number of emails sent"]);
    }

    onClick = () => {

        const data = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            state: this.state.state,
            county: this.state.county
        }

        fetch('https://activism-mail-bot.herokuapp.com/sendEmail', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((responseData) => {
                this.setNumEmailsSent(responseData);
                console.log(responseData);
                //setResponseCode(response.status);
            }
        )
    };

    responseGoogle(response) {
        let token = response.getAuthResponse().id_token;
        console.log(response.getAuthResponse());
        console.log(response.getAuthResponse().access_token);
        console.log(token);
    }

    googleLoginFailed() {
        alert("Looks like the Google login failed. Please try again.")
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
            <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                In Light of Recent Events, 
                Send Unique E-mails to 279 Elected Officials!
                </Typography>
                <form className={classes.form} noValidate>
                    <Typography component="h3" variant="h8">
                        Step 1: Configure Email Settings
                        <Link href="https://myaccount.google.com/lesssecureapps">
                            Link
                        </Link>
                    </Typography>
                    {/* Mom, Look at me im doing google login things */}
                    <GoogleLogin
                        clientId="956446953020-rrci9a9tkelqpgag33eb7j4eukmjmioe.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.googleLoginFailed}
                        cookiePolicy={'single_host_origin'} 
                        scope={'https://www.googleapis.com/auth/gmail.send'} />
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
                    <Typography component="h4" variant="h8">
                        State:
                    </Typography>
                    <Select value={this.state.state}
                        placeholder="State" 
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="state"
                        label="State"
                        name="state"
                        autoComplete="state"
                        autoFocus
                        onChange={(e) => this.setState({state: e.target.value})}>
                            {this.state.states.map((state) => <option key={state.id} value={state.name}>{state.name}</option>)}
                    </Select>
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
                        className={classes.submit}
                        onClick={this.onClick}
                    >
                    Submit
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={this.onClick}
                    >
                    Number of E-mails Sent: {this.state.emailsSent}
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

export default withStyles(styles)(MainContainer);