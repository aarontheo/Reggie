# CURRENT TODO:

- [ ] Refactor storage API functions to work with the new classes

- [ ] Rewrite background.js in TypeScript
- [ ] Rewrite sidebar.js in TypeScript
- [ ] Rewrite course_search.js in TypeScript
- [ ] Rewrite popup.js in TypeScript

Do I want the user to pick a semester from a dropdown and then enter a year?
- [ ] Get desired semester from user
  - [ ] Popup asks for semester
  - [ ] Popup sends semester to Background.js
  - [ ] Background.js stores semester
  - [ ] Background.js sends semester to Course Search

- [ ] Initiate Course Search from Sidebar and Popup
  - [ ] Background.js opens Course Search
  - [ ] Course Search waits for a code from Background.js
  - [ ] Background.js tells Course Search to search a specific course code
  - [ ] Course Search receives code, searches it, stores JSON, returns to search page and sends back a success response
  - [ ] Background.js sends Course Search each course code in the list

- [ ] Interface with Course Search
  - [X] Search by a course code
  - [X] Get all section entries on a page
  - [X] Parse JSON section entries from the raw HTML/text
  - [ ] Store JSON section entries under their course codes using the API
  - [ ] Go through all pages of results
