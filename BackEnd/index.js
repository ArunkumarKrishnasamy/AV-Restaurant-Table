const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3001 || process.env.PORT;

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

app.listen(PORT, () => {
  console.log("Web Server started Now");
});
