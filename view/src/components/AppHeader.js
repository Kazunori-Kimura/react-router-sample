import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  title: {
    flexGrow: 1,
  }
};

class AppHeader extends Component {
  state = {
    lang: 'ja',
    anchorMenu: null,
    anchorAccount: null,
  };

  handleMenu = (event) => {
    const target = event.currentTarget;
    console.log('open menu:', target.name);

    switch (target.name) {
      case 'lang':
        this.setState({
          anchorMenu: target,
        });
        return;
      case 'account':
        this.setState({
          anchorAccount: target,
        });
        return;
      default:
        return;
    }
  }

  handleChoiceLanguage = (event) => {
    const target = event.currentTarget;
    console.log('choice language:', target.name);
    
    this.setState({
      lang: target.name,
    });
    // メニューを閉じる
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      anchorMenu: null,
      anchorAccount: null,
    });
  };

  render() {
    const { t, classes } = this.props;
    const { lang, anchorMenu, anchorAccount } = this.state;

    return (
      <AppBar position="absolute">
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            className={classes.title}
          >
            {t('app_name')}
          </Typography>
        </Toolbar>
        <div>
          {/* 言語選択 */}
          <Button
            name="lang"
            onClick={this.handleMenu}
            color="inherit"
          >
            {`${t('placeholder')}:${t(lang)}`}
          </Button>
          <Menu
            id="menu-lang"
            anchorEl={anchorMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorMenu)}
            onClose={this.handleClose}
          >
            <MenuItem
              name="en"
              onClick={this.handleChoiceLanguage}
            >
              {t('lang.en')}
            </MenuItem>
            <MenuItem
              name="ja"
              onClick={this.handleChoiceLanguage}
            >
              {t('lang.ja')}
            </MenuItem>
          </Menu>
          {/* アカウント */}
          <IconButton
            name="account"
            onClick={this.handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-account"
            anchorEl={anchorAccount}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorAccount)}
            onClose={this.handleClose}
          >
            <MenuItem
              name="mypage"
              onClick={this.handleClose}
            >
              {t('mypage')}
            </MenuItem>
            <MenuItem
              name="signout"
              onClick={this.handleClose}
            >
              {t('signout')}
            </MenuItem>
          </Menu>
        </div>
      </AppBar>
    );
  }
}

AppHeader.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default translate()(
  withStyles(styles)(AppHeader)
);
