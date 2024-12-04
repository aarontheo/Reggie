import * as timeStuff from "./time_stuff.js";

type Method = "In-Person" | "Online";
type Day = "M" | "T" | "W" | "R" | "F" | "Sa" | "Su";

export type CourseCode = string;

export function isCourseCode(str: string): str is CourseCode {
  return /^[A-Z]{2,4}\d{3}[A-z]*$/.test(str);
}

export type SemesterName = string;
export function isSemesterName(str: string): str is SemesterName {
  // Matches anything in the form Fall 2021, SPRING 2022, etc.
  return /^(?:FALL|SPRING|SUMMER|WINTER) \d{4}/i.test(str);
}

export class Semester {
  public semester_name: SemesterName;
  private course_codes: Array<CourseCode>;

  constructor(course_codes: Array<CourseCode>) {
    this.course_codes = course_codes;
  }

  static fromJSON(semester_json: any) {
    return new Semester(semester_json.course_codes);
  }

  toJSON() {
    return {
      course_codes: this.course_codes,
    };
  }

  addCourse(course_code: CourseCode) {
    this.course_codes.push(course_code);
  }

  removeCourse(course_code: CourseCode) {
    this.course_codes = this.course_codes.filter(
      (code) => code !== course_code,
    );
  }

  getCourseCodes(): Array<string> {
    return this.course_codes;
  }
}

export class Section {
  public course_section: string;
  instructor: string;
  building: string;
  room: string;
  //TODO: make types for these
  method: string;
  type: string;
  days: Array<Day>;
  interval: timeStuff.Interval;

  constructor(
    course_section: string,
    instructor: string,
    building: string,
    room: string,
    method: Method,
    days: Array<Day>,
    interval: timeStuff.Interval,
  ) {
    this.course_section = course_section;
    this.instructor = instructor;
    this.building = building;
    this.room = room;
    this.method = method;
    this.days = days;
    this.interval = interval;
    // this.type = type;
  }

  static fromJSON(section_json: any) {
    return new Section(
      section_json.course_section,
      section_json.instructor,
      section_json.building,
      section_json.room,
      section_json.method,
      section_json.days,
      timeStuff.Interval.fromJSON(section_json.interval),
    );
  }

  toString() {
    // return `${this.course_section} ${this.building} ${this.room} ${this.method} ${this.days}`;
    return this.course_section;
  }

  hasOverlap(section: Section) {
    if (!this.days.some((day) => section.days.includes(day))) {
      return false;
    } else {
      return this.interval.hasOverlap(section.interval);
    }
  }
}

export class Course {
  public course_code: string;
  public course_name: string;
  public credits: number;
  public sections: Array<Section>;

  constructor(course_code: string, course_name: string, credits = 1) {
    this.course_code = course_code;
    this.course_name = course_name;
    this.credits = credits;
    this.sections = [];
  }

  static fromJSON(course_json) {
    let course = new Course(
      course_json.course_code,
      course_json.course_name,
      course_json.credits,
    );
    course.sections = course_json.sections.map((section) =>
      Section.fromJSON(section),
    );
    return course;
  }

  addSection(section) {
    this.sections.push(section);
  }

  removeSection(section) {
    this.sections = this.sections.filter((s) => s !== section);
  }

  getSection(section_code) {
    return this.sections.find((s) => s.course_section === section_code);
  }

  getSections() {
    return this.sections;
  }
}

class Schedule {
  private sections: Array<Section>;

  constructor() {
    this.sections = [];
  }

  addSection(section) {
    this.sections.push(section);
  }

  removeSection(section) {
    this.sections = this.sections.filter((s) => s !== section);
  }

  getSections() {
    return this.sections;
  }

  hasOverlap(section: Section) {
    return this.sections.some((s) => s.hasOverlap(section));
  }

  getOverlappingSections(section: Section) {
    return this.sections.filter((s) => s.hasOverlap(section));
  }

  isValid(): boolean {
    for (let i = 0; i < this.sections.length; i++) {
      for (let j = i + 1; j < this.sections.length; j++) {
        if (this.sections[i].hasOverlap(this.sections[j])) {
          return false;
        }
      }
    }
    return true;
  }
}
// Need functions for:
// - pushing and popping the search queue
// - adding and removing course codes
// - retrieving the list of course codes
// - adding and removing the sections of a course
