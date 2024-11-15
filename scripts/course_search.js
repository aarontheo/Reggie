function open_course_search() {
	// This function opens the course search page
}

// Waits a specified amount of time for an element to appear in the DOM.
// If the element is already present, it resolves immediately.
// If the element appears within the timeout, it resolves with the element.
// If the element does not appear within the timeout, it rejects with an error.
function waitForElement(selector, timeout = 5000) {
	return new Promise((resolve, reject) => {
		const element = document.querySelector(selector);
		if (element) {
			resolve(element); // If element is already in the DOM, resolve immediately
			return;
		}

		// Set up MutationObserver to watch for DOM changes
		const observer = new MutationObserver((mutations, obs) => {
			const element = document.querySelector(selector);
			if (element) {
				obs.disconnect(); // Stop observing once the element is found
				resolve(element); // Resolve with the found element
			}
		});

		// Observe changes in the entire document
		observer.observe(document, {
			childList: true,
			subtree: true,
		});

		// Set up a timeout to reject if the element doesn't appear in time
		if (timeout) {
			setTimeout(() => {
				observer.disconnect();
				reject(new Error(`Element with selector "${selector}" not found within ${timeout}ms`));
			}, timeout);
		}
	});
}

//Searches a course and scrapes the result
async function search_course(course_code) {
	console.log("Searching for " + course_code);
	if (document.getElementById("pg0_V_tabSearch_txtCourseRestrictor")) {
		currently_searching = true;
		document.getElementById("pg0_V_tabSearch_txtCourseRestrictor").value = course_code;
		document.getElementById("pg0_V_tabSearch_btnSearch").click();
	} else {
		console.log("Course restrictor not found.");
	}

function read_course_sections() {
	// This function reads the course sections from the page and stores them under the course
}

async function search_courses() {
	// Retrieves the course code list from local storage, and searches each course.
}

function store_courses(course_array) {

}

function sectionArrayToObject(section_array) {
	section = {
		section_code: section_array[0],
		course_title: section_array[1],
		credits: section_array[2],
		schedule_info: section_array[3],
		class_type: section_array[4],
		delivery_method: section_array[5],
	};
	return section;
}

async function readCourseSections() {
	await waitForElement("tbody"); //Make sure the stuff is loaded first
	var course_sections = [];
	sections = document.querySelectorAll("tbody > tr");
	for (section of sections) {
		section_details = [];
		for (cell of section.cells) {
			text = cell.innerText.trim();
			if (text != "") {
				section_details.push(cell.innerText.trim());
			}
		}
		course_sections.push(section_details);
	}
	return course_sections;
}

async function handle_message(message, sender, sendResponse) {
	console.log(message);
	console.log(sender);
	sendResponse("Message received by course_search.js");
	if (message.target == "course-search") {
		console.log("Searching for course: " + message.course);
		search_courses()
	}
}

async function main() {

}

document.addEventListener("DOMContentLoaded", main);
