const express = require("express");
const app = express();

app.use("/", require("./routers/index"));
app.use("/users", require("./routers/users"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
