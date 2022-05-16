import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Confetti from 'react-native-confetti';
class AppConfetti extends Component {
  componentDidMount() {
    if (this._confettiView) {
      this._confettiView.startConfetti();
    }
  }

  componentWillUnmount() {
    if (this._confettiView) {
      this._confettiView.stopConfetti();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Confetti ref={node => (this._confettiView = node)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppConfetti;
