import React, { useEffect, useState } from "react";
import StudentList from "./StudentList";
import io from "socket.io-client";
import axios from "axios";

const PORT = process.env.PORT || 4000;
const URL = `http://localhost:${PORT}`;
const socket = io.connect(`http://localhost:${PORT}`);

const DashBoard = () => {
	const [studentList, setStudentList] = useState([]);
	const [inputState, setInputState] = useState("");
	const [state, setState] = useState([]);
	const myName = "박시연";

	const isFirstYourName = () => {
		return myName === studentList[0] ? true : false;
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
		login();
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
			.get(`${URL}/insertStudent?stdName=${inputState}`)
			.then((res) => {
				fetchData();
				requestEvent();
			})
			.catch((err) => {
				console.log(err);
			});

		setInputState("");
	};

	const login = () => {
		axios.get(`${URL}/google`).then((res) => {
			console.dir(res);
		});
	};

	const handleRemove = () => {
		// 로그인 한 자신만 삭제할 수 있도록 예외 처리
		// if (isFirstYourName() !== true) return false;
		axios
			.get(`${URL}/deleteStudent?stdName=${inputState}`)
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
		<div>
			<StudentList
				studentList={studentList}
				setStudentList={setStudentList}
			></StudentList>

			<div>
				<input
					onChange={handleChange}
					value={inputState}
					onKeyPress={handleKeyPress}
				></input>
				<button onClick={handleCreate}>추가</button>
				<button onClick={handleRemove}>완료</button>
			</div>
		</div>
	);
};

export default DashBoard;
