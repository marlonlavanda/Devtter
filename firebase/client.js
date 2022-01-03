import { getApps, initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
  orderBy,
  query,
  onSnapshot,
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
const storage = getStorage(app)

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

export const addDevit = ({ userName, userId, img, avatar, content }) => {
  return addDoc(collection(db, "devits"), {
    avatar,
    content,
    userId,
    img,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

export const listenLatestDevits = (callback) => {
  const devits = collection(db, "devits")
  const orderedDevits = query(devits, orderBy("createdAt", "desc"))

  return onSnapshot(orderedDevits, (snapshot) => {
    // const newDevits = doc.map(docs => mapDevitFromFirebaseToDevitObject(docs))
    const newDevits = snapshot.map(mapDevitFromFirebaseToDevitObject)
    callback(newDevits)
  })
}

export const fetchLatestDevits = () => {
  const devits = collection(db, "devits")
  const orderedDevits = query(devits, orderBy("createdAt", "desc"))
  return getDocs(orderedDevits).then(({ docs }) => {
    return docs.map(mapDevitFromFirebaseToDevitObject)
  })
}

export const uploadImage = (file) => {
  const reference = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(reference, file)
  return task
}
