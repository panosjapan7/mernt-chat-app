import express, { Application, json, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(json()); // middleware Express function that parses incoming JSON requests and puts the parsed data in req.body.

const PORT: number = parseInt(process.env.SERVER_PORT || "3001");

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, world");
});

app.listen(PORT, function() {
    console.log(`App is listening on ${PORT}`);
});


