import * as st from "lib/storage.js";

console.log("Background is running.");
// browser.sidebarAction.open();

async function searchCourses(courseCodes: string[]) {
  for (const courseCode of courseCodes) {
    await new Promise((resolve) => {
      console.log("Sending code ", courseCode);
      browser.runtime.sendMessage({
        type: "searchCourse",
        payload: courseCode,
      });
    });
  }
}

browser.runtime.onStartup.addListener(() => {
  browser.sidebarAction.open();
});
browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === "ready") {
    let course_codes = await st.getSearchQueue();
  }
});
