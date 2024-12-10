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

// Testing semester, course, and section storage functions
console.log("Testing semester, course, and section functions:\n");

// Define some test data
const TEST_SEMESTER = "Fall 2023";
const TEST_COURSE_CODE = "CS 101";
const TEST_SECTION = { section_id: "001", instructor: "Dr. Smith", time: "MWF 10-11" };

// Clear any existing data
await st.clearStorage();

// Test adding and retrieving courses for a semester
await st.addCourseToSemester(TEST_SEMESTER, TEST_COURSE_CODE);
let coursesForSemester = await st.getCoursesForSemester(TEST_SEMESTER);
console.log(`Courses for ${TEST_SEMESTER}: `, coursesForSemester);

await st.addCourseToSemester(TEST_SEMESTER, "CS 102");
coursesForSemester = await st.getCoursesForSemester(TEST_SEMESTER);
console.log(`Courses for ${TEST_SEMESTER} after adding another course: `, coursesForSemester);

await st.removeCourseFromSemester(TEST_SEMESTER, "CS 102");
coursesForSemester = await st.getCoursesForSemester(TEST_SEMESTER);
console.log(`Courses for ${TEST_SEMESTER} after removing a course: `, coursesForSemester);

// Test adding and retrieving sections for a course
await st.addSectionToCourse(TEST_COURSE_CODE, TEST_SECTION);
let sectionsForCourse = await st.getSectionsForCourse(TEST_COURSE_CODE);
console.log(`Sections for ${TEST_COURSE_CODE}: `, sectionsForCourse);

const ANOTHER_SECTION = { section_id: "002", instructor: "Dr. Jones", time: "TTh 2-3:30" };
await st.addSectionToCourse(TEST_COURSE_CODE, ANOTHER_SECTION);
sectionsForCourse = await st.getSectionsForCourse(TEST_COURSE_CODE);
console.log(`Sections for ${TEST_COURSE_CODE} after adding another section: `, sectionsForCourse);

await st.removeSectionFromCourse(TEST_COURSE_CODE, TEST_SECTION);
sectionsForCourse = await st.getSectionsForCourse(TEST_COURSE_CODE);
console.log(`Sections for ${TEST_COURSE_CODE} after removing a section: `, sectionsForCourse);

// Test adding and retrieving courses
await st.addCourse(TEST_COURSE_CODE);
let hasCourse = await st.hasCourse(TEST_COURSE_CODE);
console.log(`Has course ${TEST_COURSE_CODE}: `, hasCourse);

await st.removeCourse(TEST_COURSE_CODE);
hasCourse = await st.hasCourse(TEST_COURSE_CODE);
console.log(`Has course ${TEST_COURSE_CODE} after removal: `, hasCourse);

// Clear storage at the end of tests
await st.clearStorage();
console.log("Storage cleared after tests.");
