import React, { useEffect, useState } from "react";
import DashBoard from "./Components/DashBoard";
import Login from "./Components/Login";
import { Route } from "react-router-dom";

const App = () => {
	return (
		<div>
			<Route path='/' component={Login} exact />
			<Route path='/DashBoard' component={DashBoard} />
		</div>
	);
};

export default App;
