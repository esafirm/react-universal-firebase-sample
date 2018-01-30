import React, { Component } from 'react';
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

        <Text style={{ fontSize: 22 }}>Quote Machine 🤖</Text>
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
