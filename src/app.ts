import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import bodyParser from "body-parser";


dotenv.config();

const app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', routes);


export default app;
