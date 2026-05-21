import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("69fe26080028ca76c1d0");

export const account = new Account(client);
export const databases = new Databases(client);

export default client;