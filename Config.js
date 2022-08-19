import * as firebase from 'firebase'




const firebaseConfig = {

  apiKey: "AIzaSyBq91It2JlmrYxrpEkwBQE-edKh7JUfgjE",

  authDomain: "hoje-a3909.firebaseapp.com",

  databaseURL: "https://hoje-a3909-default-rtdb.firebaseio.com",

  projectId: "hoje-a3909",

  storageBucket: "hoje-a3909.appspot.com",

  messagingSenderId: "675147576909",

  appId: "1:675147576909:web:58dad4c2812f6f22220e04"

  };

 

 

 

  if (!firebase.apps.length){

    firebase.initializeApp(firebaseConfig);

   

  }

    const db = firebase.firestore();

    const storage = firebase.storage();

   

  export {firebase, db, storage};
