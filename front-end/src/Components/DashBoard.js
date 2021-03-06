import React, { useEffect, useState, useContext } from "react";
import StudentList from "./StudentList";
import io from "socket.io-client";
import axios from "axios";
import { UserDataContext } from "../store/UserDataStore";
import { useHistory } from "react-router-dom";
import "./DashBoard.css";
import "./StudentList.css";

const PORT = process.env.PORT || 4000;
const URL = `http://localhost:${PORT}`;
const socket = io.connect(`http://localhost:${PORT}`);

const DashBoard = () => {
	const [studentList, setStudentList] = useState([]);
	const [inputState, setInputState] = useState("");
	const [state, setState] = useState([]);
	const { userInfo, handlerSetUserInfo } = useContext(UserDataContext);
	const history = useHistory();

	const isFirstYourName = () => {
		return userInfo === studentList[0] ? true : false;
	};

	const fetchData = async () => {
		await axios
			.get(URL)
			.then((res) => {
				setState(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		socket.on("resEvent", () => {
			fetchData();
		});
		fetchData();
	}, []);

	useEffect(() => {
		let tempStudentList = [];

		for (let student of state) {
			tempStudentList.push(student.stdName);
		}
		console.log(tempStudentList);
		setStudentList([...tempStudentList]);
	}, [state]);

	const requestEvent = () => {
		socket.emit("reqEvent");
	};

	const handleCreate = () => {
		axios
			.get(`${URL}/insertStudent?stdName=${userInfo}`)
			.then((res) => {
				fetchData();
				requestEvent();
			})
			.catch((err) => {
				console.log(err);
			});

		setInputState("");
	};

	const handleRemove = () => {
		if (isFirstYourName() !== true) return false;
		axios
			.get(`${URL}/deleteStudent?stdName=${userInfo}`)
			.then((res) => {
				fetchData();
				requestEvent();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleCancel = () => {
		axios
			.get(`${URL}/deleteStudent?stdName=${userInfo}`)
			.then((res) => {
				fetchData();
				requestEvent();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleChange = (e) => {
		setInputState(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleCreate();
		}
	};

	return (
		<div className='dashBoard'>
			{userInfo === undefined ? (
				<h1>
					????????? ?????????????????????.
					<br />
					?????? ????????? ???????????? ????
				</h1>
			) : (
				<h1>??????????????? {userInfo}??? ????</h1>
			)}
			<div className='studentList'>
				<h1 className='studentList-title'>?????? ?????????</h1>
				<StudentList
					studentList={studentList}
					setStudentList={setStudentList}
				></StudentList>
			</div>
			<div className='dashBoard-selector'>
				{/* <input
					onChange={handleChange}
					value={inputState}
					onKeyPress={handleKeyPress}
				></input> */}
				<button onClick={handleCreate}>????????????</button>
				<button onClick={handleRemove}>????????????</button>
				<button onClick={handleCancel}>????????????</button>
			</div>
			<button
				onClick={() => {
					history.push({ pathname: "/" });
				}}
			>
				????????? ????????????
			</button>
		</div>
	);
};

export default DashBoard;
