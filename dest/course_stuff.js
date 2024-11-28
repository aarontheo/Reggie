import * as timeStuff from "./time_stuff";
export function isCourseCode(str) {
    return /^[A-Z]{2,4} \d{3}$/.test(str);
}
export function isSemesterName(str) {
    // Matches anything in the form Fall 2021, SPRING 2022, etc.
    return /^(?:FALL|SPRING|SUMMER|WINTER) \d{4}/i.test(str);
}
export class Semester {
    semester_name;
    course_codes;
    constructor(course_codes) {
        this.course_codes = course_codes;
    }
    static fromJSON(semester_json) {
        return new Semester(semester_json.course_codes);
    }
    toJSON() {
        return {
            course_codes: this.course_codes,
        };
    }
    addCourse(course_code) {
        this.course_codes.push(course_code);
    }
    removeCourse(course_code) {
        this.course_codes = this.course_codes.filter((code) => code !== course_code);
    }
    getCourseCodes() {
        return this.course_codes;
    }
}
export class Section {
    course_section;
    instructor;
    building;
    room;
    //TODO: make types for these
    method;
    type;
    days;
    interval;
    constructor(course_section, instructor, building, room, method, days, interval) {
        this.course_section = course_section;
        this.instructor = instructor;
        this.building = building;
        this.room = room;
        this.method = method;
        this.days = days;
        this.interval = interval;
        // this.type = type;
    }
    static fromJSON(section_json) {
        return new Section(section_json.course_section, section_json.instructor, section_json.building, section_json.room, section_json.method, section_json.days, timeStuff.Interval.fromJSON(section_json.interval));
    }
    toString() {
        // return `${this.course_section} ${this.building} ${this.room} ${this.method} ${this.days}`;
        return this.course_section;
    }
    hasOverlap(section) {
        if (!this.days.some((day) => section.days.includes(day))) {
            return false;
        }
        else {
            return this.interval.hasOverlap(section.interval);
        }
    }
}
export class Course {
    course_code;
    course_name;
    credits;
    sections;
    constructor(course_code, course_name, credits = 1) {
        this.course_code = course_code;
        this.course_name = course_name;
        this.credits = credits;
        this.sections = [];
    }
    static fromJSON(course_json) {
        let course = new Course(course_json.course_code, course_json.course_name, course_json.credits);
        course.sections = course_json.sections.map((section) => Section.fromJSON(section));
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
    sections;
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
    hasOverlap(section) {
        return this.sections.some((s) => s.hasOverlap(section));
    }
    getOverlappingSections(section) {
        return this.sections.filter((s) => s.hasOverlap(section));
    }
    isValid() {
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
