const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const path = require("path");
const initSocket = require("./socket/index");
const cors = require('cors');

dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use("/api/auth", require("./routers/authRoutes"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/myChat.html"));
});

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`chat app living room  on http://localhost: ${PORT}`)
);
    