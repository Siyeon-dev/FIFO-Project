// GLOBAL
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// GLOBAL USER
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// STUDENT
const STUDENT = "/student";

// TEACHER
const TEACHER = "/teacher";

// CLASS
const CREATE_CLASS = "/create-class";
const DELETE_CLASS = "/:id/delete-class";
const EDIT_CLASS = "/:id/edit-class";

const routes = {
	join: JOIN,
	login: LOGIN,
	logout: LOGOUT,
	editProfile: EDIT_PROFILE,
	changePassword: CHANGE_PASSWORD,
	student: STUDENT,
	teacher: TEACHER,
	createClass: CREATE_CLASS,
	deleteClass: DELETE_CLASS,
	editClass: EDIT_CLASS,
};

export default routes;
