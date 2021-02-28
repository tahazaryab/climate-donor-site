import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const initFirebase = async() => {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch(err){
  
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(err.message)) {
      // eslint-disable-next-line no-console
      console.error('Firebase admin initialization error', err.stack);
    }
  
  }
}


/*Attempts to authenticate a user with a given email and password.*/
export const signIn = async (email, password) => {
    initFirebase();   
    
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log("Signed in!");
    })
    .catch((error) => {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Error " + errorCode + ": " + errorMessage);

      // TODO: show error on UI
    });
};

export const signUp = async (email, password) => {
  initFirebase();

  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    let userId = user.uid;
    // userId -> user type, interests, etc. 
    // continue with sign up process, add fields (not username and password related) to our own firestore table.
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    console.log("Error " + errorCode + ": " + errorMessage);
  });

}

export default firebase;