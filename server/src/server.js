const express = require("express");
const colors = require("colors");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swagger.json");

const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/course");
const lessonRoute = require("./routes/lesson");
const connectDB = require("./db/mongoose");
const errorHandler = require("./middlewares/error");

const app = express();
app.use(express.json());
connectDB();
const PORT = process.env.PORT;

app.get("/", (req, res, error) => {
  res.send({ message: "Backend is Up!!!" });
});

app.use(userRoutes);
app.use(courseRoutes);
app.use(lessonRoute);

app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(
    `Server is listening on ${PORT} on ${process.env.ENVIRONMENT} environment`
      .bold.yellow
  );
});
