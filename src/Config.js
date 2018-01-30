import {
  REACT_APP_FB_PROJECT_ID,
  REACT_APP_FB_API_KEY,
  REACT_APP_FB_AUTH_DOMAIN
} from 'react-native-dotenv';
import { Platform } from 'react-native';

const projectId =
  Platform.OS === 'web'
    ? process.env.REACT_APP_FB_PROJECT_ID
    : REACT_APP_FB_PROJECT_ID;

const apiKey =
  Platform.OS === 'web'
    ? process.env.REACT_APP_FB_API_KEY
    : REACT_APP_FB_API_KEY;

const authDomain =
  Platform.OS === 'web'
    ? process.env.REACT_APP_FB_AUTH_DOMAIN
    : REACT_APP_FB_AUTH_DOMAIN;

export { projectId, apiKey, authDomain };
