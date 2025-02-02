const { Client } = require("pg");

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = "127.0.0.1";

const client = new Client({
  user: dbUser,
  password: dbPassword,
  host: dbHost,
  port: 5432,
});

const createDatabase = async () => {
  try {
    await client.connect();
    const res = await client.query(`CREATE DATABASE ${dbName};`);
    console.log(`Database "${dbName}" created successfully.`);
  } catch (error) {
    if (error.code === "42P04") {
      console.log(`Database "${dbName}" already exists.`);
    } else {
      console.error("Error creating database:", error);
    }
  } finally {
    await client.end();
  }
};

createDatabase();
