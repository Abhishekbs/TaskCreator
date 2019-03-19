import React, { Component } from 'react';
import Auth from './Auth';
// import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
// import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        height: '100vh'
    },
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        maxWidth: 300,
    },
    textField: {
        width: 200,
    },
    errorText: {
        color: 'red',
    },

});


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login = () => {
        if (this.state.uname === "abhishek" && this.state.password === "password@123") {
            Auth.login(() => {
                this.props.history.push("/")
            })
        }
        else {
            this.setState({
                error: "Wrong Credentials"
            })
        }
    }


    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    componentDidMount() {

    }

    render() {
        // const { data } = this.state;
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <h4>User Name: abhishek and Password: password@123</h4>
                </div>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={16}>
                            <Grid item xs className={classes.container}>
                                <h1>Sign In</h1>
                            </Grid>
                        </Grid>

                        <form>
                            <div className={classes.container}>
                                <Grid container spacing={16}>
                                    <Grid item xs className={classes.container}>
                                        <TextField
                                            id="username"
                                            label="User Name"
                                            className={classes.textField}
                                            // value={this.state.name}
                                            onChange={this.handleChange('uname')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs className={classes.container}>
                                        <TextField
                                            id="password"
                                            label="Password"
                                            className={classes.textField}
                                            // value={this.state.name}
                                            onChange={this.handleChange('password')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs className={classes.container}>
                                        {/* <Grid container spacing={12}> */}
                                        <Grid item style={{ marginTop: 40, marginBottom: 20 }}>
                                            <Button variant="contained" color="primary" className={classes.textField}
                                                onClick={this.login}>
                                                Login
                                            </Button>
                                        </Grid>
                                        {/* </Grid> */}
                                    </Grid>
                                </Grid>
                            </div>
                        </form>

                        {this.state.error &&
                            <Grid container spacing={16}>
                                <Grid item xs className={classes.container}>
                                    <p className={classes.errorText}>{this.state.error}</p>
                                </Grid>
                            </Grid>
                        }

                    </Paper>
                </div>
            </div>
        )
    }
};



export default withStyles(styles)(Login);
















// const Login = (props) =>{
//     return (
//         <div>
//             <p>Login Component</p>
//             <button onClick={()=>{
//                  Auth.login(()=>{
//                     props.history.push("/")
//                 })
//             }}>Login</button>
//         </div>
//     )
// }

// export default Login;