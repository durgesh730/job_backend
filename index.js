const express = require("express")
// <-------------------------- initialize app -------------------------->
const app = express()

// <---------------------- load env vars ----------------------------->
require('dotenv').config();

//<----------------------- Database connect ---------------------->
require("./src/database/init");

const PORT = process.env.PORT || 8000;

//<---------------------------- cors config ------------------------------>
const cors = require("cors")
app.use(cors())
app.use(express.json())

//<---------------------------- main route setup ------------------------>
app.use("/api/v1", require('./src/routes'));
app.get('/', (req, res) => res.status(200).send("Hello World !"))

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
})

