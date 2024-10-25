from time_stuff import Time, Interval

class Course:
	def __init__(self, json_data:dict):
		self.title = json_data['title']
		self.sections = [Section(section) for section in json_data['sections']]

class Section:
	def __init__(self, json_data:dict):
		self.course_section = json_data['course_section']
		self.days = json_data['days']
		self.start = Time(*json_data['start'])
		self.end = Time(*json_data['end'])
		self.interval = Interval(self.start, self.end)

	def has_overlap(self, section:'Section') -> bool:
		return self.interval.has_overlap(section.interval)

class Schedule:
	def __init__(self):
		self.schedule :list[Section] = []

	def add_section(self, section:Section):
		self.schedule.append(section)

	def is_section_compatible(self, section:Section) -> bool:
		for scheduled_section in self.schedule:
			if scheduled_section.has_overlap(section):
				return False
		return True
