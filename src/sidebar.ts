import * as st from "./lib/storage.js";
import * as cs from "./lib/course_stuff.js";

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

function clearCourseInput() {
  (inputField as HTMLInputElement).value = "";
}

async function addCourseEntry(): Promise<void> {
  let code = getCourseInput();
  // TODO: Notify user if course code is not valid
  if (!cs.isCourseCode(code)) {
    showError(
      `'${code}' is not a valid course code. Codes are in the format: "ABC 123".`,
    );
    return;
  }
  await st.addCourse(code);
}

async function refreshCodeList() {
  let list_elem = document.getElementById("course-list") as HTMLUListElement;
  let course_codes = (await st.getCourses()) as Set<string>;

  list_elem.innerHTML = "";
  course_codes.forEach((code) => {
    let li = document.createElement("li");
    li.textContent = code;

    let removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", async () => {
      await st.removeCourse(code);
      refreshCodeList();
    });

    li.appendChild(removeButton);
    list_elem.appendChild(li);
  });
}

async function main() {
  // Listeners needed:
  // - Button to add a course entry from the textbox
  document.getElementById("add-course").addEventListener("click", async () => {
    resetError();
    await addCourseEntry();
  });

  // This clicks the add course button when enter is pressed.
  document
    .getElementById("course-code")
    .addEventListener("keypress", async (event) => {
      if (event.key === "Enter") {
        document.getElementById("add-course").click();
      }
    });

  // The list should always accurately reflect the contents of the Set.
  // Therefore, we will add the refresh function to the storage event listener.
  browser.storage.local.onChanged.addListener(refreshCodeList);

  // Functionality needed:
  // - Function to refresh course code display list in sidebar
}

main();
