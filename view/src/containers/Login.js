import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { signIn } from '../actions';

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
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignIn(e) {
    e.preventDefault();
    const { signIn } = this.props;
    const { username, password } = this.state;

    signIn(username, password);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const obj = {};
    obj[name] = value;

    this.setState(obj);
  }

  render() {
    const {
      classes,
      authenticate: { token },
    } = this.props;

    if (token) {
      return (
        <Redirect to="/" />
      );
    }

    const { username, password } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline">Sign in</Typography>
            <form
              className={classes.form}
              onSubmit={this.handleSignIn}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">UserName</InputLabel>
                <Input
                  id="username"
                  name="username"
                  value={username}
                  autoFocus
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="off"
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.shape().isRequired,
  authenticate: PropTypes.shape().isRequired,
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticate: state.authenticate,
});

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn({ username, password })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(Login)
  )
);
