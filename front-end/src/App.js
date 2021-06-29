import React, { useEffect, useState } from "react";
import StudentList from "./Components/StudentList";
import io from "socket.io-client";
import axios from "axios";

const PORT = process.env.PORT || 4000;
const socket = io.connect(`http://localhost:${PORT}`);

const App = () => {
	const [studentList, setStudentList] = useState([]);
	const [inputState, setInputState] = useState("");
	const [state, setState] = useState([]);
	const myName = "박시연";

	const isFirstYourName = () => {
		return myName === studentList[0] ? true : false;
	};
	useEffect(() => {
		async function fetchData() {
			await axios
				.get("http://localhost:4000")
				.then((res) => {
					setState(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		fetchData();
	}, []);

	useEffect(() => {
		let tempStudentList = [];

		for (let student of state) {
			tempStudentList.push(student.stdName);
		}

		setStudentList([...tempStudentList]);
	}, [state]);

	const handleCreate = () => {
		let newStdList = studentList;
		newStdList.push(inputState);

		setStudentList(newStdList);
		setInputState("");
	};

	const handleChange = (e) => {
		setInputState(e.target.value);
	};

	const handleRemove = () => {
		const firstStd = studentList[0];

		if (isFirstYourName() !== true) return false;
		setStudentList(studentList.filter((student) => student !== firstStd));
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

export default App;
