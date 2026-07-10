const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contactRoute = require("./routes/contact");
const orderRoute = require("./routes/order");      // ✅ import at top

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5000"]
}));
app.use(express.json());

app.use("/api", contactRoute);
app.use("/api", orderRoute);                       // ✅ register before listen

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});