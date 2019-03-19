import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
var moment = require('moment');

const styles = theme => ({

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
        width: 390,
    },
    errorText: {
        color: 'red',
    },

});



class TaskCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskDate: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.addTask = this.addTask.bind(this);

    }

    addTask = () => {
        console.log("this.state-->", this.state);
        let errr = false;
        if (this.state.taskName === "" || this.state.taskName === null || this.state.taskName === undefined) {
            this.setState({
                err_taskName: true
            })
            errr = true;
        }

        if (moment(new Date(this.state.taskDate)).isBefore(new Date())) {
            this.setState({
                err_taskDate: "Invalid Date"
            })
            errr = true;
        }

        if (!errr) {
            this.props.addTask(this.state);
        }
    }

    handleDateChange = date => {
        this.setState({ taskDate: date });
    };

    handleChange = name => event => {
        let value = event.target.value
        if (value === "" || value === null || value === undefined) {
            this.setState({
                ['err_' + name]: true,
                [name]: value
            });
        }
        else {
            this.setState({
                [name]: event.target.value,
                ['err_' + name]: false
            });
        }

    };
    componentDidMount() { }
    render() {
        const { classes } = this.props;
        const { taskDate } = this.state;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={12} className={classes.container}>
                        <h2>Task Creator</h2>
                    </Grid>
                    <Grid item xs={12} className={classes.container}>
                        <TextField
                            required
                            id="taskname"
                            label="Task Name"
                            className={classes.textField}
                            value={this.state.taskName}
                            onChange={this.handleChange('taskName')}
                            margin="normal"
                            error={this.state.err_taskName}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.container}>
                        <TextField
                            id="taskDesc"
                            label="Task Description"
                            className={classes.textField}
                            value={this.state.taskdesc}
                            onChange={this.handleChange('taskdisc')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.container}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container className={classes.container}>
                                <DatePicker
                                    margin="normal"
                                    label="Date picker"
                                    value={taskDate}
                                    onChange={this.handleDateChange}
                                />

                                <TimePicker
                                    margin="normal"
                                    label="Time picker"
                                    value={taskDate}
                                    onChange={this.handleDateChange}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} className={classes.container}>
                        {/* <Grid container spacing={12}> */}
                        <Grid item style={{ marginTop: 40, marginBottom: 20 }}>
                            <Button variant="contained" color="primary" className={classes.textField}
                                onClick={this.addTask}>
                                Create Task
                                            </Button>
                        </Grid>
                        {/* </Grid> */}
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    addTask: (d) => {
        dispatch({ type: "ADD_TASK", payload: d });
    }
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(TaskCreator));