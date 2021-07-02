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
					세션이 만료되었습니다.
					<br />
					다시 로그인 해주세요 🥲
				</h1>
			) : (
				<h1>안녕하세요 {userInfo}님 😄</h1>
			)}
			<div className='studentList'>
				<h1 className='studentList-title'>학생 리스트</h1>
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
				<button onClick={handleCreate}>등록하기</button>
				<button onClick={handleRemove}>면담완료</button>
				<button onClick={handleCancel}>취소하기</button>
			</div>
			<button
				onClick={() => {
					history.push({ pathname: "/" });
				}}
			>
				로그인 화면으로
			</button>
		</div>
	);
};

export default DashBoard;
