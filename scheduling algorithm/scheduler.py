import json
from typing import Any, Iterable
from time_stuff import Time, Interval
from course_stuff import Course, Schedule, Section

courses_json = json.load(open('test_data.json'))

def intersection(a:Iterable, b:Iterable) -> list:
	return list(set(a) & set(b))

def get_sections(course) -> list:
	'''
		Returns a list of sections for a given course.
	'''
	return course['sections']

def main():
	courses = []

	# Get the courses from JSON
	for course_json in courses_json:
		courses.append(Course(course_json))

	# for course in courses:
	# 	print(course.title)
	# 	for section in course.sections:
	# 		print(section.course_section, section.days, section.interval)
	# 	print()

	# try fitting each thing into a schedule
	schedule = Schedule()
	# for each course
	course: Course
	for course in courses:
		# try to fit a section in until successful
		success = False
		for section in course.sections:
			if schedule.is_section_compatible(section):
				schedule.add_section(section)
				success = True
				break
		if not success:
			print(f"Could not fit ({course.code} - {course.title}) into the schedule. Conflicts with:")
			for section in course.sections:
				overlapping = schedule.get_overlapping_sections(section)
				if overlapping:
					# print(f"{section} at {section.interval}")
					for section in overlapping:
						print(f"({section} - {section.parent_course.title}) at {section.interval}")
				print()

# TODO: Implement checking multiple valid schedules
# Maybe try rebuilding the schedule with the second section of the first course,
# then the second section of the second course, etc.
# Do a count up, check every combination of sections.

if __name__ == '__main__':
	main()


#This is only supposed to happen if there is no possible section.
# overlapping = schedule.get_overlapping_sections(section)
# print(f"{section} is not compatible. Conflicts with:")
# for section in overlapping: {intersection(section.days, section.days)} at {section.interval}")
# print()
