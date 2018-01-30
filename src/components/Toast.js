import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class Toast extends React.Component {
  componentDidMount() {
    setTimeout(() => this.props.onDismiss(), 1000);
  }

  render() {
    return (
      <View style={[styles.root, styles.top, this.props.style]}>
        <Text style={{ color: 'white' }}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#00000088',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center'
  },
  top: {
    position: 'absolute',
    top: 0,
    margin: 'auto',
    marginTop: 80
  }
});

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Toast;
