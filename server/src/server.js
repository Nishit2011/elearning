const express = require("express");
const colors = require("colors");
const connectDB = require("./db/mongoose");
const userRoutes = require("./routes/users");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swagger.json");
const app = express();
app.use(express.json());
connectDB();
const PORT = process.env.PORT;

app.get("/", (req, res, error) => {
  res.send({ message: "Backend is Up!!!" });
});
app.use(userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(
    `Server is listening on ${PORT} on ${process.env.ENVIRONMENT} environment`
      .bold.yellow
  );
});
