import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
var moment = require('moment');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    taskContainer: {
        display: 'flex',
    }
});


class TaskComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskList: []
        }
    }

    componentDidMount() { }
    render() {
        const { task,classes } = this.props;
        return (
            <div>
                <Grid container spacing={16} justify={"space-around"} alignItems={'center'} >
                    <Grid item >
                        {task.taskName}
                    </Grid>

                    <Grid item >
                        {/* moment("2015-01-16T12:00:00").format("hh:mm:ss a") */}
                        {moment(new Date(task.taskDate)).format("hh:mm:ss a")}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(TaskComponent);