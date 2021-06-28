import React from "react";

const StudentList = (props) => {
	return (
		<ol>
			{props.studentList.map((v, index) => {
				return <li key={index}>{v}</li>;
			})}
		</ol>
	);
};

export default StudentList;
