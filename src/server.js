import express from "express";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`PATH: ${req.path} METHOD: ${req.method} URL: ${req.url}`);
    next();
}

app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
    console.log(`Server listening on port http://localhost:${PORT} 🥰`);

app.listen(PORT, handleListening);