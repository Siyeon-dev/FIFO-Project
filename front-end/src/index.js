import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import UserDataContext from "./store/UserDataStore";

ReactDOM.render(
	<React.StrictMode>
		<UserDataContext>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserDataContext>
	</React.StrictMode>,
	document.getElementById("root")
);
