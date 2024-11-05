function openGradPlanner() {
	// Open a new tab with the specified URL
	window.open("https://iplan.byui.edu/grad_planner/#/myPlans");
	// Open the extension's sidebar
	browser.sidebarAction.open();
}

function openCourseSearch() {
	window.open("https://student.byui.edu/ICS/Class_Schedule/Public_Course_Search.jnz");
}

function searchCourse(course_code) {
	// Send a message to the background script
	browser.runtime.sendMessage({ target: "course-search", course: course_code });
}

function testMessage() {
	// Send a message to the background script
	// window.alert("Sending a test message");
	console.log("Sending a test message");
	browser.runtime.sendMessage({ target: "test", data: "Hello, world!" }, (response) => {
		console.log(response);
	});
}

function handleMessage(message, sender, sendResponse) {
	if (message.target == "popup") {
		console.log("Message recieved by popup.js");
	}
}

function main() {
	document.getElementById("search-button").addEventListener("click", testMessage);
	browser.runtime.onMessage.addListener(handleMessage);
}

document.addEventListener("DOMContentLoaded", main);
