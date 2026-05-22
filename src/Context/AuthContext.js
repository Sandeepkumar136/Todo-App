import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../Auth/AuthService";

import { requestNotificationPermission } from "../firebase/firebase";
import { saveNotificationToken } from "../Contents/NotificationService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerNotification = async (currentUser) => {
    try {
      console.log("REGISTER NOTIFICATION START");

      if (!currentUser) {
        console.log("NO CURRENT USER");
        return;
      }

      console.log("USER FOUND:", currentUser.$id);

      const token =
        await requestNotificationPermission();

      console.log("TOKEN RECEIVED:", token);

      if (token) {
        await saveNotificationToken(
          currentUser.$id,
          token
        );

        console.log("TOKEN SAVED");
      } else {
        console.log("NO TOKEN GENERATED");
      }
    } catch (error) {
      console.log(
        "Notification error:",
        error
      );
    }
  };

  const signup = async (
    name,
    email,
    password
  ) => {
    try {
      console.log("SIGNUP START");

      await signupUser(
        name,
        email,
        password
      );

      console.log("SIGNUP SUCCESS");

      const currentUser =
        await getCurrentUser();

      console.log("CURRENT USER:", currentUser);

      setUser(currentUser);

      await registerNotification(currentUser);
    } catch (error) {
      console.log("SIGNUP ERROR:", error);
      throw error;
    }
  };

  const login = async (
    email,
    password
  ) => {
    try {
      console.log("LOGIN START");

      await loginUser(
        email,
        password
      );

      console.log("LOGIN SUCCESS");

      const currentUser =
        await getCurrentUser();

      console.log("CURRENT USER:", currentUser);

      setUser(currentUser);

      await registerNotification(currentUser);
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser =
          await getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};