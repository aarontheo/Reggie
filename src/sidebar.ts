import { store, retrieve } from "./lib/storage.js";

console.log("Sidebar.js is running");
store("test_number", 42);
console.log(retrieve("test_number"));
