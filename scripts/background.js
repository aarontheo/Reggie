
function handleMessage(request, sender, sendResponse) {
	console.log(request);
	console.log(sender);
	sendResponse("Message received by background.js");
	if (request.target == "course-search") {
		console.log("Searching for course");
		browser.runtime.sendMessage(request);
	}
}

// Handle messages, get them where they need to go
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log(message);
	console.log(sender);
	sendResponse("Message received by background.js");
	browser.runtime.sendMessage({ target: "test", data: "Hello, world!" }, (response) => {
		console.log(response);
 });
});

console.log("Testing!!");
