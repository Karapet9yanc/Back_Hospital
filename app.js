const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());


const apiRoutes = require("./src/modules/routes/routes");
const apiRoutesProblem = require("./src/modules/routes/routesForProblem");

const url =
  "mongodb+srv://karen:Restart987@realmcluster.zy4og.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use("/", apiRoutes);
app.use("/", apiRoutesProblem);

const startApp = async () => {
  try {
    await mongoose.connect(url);
    app.listen(8000, () => {
      console.log("Example app listening on port 8000!");
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

startApp();
