import { account } from "../appwrite/config";
import { ID } from "appwrite";

export const signupUser = async (name, email, password) => {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    await loginUser(email, password);

    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    return await account.createEmailPasswordSession(
      email,
      password
    );
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
};