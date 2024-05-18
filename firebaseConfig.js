import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { firebaseConfig, auth };  
