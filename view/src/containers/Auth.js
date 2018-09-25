import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Auth extends Component {
  render() {
    const {
      authenticate: { token },
      children,
    } = this.props;

    if (token) {
      return children;
    }

    return (
      <Redirect to="/login" />
    );
  }
}

Auth.propTypes = {
  authenticate: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  authenticate: state.authenticate,
});

export default withRouter(connect(mapStateToProps)(Auth));
