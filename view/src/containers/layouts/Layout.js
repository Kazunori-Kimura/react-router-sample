import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';

import AppHeader from '../../components/AppHeader';
import Top from '../Top';
// import PasswordReset from '../PasswordReset';
// import PasswordChange from '../PasswordChange';
import CleaningList from '../CleaningList';
import CleaningForm from '../CleaningForm';
import InformationList from '../InformationList';
import InformationForm from '../InformationForm';
import StaffList from '../StaffList';
import StaffForm from '../StaffForm';
import ConfigApp from '../ConfigApp';
import ConfigRoom from '../ConfigRoom';
import ConfigReport from '../ConfigReport';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: '100vw',
    height: '100vh',
    padding: theme.spacing.unit * 3,
    overflow: 'auto',
  }
});

const Layout = ({ classes }) => (
  <React.Fragment>
    <CssBaseline />
    <div className={classes.root}>
      <AppHeader />
      <div className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route exact path="/" component={Top} />
          <Route path="/cleaning/list" component={CleaningList} />
          <Route path="/cleaning/create" component={CleaningForm} />
          <Route path="/cleaning/edit/:id" component={CleaningForm} />
          <Route path="/info/list" component={InformationList} />
          <Route path="/info/create" component={InformationForm} />
          <Route path="/info/edit/:id" component={InformationForm} />
          <Route path="/staff/list" component={StaffList} />
          <Route path="/staff/create" component={StaffForm} />
          <Route path="/staff/edit/:id" component={StaffForm} />
          <Route path="/config/app" component={ConfigApp} />
          <Route path="/config/room" component={ConfigRoom} />
          <Route path="/config/report" component={ConfigReport} />
        </Switch>
      </div>
    </div>
  </React.Fragment>
);

Layout.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Layout);
