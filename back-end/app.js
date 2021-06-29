const StudentList = require("./models/StudentList");
require("./db");
const app = require("express")();
const server = require("http").createServer(app);
const dotenv = require("dotenv");
const cors = require("cors");
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		credentials: true,
	},
});

dotenv.config();

const PORT = process.env.PORT;

io.on("connection", (socket) => {
	socket.on("reqEvent", () => {
		console.log("hello");
		io.emit("resEvent", {});
	});
});

const handleListening = () =>
	console.log(`✅ Listening on: http://localhost:${PORT}`);

const insertStdInfo = async (req, res, next) => {
	const {
		query: { stdName },
	} = req;

	try {
		const student = await StudentList.create({
			stdName,
		});

		console.log(student);
		next();
	} catch (err) {
		console.log(err);
	}
};

const getAllStudent = async (req, res) => {
	try {
		const student = await StudentList.find({}, { stdName: 1 });
		res.send(student);

		console.log(student);
	} catch (err) {
		console.log(err);
	}
};

const deleteStudent = async (req, res, next) => {
	const {
		query: { stdName },
	} = req;

	try {
		await StudentList.findOneAndRemove({ stdName: stdName });
		next();
	} catch (err) {
		console.log(err);
	}
};

app.use(
	cors({
		method: ["GET", "POST"],
		credentials: true,
	})
);

app.get("/insertStudent", insertStdInfo, getAllStudent);
app.get("/deleteStudent", deleteStudent, getAllStudent);
app.get("/", getAllStudent);
server.listen(PORT, handleListening);
