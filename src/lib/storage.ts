import * as cs from './course_stuff';

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

export function store(key: string, object: any): void {
  // localStorage.setItem(key, JSON.stringify(object));
  browser.storage.local.set({ [key]: object });
}

export function retrieve(key: string): Promise<any> {
  return browser.storage.local.get(key);
}

export async function getCourseList(): Promise<string[]> {
  let course_list = await retrieve(KEY_COURSE_CODES) || [];
  return course_list;
}

export async function pushCourse(course_code:string) {
  let course_stack: Array<string> = await retrieve(KEY_SEARCH_QUEUE) || [];
  course_stack.push(course_code);
  store(KEY_SEARCH_QUEUE, course_stack);
}

export async function popCourse(): Promise<string | null> {
  let course_stack: Array<string> = await retrieve(KEY_SEARCH_QUEUE) || [];
  if (course_stack.length == 0) {
    return null;
  }
  let popped_course = course_stack.pop();
  store(KEY_SEARCH_QUEUE, course_stack);
  return popped_course;
}
