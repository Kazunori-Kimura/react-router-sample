import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { signOut } from '../actions';

const styles = {
  title: {
    textDecoration: 'none',
  },
  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    textDecoration: 'none',
  }
};

class AppHeader extends Component {
  state = {
    lang: 'ja',
    anchor: null,
    menu: '', // 表示中のメニュー名
  };

  componentWillMount() {
    const lang = localStorage.getItem('lang');
    if (lang) {
      const { i18n } = this.props;
      i18n.changeLanguage(lang);
      this.setState({ lang });
    }
  }

  handleMenu = (event) => {
    const target = event.currentTarget;

    this.setState({
      anchor: target,
      menu: target.name,
    });
  }

  handleChoiceLanguage = (event) => {
    const { i18n } = this.props;
    const target = event.currentTarget;

    // i18nextの言語切替
    const lang = target.getAttribute('name');
    i18n.changeLanguage(lang);
    // localStorageに保持
    localStorage.setItem('lang', lang);
    // state更新
    this.setState({
      lang,
    });
    // メニューを閉じる
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      anchor: null,
      menu: '',
    });
  };

  render() {
    const {
      t,
      classes,
      authenticate: { username },
      signOut,
    } = this.props;
    const { lang, anchor, menu } = this.state;

    return (
      <AppBar
        position="absolute"
        color="primary"
      >
        <Toolbar>
          <Typography
            variant="title"
            color="inherit"
            className={classes.title}
            component={Link}
            to="/"
          >
            {t('app_name')}
          </Typography>
          {/* 各画面へのリンク */}
          <div className={classes.nav}>
            {/* 清掃管理 */}
            <Button
              name="cleaning"
              onClick={this.handleMenu}
              color="inherit"
            >
              {t('menu.cleaning.root')}
            </Button>
            <Menu
              id="menu-cleaning"
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menu === 'cleaning'}
              onClose={this.handleClose}
            >
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/cleaning/list"
                onClick={this.handleClose}
              >
                {t('menu.cleaning.list')}
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/cleaning/create"
                onClick={this.handleClose}
              >
                {t('menu.cleaning.edit')}
              </MenuItem>
            </Menu>
            {/* お知らせ管理 */}
            <Button
              name="information"
              onClick={this.handleMenu}
              color="inherit"
            >
              {t('menu.information.root')}
            </Button>
            <Menu
              id="menu-info"
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menu === 'information'}
              onClose={this.handleClose}
            >
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/info/list"
                onClick={this.handleClose}
              >
                {t('menu.information.list')}
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/info/create"
                onClick={this.handleClose}
              >
                {t('menu.information.edit')}
              </MenuItem>
            </Menu>
            {/* スタッフ管理 */}
            <Button
              name="staff"
              onClick={this.handleMenu}
              color="inherit"
            >
              {t('menu.staff.root')}
            </Button>
            <Menu
              id="menu-staff"
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menu === 'staff'}
              onClose={this.handleClose}
            >
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/staff/list"
                onClick={this.handleClose}
              >
                {t('menu.staff.list')}
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/staff/create"
                onClick={this.handleClose}
              >
                {t('menu.staff.edit')}
              </MenuItem>
            </Menu>
            {/* マスター管理 */}
            <Button
              name="config"
              onClick={this.handleMenu}
              color="inherit"
            >
              {t('menu.config.root')}
            </Button>
            <Menu
              id="menu-config"
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menu === 'config'}
              onClose={this.handleClose}
            >
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/config/app"
                onClick={this.handleClose}
              >
                {t('menu.config.app')}
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/config/room"
                onClick={this.handleClose}
              >
                {t('menu.config.room')}
              </MenuItem>
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to="/config/report"
                onClick={this.handleClose}
              >
                {t('menu.config.report')}
              </MenuItem>
            </Menu>
          </div>
          <div>
            {/* 言語選択 */}
            <Button
              name="lang"
              onClick={this.handleMenu}
              color="inherit"
            >
              {`${t('lang.placeholder')}:${t(`lang.${lang}`)}`}
            </Button>
            <Menu
              id="menu-lang"
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menu === 'lang'}
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
            <Button
              name="account"
              color="inherit"
              onClick={this.handleMenu}
            >
              <AccountCircle />
              {username}
            </Button>
            <Menu
              id="menu-account"
              anchorEl={anchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menu === 'account'}
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
                onClick={signOut}
              >
                {t('signout')}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

AppHeader.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape().isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(
  translate()(withStyles(styles)(AppHeader))
);
