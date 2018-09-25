import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { refreshTokenRequested } from '../actions';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  }
});

class Auth extends Component {
  componentDidMount() {
    const { verify } = this.props;
    const data = localStorage.getItem('mytoken');
    if (data) {
      const { token } = JSON.parse(data);
      // tokenの検証
      verify(token);
    }
  }

  render() {
    const {
      classes,
      authenticate: {
        token,
        requesting,
        valid,
      },
      children,
    } = this.props;

    if (token && valid) {
      return children;
    } else if (requesting) {
      return (
        <div className={classes.root}>
          <CircularProgress
            className={classes.progress}
            style={{ color: purple[500] }}
            thickness={7}
          />
        </div>
      );
    }

    return (
      <Redirect to="/login" />
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.shape().isRequired,
  authenticate: PropTypes.shape().isRequired,
  verify: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  authenticate: state.authenticate,
});

const mapDispatchToProps = dispatch => ({
  verify: token => dispatch(refreshTokenRequested({ token })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Auth)
  )
);
