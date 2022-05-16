import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import {loadQuestionAll} from '../store/actions/question';
import {loadFolder} from '../store/actions/question/folders';

const DefaultLayout = ({children, loadQuestionAll, loadFolder}) => {
  useEffect(() => {
    loadFolder();
    loadQuestionAll();
  }, []);

  return <View style={[{flex: 1}]}>{children}</View>;
};

const mapStateToProps = state => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  loadQuestionAll: payload => dispatch(loadQuestionAll(payload)),
  loadFolder: payload => dispatch(loadFolder(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultLayout);
