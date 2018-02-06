import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import {
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';
import LoadingOverlay from './components/LoadingOverlay';
import Button from './components/Button';
import Toast from './components/Toast';
import firestore from './firebase/FirebaseManager';

if (Platform.OS === 'android') {
  // Firebase Fix
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(body) {
    if (body === '') {
      originalSend.call(this);
    } else {
      originalSend.call(this, body);
    }
  };
}

class BlinkingTestView extends Component {
  state = {
    blink: new Animated.Value(1),
    hidden: false
  };

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation() {
    Animated.timing(this.state.blink, {
      toValue: this.state.hidden ? 1 : 0,
      duration: 1000
    }).start(() => {
      this.setState(prev => ({ hidden: !prev.hidden }), this.startAnimation);
    });
  }

  render() {
    return (
      <Animated.Text {...this.props} style={{ opacity: this.state.blink }} />
    );
  }
}

class App extends Component {
  state = {
    quotes: [],
    quoteInput: '',
    isLoading: false,
    showToast: false,
    toastText: ''
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.subscription = this.subscribeToData();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription();
    }
  }

  subscribeToData() {
    return firestore.collection('quotes').onSnapshot(querySnapshot => {
      const quotes = [];
      querySnapshot.forEach(doc => quotes.push(doc.data().quote));
      this.setState({
        quotes: quotes
      });
      console.log('quotes', quotes);
    });
  }

  addData = () => {
    const textInput = this.state.quoteInput;
    if (!textInput) {
      this.showErrorToast();
      return;
    }

    this.setState({ isLoading: true });

    firestore
      .collection('quotes')
      .add({ quote: textInput })
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);

        this._input.setNativeProps({ text: '' });
        this.showSuccessToast();
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  showSuccessToast() {
    this.setState({
      isLoading: false,
      showToast: true,
      toastText: 'Add data success!'
    });
  }

  showErrorToast() {
    this.setState({ showToast: true, toastText: 'Input cannot be empty!' });
  }

  render() {
    const isIos = Platform.OS === 'ios';

    return (
      <View style={{ padding: 20, flex: 1 }}>
        {isIos ? <View style={{ height: 32 }} /> : null}

        <BlinkingTestView style={{ fontSize: 22 }}>
          Quote Machine 🤖
        </BlinkingTestView>
        <TextInput
          ref={el => (this._input = el)}
          style={{ marginBottom: 20, marginTop: 10 }}
          placeholder={'Insert your quote here...'}
          onChangeText={text => this.setState({ quoteInput: text })}
        />

        <Button title="Add Data" onPress={this.addData} />

        <View style={{ marginTop: 20 }}>
          {this.state.quotes.map((q, index) => (
            <Text style={styles.item} key={index}>
              {q}
            </Text>
          ))}
        </View>

        {this.state.isLoading ? <LoadingOverlay /> : null}

        {this.state.showToast ? (
          <Toast
            message={this.state.toastText}
            onDismiss={() => this.setState({ showToast: false })}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#3331',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    fontStyle: 'italic'
  }
});

export default App;
