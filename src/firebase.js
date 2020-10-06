import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDn9cKyhZlDtTXwcT3Oo9xnUDLHaOwCNCM",
  authDomain: "womanempower-6376e.firebaseapp.com",
  databaseURL: "https://womanempower-6376e.firebaseio.com",
  projectId: "womanempower-6376e",
  storageBucket: "womanempower-6376e.appspot.com",
  messagingSenderId: "441120999614",
  appId: "1:441120999614:web:c7855cb4d495e65d1af6ef"
};

  let db  = firebase.initializeApp(firebaseConfig);

  export default db