import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`PATH: ${req.path} METHOD: ${req.method} URL: ${req.url}`);
    next();
}

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if (url === "/protected") {
        return res.send("<h1>Not Allowed</h1>")
    }
    console.log("Allowed");
    next();
}

const handleHome = (req, res) => {
    return res.send("<h1>I still love you!!</h1>");
};

const handleProtected = (req, res) => {
    return res.send("<h1>U A Special!</h1>")
}

app.use(logger, privateMiddleware);
app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleListening = () =>
    console.log(`Server listening on port http://localhost:${PORT} 🥰`);

app.listen(PORT, handleListening);