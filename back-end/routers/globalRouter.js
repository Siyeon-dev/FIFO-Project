import express from "express";
import routes from "../routes";

const globalRouter = express.Router();

// Join
globalRouter.get(routes.home, (res, req) => {
	console.log("hello globalRouter");
});
// Login

export default globalRouter;
