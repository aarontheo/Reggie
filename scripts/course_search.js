function searchCourse(course) {
	console.log("Searching for " + course);
	if (document.getElementById("pg0_V_tabSearch_txtCourseRestrictor")) {
		document.getElementById("pg0_V_tabSearch_txtCourseRestrictor").value = course;
		document.getElementById("pg0_V_tabSearch_btnSearch").click();
	} else {
		console.log("Course restrictor not found.");
	}
}

function getCourseSections() {
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

function addSectionToCourse(section_array) {
	section = sectionArrayToJSON(section_array);
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

function handleMessage(message) {
	if (message.target == "course-search") {
		localStorage.setItem("course", message.course);
		searchCourse(message.course);
	}
}

function main() {
	browser.runtime.onMessage.addListener(handleMessage);
	// "TR 12:45-01:45PM  (01/08/2025 - 04/10/2025) Taylor 247"
	const observer = new MutationObserver((mutations, observer) => {
		if (document.querySelector("tbody")) {
			console.log("sections loaded!");
			observer.disconnect();
			course_sections = getCourseSections();
			current_course = localStorage.getItem("course");
			storeCourseSections(course_sections, current_course);
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
}

main();
