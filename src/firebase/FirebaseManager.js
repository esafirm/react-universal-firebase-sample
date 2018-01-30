import firebase from 'firebase';
import { projectId } from '../Config';

require('firebase/firestore');

console.log('env', process.env);

const config = {
  projectId: projectId
};
firebase.initializeApp(config);

console.log('Firebase', firebase);
console.log('Firestore', firebase.firestore());

export default firebase.firestore();
