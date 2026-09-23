require("dotenv").config();

const app = require("./src/app");
const { connectToDB } = require("./src/config/connectToDb");

connectToDB();

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});