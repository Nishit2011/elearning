const express = require("express");
const colors = require("colors");
const connectDB = require("./db/mongoose");
const userRoutes = require("./routes/users");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swagger.json");
const errorHandler = require("./middlewares/error");
const multer = require("multer");

const app = express();
app.use(express.json());
connectDB();
const PORT = process.env.PORT;

app.get("/", (req, res, error) => {
  res.send({ message: "Backend is Up!!!" });
});
app.use(userRoutes);
app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const upload = multer({
  dest: "avatar-images",
});
app.post("/me/avatar", upload.single("upload"), (req, res) => {
  res.send();
});

app.listen(PORT, () => {
  console.log(
    `Server is listening on ${PORT} on ${process.env.ENVIRONMENT} environment`
      .bold.yellow
  );
});
