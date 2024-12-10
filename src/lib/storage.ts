import * as cs from "./course_stuff.js";

// This is a module meant for easily interfacing with courses in the grad planner extension.

// Storage looks like this:
// {
//  "search_queue": ["CS 236"],
// 	"course_codes": ["CS 124", "CS 235", "CS 236"],
//  "courses": [
// 		{ //this is a course object
// 			"course_code": "CS 124",
// 			"course_name": "Introduction to Programming",
// 			"credits": 3,
// 			"sections": [ this contains section objects ]
// 		}
// 	]
// }

// This module provides functions for storing and retrieving course data from local storage.

// Courses are stored as a map of course codes to lists of section objects.

// Constants for storage keys:
const KEY_SEMESTER_DICT = "semesters";
const KEY_COURSE_DICT = "courses";
const KEY_SEARCH_QUEUE = "search_queue";
const KEY_COURSE_CODES = "course_codes";
const KEY_FLAGS = "flags_object";

class MissingValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingValueError";
    Object.setPrototypeOf(this, MissingValueError.prototype);
  }
}

class StorageTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageTypeError";
    Object.setPrototypeOf(this, StorageTypeError.prototype);
  }
}

export async function store(key: string, object: any): Promise<void> {
  // localStorage.setItem(key, JSON.stringify(object));

  await browser.storage.local.set({ [key]: object });
}

export async function retrieve(key: string): Promise<any | null> {
  //Returns null if the key doesn't have anything stored.
  let obj = await browser.storage.local.get(key);
  if (isEmpty(obj)) {
    // console.warn("Retrieved object is empty");
    return null;
    // throw new MissingValueError(`No value associated with key ${key}.`);
  }
  return obj[key];
}

export async function remove(key: string) {
  // Do we need an await here?
  await browser.storage.local.remove(key);
}

function isEmpty(obj: Object): Boolean {
  return Object.keys(obj).length === 0;
}

export function formatCourseCode(code: string): cs.CourseCode {
  return code.replace(" ", "").toUpperCase();
}

export async function getSearchQueue(): Promise<Array<cs.CourseCode>> {
  let course_list = (await retrieve(KEY_COURSE_CODES)) || [];
  return course_list;
}

export async function getCourses(): Promise<Set<cs.CourseCode>> {
  // return new Set();
  // So fun fact: you can't store Sets in storage.
  let course_set = new Set(
    await retrieve(KEY_COURSE_CODES),
  ) as Set<cs.CourseCode>;
  return course_set;
}

// async function setCourses(courses: Set<cs.CourseCode>) {
//   let course_list = Array.from(courses);
//   store(KEY_COURSE_CODES, course_list);
// }

export async function addCourse(course_code: cs.CourseCode): Promise<void> {
  // console.log("getting courses");
  let courses = await getCourses();
  // console.log("Courses: ", courses);
  courses.add(course_code);
  // console.log("Courses: ", courses);
  // setCourses(courses);
  store(KEY_COURSE_CODES, Array.from(courses));
}

export async function removeCourse(course_code: cs.CourseCode): Promise<void> {
  // console.log("getting courses");
  let courses = await getCourses();
  // console.log("Courses: ", courses);
  if (courses.has(course_code)) {
    courses.delete(course_code);
    // console.log("Courses after removal: ", courses);
    store(KEY_COURSE_CODES, Array.from(courses));
  } else {
    console.warn(`Course code ${course_code} not found in courses.`);
  }
}

export async function hasCourse(course_code: cs.CourseCode): Promise<boolean> {
  // let courses = await getCourses();
  return (await getCourses()).has(course_code);
}

async function push(key: string, val: any) {
  let stack = await retrieve(key);
  if (!Array.isArray(stack)) {
    throw new TypeError(`${stack} is not a valid course code`);
  }
}

export async function pushCourse(course_code: cs.CourseCode) {
  let search_queue: Array<cs.CourseCode> =
    (await retrieve(KEY_SEARCH_QUEUE)) || [];
  search_queue.push(course_code);
  store(KEY_SEARCH_QUEUE, search_queue);
}

export async function popCourse(): Promise<cs.CourseCode | null> {
  let course_stack: Array<string> = (await retrieve(KEY_SEARCH_QUEUE)) || [];
  let popped_course = course_stack.pop() || null;
  store(KEY_SEARCH_QUEUE, course_stack);
  return popped_course;
}

async function getFlags(): Promise<object> {
  // This treats an object like a dictionary
  return (await retrieve(KEY_FLAGS)) as object || {};
}

export async function setFlag(flag: string, enabled: boolean) {
  let flags = await getFlags();
  flags[flag] = enabled;
  store(KEY_FLAGS, flags);
}

export async function flag(flag: string): Promise<boolean> {
  // If a flag doesn't currently exist, return null.
  return (await retrieve(KEY_FLAGS) as object || {})[flag] || null;
}

export async function removeFlag(flag:string) {
  let flags = await getFlags();
  delete flags[flag]
  store(KEY_FLAGS, flags);
}

// We need to be able to store and retrieve courses in semesters.
// We need to be able to get a list of courses for a given semester.
// We need to be able to get the sections associated with a course.

export async function getCoursesForSemester(semester: string): Promise<Array<cs.CourseCode>> {
  let semesters = await retrieve(KEY_SEMESTER_DICT) as object || {};
  return semesters[semester] || [];
}

export async function addCourseToSemester(semester: string, course_code: cs.CourseCode) {
  let semesters = await retrieve(KEY_SEMESTER_DICT) as object || {};
  if (!semesters[semester]) {
    semesters[semester] = [];
  }
  semesters[semester].push(course_code);
  store(KEY_SEMESTER_DICT, semesters);
}

export async function removeCourseFromSemester(semester: string, course_code: cs.CourseCode) {
  let semesters = await retrieve(KEY_SEMESTER_DICT) as object || {};
  if (semesters[semester]) {
    semesters[semester] = semesters[semester].filter((code: cs.CourseCode) => code !== course_code);
    store(KEY_SEMESTER_DICT, semesters);
  }
}

export async function getSectionsForCourse(course_code: cs.CourseCode): Promise<Array<cs.Section>> {
  let courses = await retrieve(KEY_COURSE_DICT) as object || {};
  return courses[course_code] || [];
}

export async function addSectionToCourse(course_code: cs.CourseCode, section: cs.Section) {
  let courses = await retrieve(KEY_COURSE_DICT) as object || {};
  if (!courses[course_code]) {
    courses[course_code] = [];
  }
  courses[course_code].push(section);
  store(KEY_COURSE_DICT, courses);
}

export async function removeSectionFromCourse(course_code: cs.CourseCode, section: cs.Section) {
  let courses = await retrieve(KEY_COURSE_DICT) as object || {};
  if (courses[course_code]) {
    courses[course_code] = courses[course_code].filter((sec: cs.Section) => sec !== section);
    store(KEY_COURSE_DICT, courses);
  }
}

export async function clearStorage() {
  await remove(KEY_SEMESTER_DICT);
  await remove(KEY_COURSE_DICT);
  await remove(KEY_SEARCH_QUEUE);
  await remove(KEY_COURSE_CODES);
  await remove(KEY_FLAGS);
}
