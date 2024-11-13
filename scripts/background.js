
async function searchCourse(course_code) {
	try {
		await browser.runtime.sendMessage({ target: "course-search", course: course });
	} catch (error) {
		console.error("Error searching for course: " + error);
	}
}

async function searchCourses() {
	console.log("Searching for courses");
	const courses = await getCourses();
	// open the course search page
	await browser.tabs.create({ url: "https://student.byui.edu/ICS/Class_Schedule/Public_Course_Search.jnz" });
	for (const course of courses) {
		console.log("Searching for " + course);
		searchCourse(course);
	}
}

async function handleMessage(message, sender, sendResponse) {
	console.log(message);
	console.log(sender);
	sendResponse("Message received by background.js");
	if (message.target == "course-search") {
		console.log("Searching for courses");
		searchCourses();
	}
	if (!message.operation) {
		return;
	}
	switch (message.operation) {
		case "search-courses":
			console.log("Searching for courses");
			await searchCourses();
			break;
		default:
			console.log("Unknown operation");
	}
}

// Handle messages, get them where they need to go
browser.runtime.onMessage.addListener(handleMessage);
console.log("Background.js loaded");
