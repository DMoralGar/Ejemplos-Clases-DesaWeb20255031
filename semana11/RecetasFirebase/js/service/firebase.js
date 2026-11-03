// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
    import { getFirestore } from 'https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js';
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries


  const firebaseConfig = {
    apiKey: "AIzaSyBukG-3aB0cw7Z0NegCxD28F6rgDmfC-qE",
    authDomain: "pruebas--recetas.firebaseapp.com",
    projectId: "pruebas--recetas",
    storageBucket: "pruebas--recetas.firebasestorage.app",
    messagingSenderId: "742990719793",
    appId: "1:742990719793:web:04911a7cbc21ecef445e10"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db=getFirestore(app);
  export {db};