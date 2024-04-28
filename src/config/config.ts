import { config as conf } from "dotenv";

conf();

const _config = {
  prot: process.env.PORT,

  databaseUrl: process.env.MONGO_CONNECTION_STRING,

  env: process.env.NODE_ENV,

  jwtSecret: process.env.JWT_SECRETE,
};

export const config = Object.freeze(_config);
