const mongoose = require("mongoose");

const StudentListSchema = new mongoose.Schema({
	stdName: {
		type: String,
		required: "Text is required",
	},
});

module.exports = mongoose.model("StudentList", StudentListSchema);
