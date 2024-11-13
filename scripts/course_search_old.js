var currently_searching = false;

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
function searchCourse(course) {
	console.log("Searching for " + course);
	if (document.getElementById("pg0_V_tabSearch_txtCourseRestrictor")) {
		currently_searching = true;
		document.getElementById("pg0_V_tabSearch_txtCourseRestrictor").value = course;
		document.getElementById("pg0_V_tabSearch_btnSearch").click();
	} else {
		console.log("Course restrictor not found.");
	}


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

function sectionArrayToJSON(section_array) {
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

function storeCourseSections(course_sections, course_code) {
	let courses = JSON.parse(localStorage.getItem("course_list")) || [];
	let course = {
		course_code: course_code,
		sections: course_sections,
	};
	courses.push(course);
	localStorage.setItem("course_list", JSON.stringify(courses));
}

function handleMessage(message, sender, sendResponse) {
	if (message.target == "course-search") {
		localStorage.setItem("current-course", message.course);
		searchCourse(message.course);
	}
}

async function main() {
	browser.runtime.onMessage.addListener(handleMessage);
	// "TR 12:45-01:45PM  (01/08/2025 - 04/10/2025) Taylor 247"




	// const observer = new MutationObserver((mutations, observer) => {
	// 	if (document.querySelector("tbody")) {
	// 		console.log("sections loaded!");
	// 		observer.disconnect();
	// 		course_sections = getCourseSections();
	// 		current_course = localStorage.getItem("current-course");
	// 		storeCourseSections(course_sections, current_course);
	// 		// go back to the course search and wait for the next course message
	// 		window.open("https://student.byui.edu/ICS/Class_Schedule/Public_Course_Search.jnz", "_self");
	// 	}
	// });
	observer.observe(document.body, { childList: true, subtree: true });
}

main();
