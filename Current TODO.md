# CURRENT TODO:

- [ ] Create tutorial thing in popup

## Sidebar
- [X] Get sidebar.js linked properly by adding it to web resources.
- [ ] Link sidebar.js to storage.js, possibly also with web resources.
- [ ] Course code entry field
- [ ] Course code validation + formatting
- [ ] Course code storage

## Course Search API
- [ ] Initiate Course Search from Sidebar and Popup
  - [ ] Background.js opens Course Search
  - [ ] Course Search waits for a code from Background.js
  - [ ] Background.js tells Course Search to search a specific course code
  - [ ] Course Search receives code, searches it, stores JSON, returns to search page and sends back a success response
  - [ ] Background.js sends Course Search each course code in the list

- [ ] Interface with Course Search
  - [ ] Search by a course code
  - [ ] Get all section entries on a page
  - [X] Parse JSON section entries from the raw HTML/text
  - [ ] Store JSON section entries under their course codes using the API
  - [ ] Go through all pages of results
