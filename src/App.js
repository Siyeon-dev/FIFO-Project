import React, { useState, useEffect } from "react";
import StudentList from "./Components/StudentList";

const App = () => {
	const [studentList, setStudentList] = useState([
		"박시연",
		"김정원",
		"손형탁",
	]);
	const [inputState, setInputState] = useState("");
	const myName = "박시연";

	const isFirstYourName = () => {
		return myName === studentList[0] ? true : false;
	};

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

	return (
		<div>
			<StudentList
				studentList={studentList}
				setStudentList={setStudentList}
			></StudentList>

			<div>
				<input onChange={handleChange}></input>
				<button onClick={handleCreate}>추가</button>
				<button onClick={handleRemove}>완료</button>
			</div>
		</div>
	);
};

export default App;
