import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          this.props.style,
          { backgroundColor: 'steelblue', padding: 10 }
        ]}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
