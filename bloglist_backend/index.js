const App = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const server = http.createServer(App);
server.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});

mongoose.connect(config.MONGODB_URI, () => {
  logger.info("Connected to MongoDB Atlas");
});
