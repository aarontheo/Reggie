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

export async function retrieve(key: string): Promise<any> {
  // var retrieved = localStorage.getItem(key);
  // if (retrieved === null) {
  //   return null;
  // }
  // return JSON.parse(retrieved);
  return await browser.storage.local.get(key);
}

// function getSemesterDict() {
//   return retrieve(KEY_SEMESTER_DICT) || {};
// }

// function getSemester(semester_name:cs.SemesterName) {
//   return getSemesterDict()[semester_name] || {};
// }

// function getCourseDict() {
//   return retrieve(KEY_COURSE_DICT) || {};
// }

// function getSections(course_code:string): Array<cs.Section> {
//   return getCourseDict()[course_code] || [];
// }

// function addCourse(course_code:string) {

// }

// async function getSearchQueue(): Array<string> {
//   return await retrieve(KEY_SEARCH_QUEUE) || [];
// }

// function getCourseCodes() {
//   return retrieve(KEY_COURSE_CODES) || [];
// }

// function pushSearchQueue(course_code: string) {
//   var queue = getSearchQueue();
//   queue.push(course_code);
//   store(KEY_SEARCH_QUEUE, queue);
// }

// function popSearchQueue(): string | null {
//   var queue = getSearchQueue();
//   var popped = queue.pop();
//   localStorage.setItem("search_queue", JSON.stringify(queue));
//   return popped || null;
// }

// function emptySearchQueue() {
//   store(KEY_SEARCH_QUEUE, []);
// }

// function emptyCourseDict() {
//   store(KEY_COURSE_DICT, {});
// }
