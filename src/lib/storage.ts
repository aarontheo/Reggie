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

class MissingValueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingValueError';
    Object.setPrototypeOf(this, MissingValueError.prototype);
  }
}

function isEmpty(obj: Object): Boolean {
  return Object.keys(obj).length === 0;
}

export function formatCourseCode(code: string): cs.CourseCode {
  return code.replace(" ", "").toUpperCase();
}

function store(key: string, object: any): void {
  // localStorage.setItem(key, JSON.stringify(object));
  browser.storage.local.set({ [key]: object });
}

async function retrieve(key: string): Promise<any> | null {
  let obj = browser.storage.local.get(key);
  if (isEmpty(await obj)) {
    // return null; //TODO: should this throw an error instead?
    throw new MissingValueError(`No value associated with key ${key}.`);
  }
  return obj[key];
}

export async function getSearchQueue(): Promise<cs.CourseCode[]> {
  let course_list = (await retrieve(KEY_COURSE_CODES)) || [];
  return course_list;
}

export async function getCourses(): Promise<Set<cs.CourseCode>> {
  return new Set();
}

export async function hasCourse(course_code: cs.CourseCode): Promise<boolean> {
  // let courses = await getCourses();
  return (await getCourses()).has(course_code);
}

async function push(key:string, val:any) {
  let stack = await retrieve(key);
  if (!Array.isArray(stack)) {
    throw new TypeError(`${stack} is not a valid course code`);
  }
}

export async function pushCourse(course_code: cs.CourseCode) {
  // FIXME: Doesn't currently work right.
  // TODO: Should change this to use a set.
  course_code = formatCourseCode(course_code);
  if (!cs.isCourseCode(course_code)) {
    throw new TypeError(`${course_code} is not a valid course code`);
  }
  let search_queue: Array<cs.CourseCode> = (await retrieve(KEY_SEARCH_QUEUE)) || [];
  if (!Array.isArray(search_queue)) {
    console.log(search_queue);
    throw new TypeError("search_queue is not an array");
  }
  (search_queue as Array<cs.CourseCode>).push(course_code);
  store(KEY_SEARCH_QUEUE, search_queue);
}

export async function popCourse(): Promise<cs.CourseCode | null> {
  let course_stack: Array<string> = (await retrieve(KEY_SEARCH_QUEUE)) || [];
  let popped_course = course_stack.pop();
  store(KEY_SEARCH_QUEUE, course_stack);
  return popped_course;
}
