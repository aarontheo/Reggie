import * as st from "./lib/storage.js";
import * as cs from "./lib/course_stuff.js"

console.log("Sidebar.js is running");
// store("test_number", 42);
// console.log(retrieve("test_number"));

function getCourseInput(): string {
  let inputField = document.getElementById("course-code");
  let code = (inputField as HTMLInputElement).value;
  return code;
}

async function displayCourseList() {
  // let list = document.getElementById("course-list");
  // let code_list:Array<string> = await st.getCourseList();
  // console.log(code_list);
  // for (let code of code_list) {
  //   let li = document.createElement("li");
  //   li.textContent = code;
  //   list.appendChild(li);
  // }
}

function main() {
  // displayCourseList();
  document.getElementById("add-course").addEventListener("click", () => {
    console.log("add_button clicked!");
    st.pushCourse(getCourseInput());
    // displayCourseList();
  });
}

// console.log(
//   await st.getCourseList()
// );

// console.log(
//   await browser.storage.local.get("course_codes")
// )

main();
