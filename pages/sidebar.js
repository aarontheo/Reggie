import * as course from "./scripts/courses.js";

// sidebar.js
// This script is used to interact with the sidebar of the extension.
// It allows the user to add courses to a list and submit them to be searched on the course search page.

function validateCourseCode(courseCode) {
	const regex = /^[A-z]{2,7} *[0-9]{3}[A-z]*$/;
	return regex.test(courseCode);
}

function addCourseToList(courseCode) {
	const courseList = document.getElementById("course-list");
	const courses = JSON.parse(localStorage.getItem("courses")) || [];

	if (!courses.includes(courseCode)) {
		courses.push(courseCode);
		localStorage.setItem("courses", JSON.stringify(courses));
		displayCourses(courses);
	}
}

function displayCourses(courses) {
	const courseList = document.getElementById("course-list");
	courseList.innerHTML = "";

	courses.forEach((courseCode) => {
		const listItem = document.createElement("li");
		listItem.textContent = courseCode;

		const removeButton = document.createElement("button");
		removeButton.textContent = "✖";
		removeButton.classList.add("remove-course");
		listItem.style.display = "flex";
		listItem.style.justifyContent = "space-between";

		removeButton.addEventListener("click", () => {
			removeCourseFromList(courseCode);
		});

		listItem.appendChild(removeButton);
		courseList.appendChild(listItem);
	});
}

function removeCourseFromList(courseCode) {
	let courses = JSON.parse(localStorage.getItem("courses")) || [];
	courses = courses.filter((course) => course !== courseCode);
	localStorage.setItem("courses", JSON.stringify(courses));
	displayCourses(courses);
}

function getCourses() {
	const courses = JSON.parse(localStorage.getItem("courses")) || [];
	return courses;
}

function searchCourses() {
	// Sends a message to Background.js telling it to search all stored course codes.
	browser.runtime.sendMessage({ operation: "search-courses" });
}

function addCourse() {
	console.log("Adding course");

	const courseCodeInput = document.getElementById("course-code").value.trim().toUpperCase();
	const isValid = validateCourseCode(courseCodeInput);

	if (isValid) {
		addCourseToList(courseCodeInput);
		document.getElementById("course-code").value = ""; // Clear input field
		// document.getElementById("error-message").textContent = "";
		document.getElementById("error-message").style.display = "none";
	} else {
		document.getElementById("error-message").textContent =
			"Invalid course code. Please enter a valid code (e.g., CS101).";
	}
}

function main() {
	console.log("Main running");

	const courses = JSON.parse(localStorage.getItem("courses")) || [];
	displayCourses(courses);

	document.getElementById("add-course").addEventListener("click", addCourse);
	document.getElementById("search-courses").addEventListener("click", searchCourses);

	// Get the input field and button
	var input = document.getElementById("course-code");
	var add_course_button = document.getElementById("add-course");

	// Let the user enter the course code by pressing "Enter" on the keyboard
	input.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			// Cancel the default action, if needed
			event.preventDefault();
			add_course_button.click();
		}
	});
}

/*
	// TESTING STUFF
	const target = "popup"
	function testMessage() {
		console.log("Sending a test message");
		browser.runtime.sendMessage({ target: target, data: "Hello, world!" }, (response) => {
			console.log(response);
		});
	}
	document.getElementById("test-button").addEventListener("click", testMessage);
}
*/

document.addEventListener("DOMContentLoaded", main);
