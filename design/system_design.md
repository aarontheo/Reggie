I already know that this extension can be treated as a set of individual programs/scripts that will interact via message-passing. Therefore, I'm using this document to determine what exactly I want my data's shape to be. I will be using JSON to store my data.
## Courses
A course identifier will be a JSON object containing the necessary info required to search for the sections of a course, and an initially empty list to store sections.
```JSON
{
	"title": "Erlang Language",
	"course_code": "CSE 121E",
	"credits": 1, //May or may not keep this, not really needed.
	"sections": []
}
```
## Sections
### Times
Times will be represented in military time, to simplify. In JSON, they will be lists of two ints, representing the hour and the minutes.
```JSON
{
	"time": ""
}
```
Sections are stored under courses.
```JSON
{
	"course_section": "CSE 382-01", //Should I keep the whole thing, or just 01?
	"instructor": "Barney, Lee S.",
	"building": "STC",
	"room": "221",
	"method": "In-Person",
	"type": "DAY",
	"schedule": {
		"days": ["M", "W"],
		"start_time": [11, 30],
		"end_time": [13, 0]"
	}
}
```
## Schedules
Schedules are a collection of course sections.
```JSON
{
	
	sections: [],
	
}
```