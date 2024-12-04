import * as st from "./lib/storage.js";
import * as cs from "./lib/course_stuff.js"

// console.log("Sidebar.js is running");
// store("test_number", 42);
// console.log(retrieve("test_number"));

const error_elem = document.getElementById("error-message");
const inputField = document.getElementById("course-code");

function showError(err: string) {
  error_elem.innerText = err;
  error_elem.hidden = false;
}

function resetError() {
  error_elem.hidden = true;
}

function getCourseInput(): string {
  let code = (inputField as HTMLInputElement).value;
  return code.replace(" ", "").toUpperCase();
}

async function addCourseEntry(): Promise<void> {
  let code = getCourseInput();
  // TODO: Notify user if course code is not valid
  if (!cs.isCourseCode(code)) {
    showError(`'${code}' is not a valid course code. Codes are in the format: "ABC 123".`);
    return;
  }
  await st.addCourse(code);
}

async function refreshCodeList() {
  let code_list = new Array<HTMLElement>();
  for (let code of await st.getCourses()) {
    let item = document.createElement("li");
    item.innerText = `${code}`;
    code_list.push(item);
  }

  let disp_list = document.getElementById("course-list");
  // (disp_list as HTMLUListElement).replaceChildren(...code_list);
  disp_list.append(document.createElement("custom"));
}

async function main() {
  // Listeners needed:
  // - Button to add a course entry from the textbox
  document.getElementById("add-course").addEventListener("click", () => {
    resetError();
    addCourseEntry();
    refreshCodeList();
  })

  // Functionality needed:
  // - Function to refresh course code display list in sidebar
}

main();
