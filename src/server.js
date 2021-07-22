import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`PATH: ${req.path} METHOD: ${req.method} URL: ${req.url}`);
    next();
}

app.use(logger);

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("home");

globalRouter.get("/", handleHome);

const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("Edit User");

userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();

const handleWatchVideo = (req, res) => res.send("Videos");

videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
    console.log(`Server listening on port http://localhost:${PORT} 🥰`);

app.listen(PORT, handleListening);