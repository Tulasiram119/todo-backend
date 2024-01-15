const express = require("express");
const connectDb = require("./db");
const mongoose = require("mongoose");
const errorHandler = require("./errorHandler");

require("dotenv").config();
const app = express();
const PORT = 3500 || process.env.PORT;

connectDb();
app.use(express.json());
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));
app.all("*", require("./controllers/errorController"));
app.use(errorHandler);
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
});
