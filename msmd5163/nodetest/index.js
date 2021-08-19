const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');


mongoose
  .connect(
    "mongodb+srv://apiuser:abcd1234@cluster0.3dagi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api", routes);

    app.get("/", (req, res) => {
      res.json({ message: "Restaurant API." });
    });

    const port = process.env.PORT || 8086;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}..`);
    });
  });



