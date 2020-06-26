const express = require("express");
const app = express();
const route = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(route);
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.listen(3333, () => console.log("Server Up"));
