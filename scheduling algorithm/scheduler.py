import json
from typing import Any, Iterable
from time_stuff import Time, Interval
from course_stuff import Course, Section

courses = json.load(open('test_data.json'))

schedule = []


def intersection(a:Iterable, b:Iterable) -> list:
	return list(set(a) & set(b))

def get_sections(course) -> list:
	'''
		Returns a list of sections for a given course.
	'''
	return course['sections']

def is_section_compatible(section:Section, schedule:list[Section]) -> bool:
	'''
		Checks if a section is compatible with the schedule.
		Returns True if compatible, False if not.
	'''

def add_section(section, schedule):
	'''
		Adds a section to the schedule.
	'''

def main():
	for course in courses:
		print(course['title'])
		for section in course['sections']:
			print(section['course_section'])

if __name__ == '__main__':
	main()
