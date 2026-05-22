importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC9ZW6YsKt5Kp1ce3-tBTnUb8huyDRYwAM",
  authDomain: "todo-app-8f676.firebaseapp.com",
  projectId: "todo-app-8f676",
  storageBucket: "todo-app-8f676.firebasestorage.app",
  messagingSenderId: "554981156073",
  appId: "1:554981156073:web:3bcd0eeaf24f850e79fc78",
});

const messaging = firebase.messaging();