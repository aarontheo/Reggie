// import * as st from "./lib/storage.js"
// I'll just have to copy any functions I want.

console.log("Course_search running!");

let currentCode = "";

let section_list = [];
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (const node of mutation.addedNodes) {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element).id === "tableCourses"
        ) {
          console.log(
            "New element with id 'tableCourses' added:",
            node.children,
          );
          let children = (node as Element).children[1].children;
          for (const child of children) {
            for (const grandChild of child.children) {
              section_list.push((grandChild as HTMLElement).innerText.trim());
            }
          }
        }
      }
      console.log(section_list);
      if (section_list.length >= 7) {
        let combinedSections = [];
        for (let i = 0; i < section_list.length; i += 7) {
          combinedSections.push(section_list.slice(i, i + 7).join(" "));
        }
        console.log(combinedSections);
        browser.storage.local.set({ scraped_section: combinedSections });
        window.location.href =
          "https://student.byui.edu/ICS/Class_Schedule/Public_Course_Search.jnz";
      }
    }
  }
});

console.log("Observing!");
observer.observe(document.body, { childList: true, subtree: true });

// let code_queue = st.getSearchQueue();
// let code_entry = document.getElementById("pg0_V_tabSearch_txtCourseRestrictor");

function searchCourse(code: string) {
  console.log("Searching code!");
  let code_entry = document.getElementById(
    "pg0_V_tabSearch_txtCourseRestrictor",
  );
  console.log("Code entry: ", code_entry);
  (code_entry as HTMLTextAreaElement).value = code;
  document.getElementById("pg0_V_tabSearch_btnSearch").click();
}




document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded event fired, initializing search");
  searchCourse("CSE310");
  // browser.runtime.onMessage.addListener((message) => {
  //   console.log("Received message:", message);
  //   if (message.type === "searchCourse") {
  //     console.log("Message type is 'searchCourse', payload:", message.payload);
  //     searchCourse(message.payload);
  //   }
  // });
});
