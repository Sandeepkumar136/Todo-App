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
      if (!currentUser) return;

      const token =
        await requestNotificationPermission();

      if (token) {
        await saveNotificationToken(
          currentUser.$id,
          token
        );
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
      await signupUser(
        name,
        email,
        password
      );

      const currentUser =
        await getCurrentUser();

      setUser(currentUser);

      registerNotification(currentUser);
    } catch (error) {
      throw error;
    }
  };

  const login = async (
    email,
    password
  ) => {
    try {
      await loginUser(
        email,
        password
      );

      const currentUser =
        await getCurrentUser();

      setUser(currentUser);

      registerNotification(currentUser);
    } catch (error) {
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

export const useAuth = () => useContext(AuthContext);