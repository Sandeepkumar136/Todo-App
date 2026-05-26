import { databases } from "../appwrite/config";
import { ID, Query } from "appwrite";

const DATABASE_ID = "69fe268e001d76dc66d3";
const CATEGORY_COLLECTION_ID = "categories";

/* CREATE */
export const createCategory = async (
  name,
  userId
) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      CATEGORY_COLLECTION_ID,
      ID.unique(),
      {
        name,
        userId,
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* READ */
export const getCategories = async (
  userId
) => {
  try {
    return await databases.listDocuments(
      DATABASE_ID,
      CATEGORY_COLLECTION_ID,
      [
        Query.equal("userId", userId),
      ]
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* UPDATE */
export const updateCategory = async (
  categoryId,
  name
) => {
  try {
    return await databases.updateDocument(
      DATABASE_ID,
      CATEGORY_COLLECTION_ID,
      categoryId,
      {
        name,
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* DELETE */
export const deleteCategory = async (
  categoryId
) => {
  try {
    return await databases.deleteDocument(
      DATABASE_ID,
      CATEGORY_COLLECTION_ID,
      categoryId
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};