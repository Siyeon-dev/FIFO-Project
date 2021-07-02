import React, { useContext } from "react";
import { UserDataContext } from "../store/UserDataStore";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import dotenv from "dotenv";
import "./Login.css";

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
		<div className='login'>
			<div className='login-info'>
				<h1 className='login-title'>Welcome to FIFO</h1>
				<p>안녕하세요 :)</p>
				<p className='login-sub'>
					교수님과의 면담을 원활하게 돕기위한 서비스입니다.
					<br />
					학교 이메일을 사용해 로그인 해주세요.
				</p>
			</div>
			<GoogleLogin
				className='login-form'
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				buttonText='Login your google accout'
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy='single_host_origin'
			/>
		</div>
	);
};

export default Login;
