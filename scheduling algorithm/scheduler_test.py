import pytest

from scheduler import *

def test_time_eq():
	a = Time(9,0)
	b = Time(9,0)
	assert a == b

	a = Time(9,0)
	b = Time(8,0)
	assert not (a == b)

def test_time_lt():
	a = Time(9,0)
	b = Time(10,0)
	assert a < b

	a = Time(9,0)
	b = Time(8,0)
	assert not (a < b)

def test_time_gt():
	a = Time(9,0)
	b = Time(8,0)
	assert a > b

	a = Time(9,0)
	b = Time(10,0)
	assert not (a > b)

def test_interval_contains_time():
	a = Time(9,0)
	b = Interval(Time(8,0), Time(10,0))
	assert a in b

	a = Time(5,0)
	b = Interval(Time(8,0), Time(10,0))
	assert not (a in b)

def test_time_overlap():
	a = Interval(Time(8, 0), Time(9, 0))
	b = Interval(Time(8, 30), Time(9, 30))
	assert a.has_overlap(b) == True

	a = Interval(Time(8, 0), Time(9, 0))
	b = Interval(Time(9, 0), Time(10, 0))
	assert a.has_overlap(b) == False

	a = Interval(Time(8, 0), Time(9, 0))
	b = Interval(Time(7, 0), Time(8, 0))
	assert a.has_overlap(b) == False
