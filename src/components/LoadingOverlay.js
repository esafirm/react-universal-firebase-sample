import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

class LoadingOverlay extends React.Component {
  render() {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: '#000000AA', justifyContent: 'center' }
        ]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default LoadingOverlay;
