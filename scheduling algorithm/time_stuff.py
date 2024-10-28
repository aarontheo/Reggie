# Time = tuple[int, int] #I've opted to make this a Class
class Time:
	def __init__(self, hours:int, minutes:int) -> None:
		self.hours = hours
		self.minutes = minutes

	def __str__(self) -> str:
		return f'{self.hours}:{self.minutes:02}'

	def __eq__(self, t2) -> bool:
		if not isinstance(t2, Time):
			return NotImplemented
		if t2.hours == self.hours and t2.minutes == self.minutes:
			return True
		return False

	def __lt__(self, t2) -> bool:
		if not isinstance(t2, Time):
			return NotImplemented
		if self.hours < t2.hours:
			return True
		if self.hours > t2.hours:
			return False
		if self == t2:
			return False
		if self.hours == t2.hours:
			if self.minutes < t2.minutes:
				return True
			return False
		return False

	def __gt__(self, t2) -> bool:
		if not isinstance(t2, Time):
			return NotImplemented
		return not (self.__lt__(t2) or self.__eq__(t2))

# Interval = tuple[Time, Time]
class Interval:
	def __init__(self, start:Time, end:Time) -> None:
		self.start = start
		self.end = end

	def __str__(self) -> str:
		return f'{self.start} - {self.end}'

	def __contains__(self, time:Time):
		return self.start < time < self.end

	def has_overlap(self, interval:'Interval') -> bool:
		'''
				Checks if two times overlap.
				Returns True if overlap, False if not.
		'''
		return (self.start in interval) or (self.end in interval) or (interval.start in self) or (interval.end in self)
