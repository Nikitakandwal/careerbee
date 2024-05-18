import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyBKT3BBhx22R2WLr3BRfvdMHy1-9_fUsKg",
  authDomain: "expo-login-543b1.firebaseapp.com",
  projectId: "expo-login-543b1",
  storageBucket: "expo-login-543b1.appspot.com",
  messagingSenderId: "461986594919",
  appId: "1:461986594919:web:ead8f127a3ed37fe2e94c2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { firebaseConfig, auth, provider }; // Exporting auth and provider

//android: 75448086380-g107gh1og0v7heo01rc3rf0aau5d2rpu.apps.googleusercontent.com
