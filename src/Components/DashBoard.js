import React from 'react';
import TaskCreator from './task/taskCreator'
import TaskComponent from './task/taskComponent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Auth from './Auth';

var moment = require('moment');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    taskCreator: {
        display: 'flex',
        alignItems: 'center',
        borderRight: '1px solid grey',
        height: '100vh'
    },
    asd: {
        display: 'flex',
        alignContent: 'space-between',
        flexWrap: 'wrap'
    },
    taskList: {
        marginTop: 20,
        marginBottom: 20
    }
});



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: [...this.props.taskList],
            isFiltering: false
        }
        this.switchTask = this.switchTask.bind(this);
    }

    logout = () => {
        Auth.logout(() => {
            this.props.history.push("/")
        })
    }

    switchTask = (tasktype) => {
        if (tasktype === "all") {
            this.setState({
                taskList: [...this.props.taskList],
                isFiltering: true
            })
        } else {
            let tempList = this.state.taskList;
            let newList = tempList.filter((task) => (
                moment(new Date(task.taskDate)).isSameOrAfter(new Date())
            ));
            this.setState({
                taskList: [...newList],
                isFiltering: true
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps, prevState);
        if (!prevState.isFiltering) {
            return { taskList: [...nextProps.taskList], isFiltering: false };
        }
        return {
            isFiltering: false
        };
    }

    // componentDidMount() {
    //     this.setState({
    //         taskList:[...this.props.taskList]
    //     })
    //  }
    render() {
        const { taskList } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} >
                        <Button variant="contained" color="primary"
                            onClick={() => this.logout()}
                        >
                            Log out
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={8} className={classes.taskCreator}>
                        <TaskCreator />
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={16}>
                            <Grid item xs={12} className={classes.taskList} >
                                <Grid container spacing={16} justify={"space-between"} alignItems={'center'}>
                                    <Grid item >
                                        <Button variant="contained" color="primary"
                                            onClick={() => this.switchTask("upcomings")}
                                        >
                                            Upcomings
                                        </Button>
                                    </Grid>
                                    <Grid item >
                                        <Button variant="contained" color="primary"
                                            onClick={() => this.switchTask("all")}
                                        >
                                            All
                                         </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={32} direction={'column'} justify={'space-between'}>
                                    {
                                        taskList.map((value) => (
                                            <Grid key={value.taskName} item>
                                                <Paper elevation={2}>
                                                    <TaskComponent task={value} />
                                                </Paper>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const mapStoreToProps = store => (
    { taskList: store.todos }
);


export default connect(mapStoreToProps)(withStyles(styles)(Home));