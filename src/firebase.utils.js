import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const prodConfig = {
    apiKey: "AIzaSyAA_UAzrbj8R3j7I_oqgve-YyjaVrCDKpM",
    authDomain: "raahee-web-calendar-e9d76.firebaseapp.com",
    projectId: "raahee-web-calendar-e9d76",
    storageBucket: "raahee-web-calendar-e9d76.appspot.com",
    messagingSenderId: "1536936436",
    appId: "1:1536936436:web:b7dc40e24245eb7bffd1a1",
    measurementId: "G-B2KHFP7SZZ",
};

// DEV
const devConfig = {
    apiKey: "AIzaSyAA_UAzrbj8R3j7I_oqgve-YyjaVrCDKpM",
    authDomain: "raahee-web-calendar-e9d76.firebaseapp.com",
    projectId: "raahee-web-calendar-e9d76",
    storageBucket: "raahee-web-calendar-e9d76.appspot.com",
    messagingSenderId: "1536936436",
    appId: "1:1536936436:web:b7dc40e24245eb7bffd1a1",
    measurementId: "G-B2KHFP7SZZ",
};

console.log(process.env.REACT_APP_PROD);
const config = process.env.REACT_APP_PROD === 'true' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp();
export const FieldValue = firebase.firestore.FieldValue;
export const timestampFromDate = firebase.firestore.Timestamp.fromDate;
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      if (result.additionalUserInfo.isNewUser) {
        firestore.collection('users').doc(result.user.uid).set({
          bio: 'Hi there!',
          credits: 75,
          current_psychologist: null,
          displayName: result.user.displayName,
          email: result.user.email,
          gender: '',
          id: result.user.uid,
          paid: false,
          profileup: false,
          timestamp: serverTimeStamp,
        });
      }
    })
    .catch((err) => console.error(err));
};

export default firebase;
