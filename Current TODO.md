# CURRENT TODO:

## System
### Messaging API
  - [ ] Implement shortcut functions for sending messages with a recipient/action and a payload
  - [ ] Implement system for matching message structure?
    - [ ] Implement hasProp() function for objects? (Can also use `'prop' in object')

### Storage API
  - [X] Fix pushing and popping the search queue in storage.ts

## Popup
  - [ ] Create tutorial thing in popup

## Sidebar
  - [X] Get sidebar.js linked properly by adding it to web resources.
  - [X] Link sidebar.js to storage.js, possibly also with web resources.
  - [X] Determine whether both localstorage and browser.storage persistent/extension-specific.
  - [X] Course code entry field
  - [X] Course code validation + formatting
  - [X] Course code storage

## Course Search API
  - [ ] Search
  - [ ] Initiate Course Search from Sidebar and Popup
    - [ ] Background.js Performs Course Search process
    - [ ] Course Search waits for a code from Background.js
    - [ ] Background.js tells Course Search to search a specific course code
    - [ ] Course Search receives code, searches it, stores JSON, returns to search page and sends back a success response
    - [ ] Background.js sends Course Search each course code in the list
  - [ ] Background script needs to track course_search tabs to send messages to each
  - [ ] Interface with Course Search
    - [ ] Search by a course code
    - [ ] Get all section entries on a page
    - [X] Parse JSON section entries from the raw HTML/text
    - [ ] Store JSON section entries under their course codes using the API
    - [ ] Go through all pages of results
