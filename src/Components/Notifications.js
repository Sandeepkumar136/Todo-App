import React, {
  useEffect,
  useState,
  useCallback,
} from "react";

import { useAuth } from "../Context/AuthContext";

import {
  getNotifications,
  deleteNotification,
} from "../Contents/NotificationHistoryService";

import Loader from "../Contents/Loader";

const Notifications = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [touchStartX, setTouchStartX] =
    useState(null);

  const fetchNotifications =
    useCallback(async () => {
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
    }, [user]);

  useEffect(() => {
    if (user?.$id) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  const handleDelete = async (id) => {
    setNotifications((prev) =>
      prev.filter(
        (item) => item.$id !== id
      )
    );

    try {
      await deleteNotification(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStartX(
      e.touches[0].clientX
    );
  };

  const handleTouchEnd = (e, id) => {
    if (!touchStartX) return;

    const touchEndX =
      e.changedTouches[0].clientX;

    const diff =
      touchStartX - touchEndX;

    if (diff > 120) {
      handleDelete(id);
    }

    setTouchStartX(null);
  };

  if (loading) {
    return (
      <div className="notifications-page">
        <Loader />
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p className="empty-state">
          No notifications found
        </p>
      ) : (
        notifications.map((item) => (
          <div
            key={item.$id}
            className="notification-card"
            onTouchStart={
              handleTouchStart
            }
            onTouchEnd={(e) =>
              handleTouchEnd(
                e,
                item.$id
              )
            }
          >
            <div className="notification-content">
              <h3>{item.title}</h3>
              <p>{item.message}</p>
              <small>{item.type}</small>
            </div>

            <button
              className="desktop-delete-btn"
              onClick={() =>
                handleDelete(item.$id)
              }
            >
              <i className="bx bx-trash"></i>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;