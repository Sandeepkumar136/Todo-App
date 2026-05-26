import React, {
  useEffect,
  useState,
} from "react";

import { useAuth } from "../Context/AuthContext";

import {
  getNotifications,
  deleteNotification,
} from "../Contents/NotificationHistoryService";

const Notifications = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (user?.$id) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response =
        await getNotifications(user.$id);

      setNotifications(
        response.documents || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter(
          (item) => item.$id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2>Loading notifications...</h2>;
  }

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        notifications.map((item) => (
          <div
            key={item.$id}
            className="notification-card"
          >
            <div>
              <h3>{item.title}</h3>
              <p>{item.message}</p>
              <small>{item.type}</small>
            </div>

            <button
              onClick={() =>
                handleDelete(item.$id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;