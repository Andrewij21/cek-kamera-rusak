import dotEnv from "dotenv";
dotEnv.config();
import MongoDB from "./src/config/MongoDB";
import app from "./src/app";
const PORT = process.env.PORT;

MongoDB.then(() => {
  app.listen(PORT, () =>
    console.info(`[Info] Server is running at http://localhost:${PORT}`)
  );
}).catch((err) => {
  console.error(err);
});
