import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject("69a7d1c4000b416686d3");

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = "69a913370012025775e7";
export const COLLECTION_ID = "user";