compile: ff-tooling
	tsc

ff-tooling:
	npm install --save-dev @types/firefox-webext-browser

run:
	web-ext run --devtools --verbose --start-url https://student.byui.edu/ICS/Class_Schedule/Public_Course_Search.jnz
