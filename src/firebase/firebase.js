import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC9ZW6YsKt5Kp1ce3-tBTnUb8huyDRYwAM",
  authDomain: "todo-app-8f676.firebaseapp.com",
  projectId: "todo-app-8f676",
  storageBucket: "todo-app-8f676.firebasestorage.app",
  messagingSenderId: "554981156073",
  appId: "1:554981156073:web:3bcd0eeaf24f850e79fc78",
};

const app = initializeApp(firebaseConfig);

export const requestNotificationPermission =
  async () => {
    try {
      if (!("Notification" in window)) {
        return null;
      }

      const permission =
        await Notification.requestPermission();

      console.log(
        "Permission:",
        permission
      );

      if (permission !== "granted") {
        return null;
      }

      const registration =
        await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );

      await navigator.serviceWorker.ready;

      const messaging =
        getMessaging(app);

      const token = await getToken(
        messaging,
        {
          vapidKey:
            "BA5anQMJ8IbNa5IuEDuulVMLtgVE9u1WI6yGB-xmRJ2me3pKEy81xuq-0jxHyjv12pTMcDi5WJ-AxGhUhtxliI8",
          serviceWorkerRegistration:
            registration,
        }
      );

      console.log("FCM TOKEN:", token);

      return token;
    } catch (error) {
      console.log(
        "Firebase error:",
        error
      );
      return null;
    }
  };

export const getForegroundMessage = async () => {
  try {
    const supported =
      await isSupported();

    if (!supported) return;

    const messaging = getMessaging(app);

    onMessage(messaging, (payload) => {
      console.log(
        "Foreground notification:",
        payload
      );

      alert(
        payload.notification?.body ||
          "New notification"
      );
    });
  } catch (error) {
    console.log(error);
  }
};