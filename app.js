const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const boardRoutes = require("./routes/boardRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/test", testRoutes);
app.use("/boards", boardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
