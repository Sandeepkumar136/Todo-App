import { databases } from "../appwrite/config";
import { ID, Query } from "appwrite";

const DATABASE_ID = "69fe268e001d76dc66d3";
const TASKS_COLLECTION_ID = "tasks";

export const createTask = async (taskData, userId) => {
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
};

export const getUserTasks = async (userId) => {
  return await databases.listDocuments(
    DATABASE_ID,
    TASKS_COLLECTION_ID,
    [
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"),
    ]
  );
};

export const updateTask = async (taskId, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    TASKS_COLLECTION_ID,
    taskId,
    data
  );
};

export const deleteTask = async (taskId) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    TASKS_COLLECTION_ID,
    taskId
  );
};