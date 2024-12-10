console.log("Background is running.");
// browser.sidebarAction.open();

browser.runtime.onStartup.addListener(() => {
  browser.sidebarAction.open();
})
