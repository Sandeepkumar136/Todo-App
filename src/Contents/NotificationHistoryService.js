import { databases } from "../appwrite/config";
import { Query } from "appwrite";

const DATABASE_ID = "69fe268e001d76dc66d3";
const NOTIFICATIONS_COLLECTION_ID = "notifications";

export const getNotifications = async (userId) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"),
        Query.limit(100),
      ]
    );

    console.log("Notifications:", response);

    return response;
  } catch (error) {
    console.log(
      "Get notifications error:",
      error
    );
    throw error;
  }
};

export const deleteNotification = async (
  notificationId
) => {
  try {
    return await databases.deleteDocument(
      DATABASE_ID,
      NOTIFICATIONS_COLLECTION_ID,
      notificationId
    );
  } catch (error) {
    console.log(
      "Delete notification error:",
      error
    );
    throw error;
  }
};