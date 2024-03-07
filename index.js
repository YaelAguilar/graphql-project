const app = require("./app");
const { connectDB } = require("./src/db");
const { PORT } = require("./config");

connectDB();
app.listen(PORT);
console.log("Server on port", PORT);