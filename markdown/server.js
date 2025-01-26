const express = require("express");
const app = express();


const PORT = 5502

app.listen(PORT,()=>{`console.log(listening on http://127.0.0.1:${PORT})`})

app.use("/",express.static(__dirname))
