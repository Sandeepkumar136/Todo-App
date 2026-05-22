import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
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

      if (permission !== "granted") {
        return null;
      }

      const messaging = getMessaging(app);

      const token = await getToken(messaging, {
        vapidKey:
          "BA5anQMJ8IbNa5IuEDuulVMLtgVE9u1WI6yGB-xmRJ2me3pKEy81xuq-0jxHyjv12pTMcDi5WJ-AxGhUhtxliI8",
      });

      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const getForegroundMessage = () => {
  try {
    const messaging = getMessaging(app);

    onMessage(messaging, (payload) => {
      alert(payload.notification?.body);
    });
  } catch (error) {
    console.log(error);
  }
};