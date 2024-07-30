const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

app.use(cors());
app.use(express.json());

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})

app.get("/", (req, res) => {
    res.send("Hello World");
})

const root = require("./src/routers/root").router;
app.use(root);