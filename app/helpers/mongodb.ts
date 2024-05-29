import { prismaClient } from "../lib/prisma";

export const connectToMongoDB = async () => {
  try {
    await prismaClient.$connect();
  } catch (error) {
    throw new Error("Unable to connect to MongoDB database.");
  }
};
