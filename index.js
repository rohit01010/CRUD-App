const express = require("express");
const PORT = 3000;
const app = express();
const path = require("path");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./Models/User");
const userController = require("./Controllers/user");

mongoose.connect(
  "mongodb://localhost:27017/UserDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("Connected sucessfully to database");
    } else {
      console.log(err);
    }
  }
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  expressHandlebars({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.redirect("/user/list");
});

app.use("/user", userController);

app.listen(process.env.PORT || PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
