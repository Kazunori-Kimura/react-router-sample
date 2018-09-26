import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 3,
  },
});

const CleaningForm = ({
  authenticate: { username },
  classes,
}) => (
  <main className={classes.layout}>
    <Paper className={classes.paper}>
      <Typography variant="headline">CleaningForm</Typography>
      <Typography variant="body1">{username}</Typography>
    </Paper>
  </main>
);

CleaningForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  authenticate: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  authenticate: state.authenticate,
});

export default connect(mapStateToProps)(
  withStyles(styles)(CleaningForm)
);
