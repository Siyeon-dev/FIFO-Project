import React, { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserDataSotre = (props) => {
	const [userInfo, setUserInfo] = useState();
	const handlerSetUserInfo = (name) => setUserInfo(name);
	
	return (
		<UserDataContext.Provider value={{ userInfo, handlerSetUserInfo }}>
			{props.children}
		</UserDataContext.Provider>
	);
};

export default UserDataSotre;
