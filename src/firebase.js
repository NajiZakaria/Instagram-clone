import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyEjUOlFgfu3_7owR7bB-2e2ZpzLmZarM",
    authDomain:"instagram-clone-2f842.firebaseapp.com",
    databaseURL: "https://instagram-clone-2f842.firebaseio.com",
    projectId: "instagram-clone-2f842",
    storageBucket: "instagram-clone-2f842.appspot.com",
    messagingSenderId: "1067978469005",
    appId: "1:1067978469005:web:eba26542f777b672903cc4",
    measurementId: "G-Y8W25MFW4L"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db =firebaseApp.firestore();
  const auth =firebase.auth()
  const storage =firebase.storage()

  export  {db,auth,storage};