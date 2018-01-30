import firebase from 'firebase';

require('firebase/firestore');

console.log('env', process.env);

const config = {
  projectId: process.env.REACT_APP_FB_PROJECT_ID
};
firebase.initializeApp(config);

console.log('Firebase', firebase);
console.log('Firestore', firebase.firestore());

export default firebase.firestore();
