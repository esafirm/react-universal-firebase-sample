import { REACT_APP_FB_PROJECT_ID } from 'react-native-dotenv';
import { Platform } from 'react-native';

const projectId =
  Platform.OS === 'web'
    ? process.env.REACT_APP_FB_PROJECT_ID
    : REACT_APP_FB_PROJECT_ID;

export { projectId };
