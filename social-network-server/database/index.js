const mongoose = require("mongoose");
const { dbHost, dbPass, dbName, dbPort, dbUser } = require("../config");
const url = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

mongoose.connect(url);

const db = mongoose.connection;

db.once("open", (_) => {
  console.log("Database connected:", url);
});

db.on("error", (err) => {
  console.error("connection error:", err);
});

module.exports = db;
