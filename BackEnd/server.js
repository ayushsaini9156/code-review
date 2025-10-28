const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");

// Use environment variable for port (default to 3000)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
