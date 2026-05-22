import { databases } from "../appwrite/config";
import { ID, Query } from "appwrite";

const DATABASE_ID = "69fe268e001d76dc66d3";
const TOKEN_COLLECTION_ID =
  "notification_tokens";

export const saveNotificationToken =
  async (userId, token) => {
    try {
      const existing =
        await databases.listDocuments(
          DATABASE_ID,
          TOKEN_COLLECTION_ID,
          [
            Query.equal("userId", userId),
            Query.equal("fcmToken", token),
          ]
        );

      if (existing.documents.length > 0) {
        return;
      }

      await databases.createDocument(
        DATABASE_ID,
        TOKEN_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          fcmToken: token,
          device: navigator.userAgent,
          createdAt:
            new Date().toISOString(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };