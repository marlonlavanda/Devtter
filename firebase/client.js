import { getApps, initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaPMUVhSExNNPwEI7iEGdcJp50Yel-_DU",
  authDomain: "devtter-7715d.firebaseapp.com",
  projectId: "devtter-7715d",
  storageBucket: "devtter-7715d.appspot.com",
  messagingSenderId: "843063910207",
  appId: "1:843063910207:web:999479a8107439c1157d8a"
};

!getApps().length && initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

const mapUserFromFirebaseAuthToUser = (user) => {
  const {displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email
  }
}

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged(user => {
    console.log(user);
    if(user !== null ){

      const normalizedUser = mapUserFromFirebaseAuthToUser(user)
      onChange(normalizedUser)
    }
  })
}

export const loginWithGitHub = () => {
  // const githubProvider =  new firebase.auth.GithubAuthProvider();
  return signInWithPopup(auth, new GithubAuthProvider())
}