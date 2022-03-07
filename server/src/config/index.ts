import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  port: process.env.PORT || 3000,

  databaseURL: process.env.MONGO_URI as string,

  // JWT
  jwtSecret: process.env.JWT_SECRET,


  // OAuth
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
  GITHUB_CALLBACK: process.env.GITHUB_CALLBACK as string,

  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
  DISCORD_CALLBACK: process.env.DISCORD_CALLBACK as string,
  
};