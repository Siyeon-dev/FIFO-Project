import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./routes";

import globalRoute from "./routers/globalRouter";
import teacherRouter from "./routers/teacherRouter";
import studentRouter from "./routers/studentRouter";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(routes.home, globalRoute);
app.use(routes.teacher, teacherRouter);
app.use(routes.teacher, studentRouter);

export default app;
