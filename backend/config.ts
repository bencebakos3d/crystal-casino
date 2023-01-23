import dotenv from 'dotenv';

dotenv.config();

export default {
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: parseInt(process.env.MYSQL_PORT!),
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },

  defaultValues:{
    defaultUsername: process.env.DEFAULT_NAME,
    defaultBalance: process.env.DEFAULT_BALANCE
  }
};
