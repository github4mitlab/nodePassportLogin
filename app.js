const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs"); // 매뉴얼에 이렇게 하도록 미리 세팅이 되어 있음 암기



app.use("/", require("./routers/index"));
app.use("/users", require("./routers/users"));



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
