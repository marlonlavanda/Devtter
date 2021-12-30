import { getApps, initializeApp } from "firebase/app"
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAaPMUVhSExNNPwEI7iEGdcJp50Yel-_DU",
  authDomain: "devtter-7715d.firebaseapp.com",
  projectId: "devtter-7715d",
  storageBucket: "devtter-7715d.appspot.com",
  messagingSenderId: "843063910207",
  appId: "1:843063910207:web:999479a8107439c1157d8a",
}

!getApps().length && initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    uid,
    avatar: photoURL,
    userName: displayName,
    email,
  }
}

export const onAuthStateChanged = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  // const githubProvider =  new firebase.auth.GithubAuthProvider();
  return signInWithPopup(auth, new GithubAuthProvider())
}

export const addDevit = ({ userName, userId, avatar, content }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  return getDocs(collection(db, "devits")).then(({ docs }) => {
    return docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const date = new Date(createdAt.seconds * 1000)
      const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(date)

      return {
        ...data,
        id,
        createdAt: normalizedCreatedAt,
      }
    })
  })
}
