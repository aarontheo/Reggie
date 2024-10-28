from time_stuff import Time, Interval
import json

class Course:
	def __init__(self, json_data:dict):
		# json_data = json.load(open(json_path))
		self.title = json_data['title']
		self.code = json_data['course_code']
		self.sections = [Section(section, parent_course=self) for section in json_data['sections']]

class Section:
	def __init__(self, json_data:dict, parent_course:Course|None = None):
		self.course_section = json_data['course_section']
		self.days = json_data['days']
		self.start = Time(*json_data['start_time'])
		self.end = Time(*json_data['end_time'])
		self.interval = Interval(self.start, self.end)
		if parent_course:
			self.parent_course:Course = parent_course

	def __str__(self) -> str:
		return self.course_section

	def has_overlap(self, section:'Section') -> bool:
		# Need to check if the days overlap
		if not any(day in self.days for day in section.days):
			return False
		else:
			return self.interval.has_overlap(section.interval)

class Schedule:
	def __init__(self):
		self.sections:list[Section] = []

	def add_section(self, section:Section):
		self.sections.append(section)

	def is_section_compatible(self, section:Section) -> bool:
		for scheduled_section in self.sections:
			if scheduled_section.has_overlap(section):
				return False
		return True

	def get_overlapping_sections(self, section:Section) -> list[Section]:
		# Returns a list of the sections in the schedule which overlap with the given section.
		overlapping = []
		for scheduled_section in self.sections:
			if scheduled_section.has_overlap(section):
				overlapping.append(scheduled_section)
		return overlapping

	def is_valid(self) -> bool:
		for i in range(len(self.sections)):
			for j in range(i+1, len(self.sections)):
				if self.sections[i].has_overlap(self.sections[j]):
					return False
		return True
