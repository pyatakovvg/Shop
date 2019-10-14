
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from './Component';

import { getProfile, changeState, signIn, signOut } from '../ducks/commands';


const mapStateToProps = (store) => {
  const App = store['application'];
  return {
    isInit: App['isInit'],
    isAuth: App['isAuth'],
    profile: App['profile'],
  };
};

const mapActionsToProps = dispatch => ({
  signIn: bindActionCreators(signIn, dispatch),
  signOut: bindActionCreators(signOut, dispatch),
  getProfile: bindActionCreators(getProfile, dispatch),
  changeState: bindActionCreators(changeState, dispatch),
});

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Component));
