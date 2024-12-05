import * as st from "../lib/storage.js";
import * as cs from "../lib/course_stuff.js"

console.log("Testing storage.ts\n\n");

console.log("Testing storage functions:\n");
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

// Testing the flag system
console.log("Testing flag functions:\n")
await st.setFlag("testFlag", true);
let flagValue = await st.flag("testFlag");
console.log("Flag 'testFlag' set to true: ", flagValue);

await st.setFlag("testFlag", false);
flagValue = await st.flag("testFlag");
console.log("Flag 'testFlag' set to false: ", flagValue);

await st.setFlag("anotherFlag", true);
flagValue = await st.flag("anotherFlag");
console.log("Flag 'anotherFlag' set to true: ", flagValue);

await st.removeFlag("anotherFlag");
flagValue = await st.flag("anotherFlag");
console.log("Flag 'anotherFlag' removed: ", flagValue);
