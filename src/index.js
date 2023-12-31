const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

let server;

mongoose.connect(config.mongoose.url).then(() => {
    console.log("Connected to MongoDB")});
// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
app.listen(config.port, () => {
    console.log(`App is running on port ${config.port}`);
  });
