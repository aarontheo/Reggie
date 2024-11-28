import { store, retrieve } from "./lib/storage.js";

console.log("Sidebar.js is running");
store("test_number", 42);
console.log(retrieve("test_number"));

function format_code(course_code:string): string {
  return course_code.replace(" ", "").toUpperCase();
}

let code_list = []

function addCourse(course_code:string) {
  code_list.push(format_code(course_code));
  store("course_codes", code_list);
}

async function updateCourseList() {
  let course_list = retrieve("course_codes");
  let course_list_element = document.getElementById("course_list");
  course_list_element.innerHTML = "";
  for (let course of await course_list) {
    let course_element = document.createElement("li");
    course_element.innerHTML = course;
    course_list_element.appendChild(course_element);
  }
}
