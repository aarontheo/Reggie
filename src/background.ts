import * as st from "./lib/storage.js";
import * as cs from "./lib/course_stuff.js"

console.log("Testing storage.ts");

const TEST_KEY = "testkey"
let test_data = [1, 2, 3]

st.remove(TEST_KEY);

st.store(TEST_KEY, test_data);
console.log("Stored: ", test_data);

let result = await st.retrieve(TEST_KEY) as Array<any>;
console.log("Retrieved: ", result);

result.push(42);
st.store(TEST_KEY, result);
console.log("Pushed a value to the list");

result = await st.retrieve(TEST_KEY) as Array<any>;
console.log("Retrieved: ", result);

console.log("All storage: ", browser.storage.local.get());
