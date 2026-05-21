import { databases } from "../appwrite/config";
import { ID, Query } from "appwrite";

const DATABASE_ID = "69fe268e001d76dc66d3";
const TASKS_COLLECTION_ID = "tasks";

export const createTask = async (taskData, userId) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      TASKS_COLLECTION_ID,
      ID.unique(),
      {
        ...taskData,
        userId,
        status: "Pending",
        isArchived: false,
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserTasks = async (userId) => {
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      TASKS_COLLECTION_ID,
      [
        Query.equal("userId", userId),
      ]
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};