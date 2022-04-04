const mongoose = require("mongoose");
// const { dbHost, dbPassword, dbName, dbPort, dbUser } = require("../app/config");
const { MongoClient } = require("mongodb");

//* CARA TUTORIAL VIDEO
// mongoose.connect(
//   `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
// );
// const db = mongoose.connection;

//* CARA TUTORIAL VIDEO
// db.on("open", async () => {
//   console.log("Connected to MongoDB");
//   server.listen(port);
//   server.on("error", onError);
//   server.on("listening", onListening);
// });

//* CARA SEPERTI TASK SEBELUMNYA

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
const namaDB = "eduworkstore";

const db = client.db(namaDB);

const dbConnection = async () => {
  try {
    await mongoose.connect(`${url}/${namaDB}`);
    console.log("connected to Database");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { dbConnection, db };
