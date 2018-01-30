import React, { Component } from 'react';
import { Text, Image, View, TextInput, StyleSheet } from 'react-native';
import LoadingOverlay from './components/LoadingOverlay';
import Button from './components/Button';
import Toast from './components/Toast';
import firestore from './firebase/FirebaseManager';

class App extends Component {
  state = {
    quotes: [],
    quoteInput: '',
    isLoading: false,
    showToast: false
  };

  constructor(props) {
    super(props);
  }

  fetchData = () => {
    firestore
      .collection('quote')
      .get()
      .then(snapshot => {
        console.log('Fetching success!', snapshot);

        const result = new Array();
        snapshot.forEach(s => result.push(s.data().quote));
        console.log('result', result);
        this.setState({
          quotes: result
        });
      });
  };

  addData = () => {
    this.setState({ isLoading: true });
    const input = { quote: this.state.quoteInput };
    firestore
      .collection('quote')
      .add(input)
      .then(docRef => {
        this.setState({ isLoading: false, showToast: true });
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    return (
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={{ fontSize: 22 }}>Quote Machine 🤖</Text>
        <TextInput
          style={{ marginBottom: 20, marginTop: 10 }}
          placeholder={'Insert your quote here...'}
          onChangeText={text => this.setState({ quoteInput: text })}
        />

        <Button style={styles.button} title="Add Data" onPress={this.addData} />

        <View style={{ marginTop: 20 }}>
          {this.state.quotes.map(q => <Text>{q}</Text>)}
        </View>

        {this.state.isLoading ? <LoadingOverlay /> : null}

        {this.state.showToast ? (
          <Toast
            message={'Add data succes!'}
            onDismiss={() => this.setState({ showToast: false })}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {}
});

export default App;
