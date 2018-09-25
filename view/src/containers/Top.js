import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { signOut } from '../actions';

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
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});

const Top = ({
  authenticate: { username, token },
  classes,
  signOut,
}) => (
  <React.Fragment>
    <CssBaseline />
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography variant="headline">{username}</Typography>
        <Typography variant="headline">{token}</Typography>
        <Button
          type="button"
          fullWidth
          variant="raised"
          color="primary"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </Paper>
    </main>
  </React.Fragment>
);

Top.propTypes = {
  classes: PropTypes.shape().isRequired,
  authenticate: PropTypes.shape().isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticate: state.authenticate,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Top)
  )
);
