import firebase from 'firebase';
import { projectId, apiKey, authDomain } from '../Config';

require('firebase/firestore');

console.log('env', process.env);

const config = {
  projectId: projectId,
  apiKey: apiKey,
  authDomain: authDomain
};
firebase.initializeApp(config);

export default firebase.firestore();
