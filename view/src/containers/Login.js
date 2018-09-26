import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import { signIn, refreshTokenRequested } from '../actions';

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
  progressRoot: {
    width: '100%',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: purple[500],
  }
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

  componentWillMount() {
    const { verify } = this.props;
    // tokenをlocalStorageから取得
    const data = localStorage.getItem('mytoken');
    if (data) {
      const { token } = JSON.parse(data);
      // tokenを検証
      verify(token);
    }
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

  /**
   * インジケータの表示
   */
  renderProgress() {
    const {
      classes,
      authenticate: { requesting }
    } = this.props;

    if (requesting) {
      return (
        <CircularProgress
          className={classes.progress}
          thickness={7}
        />
      );
    }

    return null;
  }

  render() {
    const {
      classes,
      authenticate: {
        token,
        requesting,
      },
      t,
    } = this.props;

    // 認証済みならトップ画面に遷移
    if (token) {
      return (
        <Redirect to="/" />
      );
    }

    const { username, password } = this.state;

    // ログイン画面の表示
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            {/* ロゴ */}
            <Typography variant="headline">
              {t('app_name')}
            </Typography>
            {/* インジケータ */}
            <div className={classes.progressRoot}>
              {this.renderProgress()}
            </div>
            {/* ログインフォーム */}
            <form
              className={classes.form}
              onSubmit={this.handleSignIn}
            >
              {/* ユーザー名 */}
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
              {/* パスワード */}
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
              {/* ログインボタン */}
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                disabled={requesting}
              >
                {t('signin')}
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
  verify: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticate: state.authenticate,
});

const mapDispatchToProps = dispatch => ({
  signIn: (username, password) => dispatch(signIn({ username, password })),
  verify: token => dispatch(refreshTokenRequested({ token })),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    translate()(
      withStyles(styles)(Login)
    )
  )
);
