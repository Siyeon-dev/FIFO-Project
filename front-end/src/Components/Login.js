import React, { useContext } from "react";
import { UserDataContext } from "../store/UserDataStore";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const Login = () => {
	const { userInfo, handlerSetUserInfo } = useContext(UserDataContext);
	const history = useHistory();

	const responseGoogle = (res) => {
		const {
			profileObj: { name },
		} = res;

		handlerSetUserInfo(name);
		history.push({ pathname: "/DashBoard" });
	};

	return (
		<GoogleLogin
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			buttonText='Login'
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy='single_host_origin'
		/>
	);
};

export default Login;
