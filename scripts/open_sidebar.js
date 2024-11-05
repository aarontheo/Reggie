// // Automatically open the sidebar when the extension is installed or reloaded
// browser.runtime.onInstalled.addListener(() => {
//     browser.sidebarAction.open();
// });

// Optionally, you can also open it when the browser starts up
browser.runtime.onStartup.addListener(() => {
    browser.sidebarAction.open();
});
