# Smart Time Table
The project dedicated on providing a better course scheduling experience
for students at University of Toronto.

## TODOs
1. Header:
   - Sign in/out with acorn username/password
1. main:
   - Currently clicking on course feature is disabled in the cleaning of
   legacy code need to implement in a nicer way.
   - Fix column size when there is conflict.
1. footer:
   - contain all github links and a email link.

## Setting Up
#### Database
- config the python environment to use python3
- run `pip install uoftscrapers`
- `cd resources`
- run `python setup.py` to scrape course and building information
- `cd ..`
- `sudo mongod` to start mongodb server at localhost default port
- `ts-node db_init.ts` to save all scraped data to mongodb

#### `course-arrange` library
Currently `course-arrange` library is still under development, so we directly
 clone it from github. simply run `perl synchronize_course_arrange.pl` to
 update the project from github.

#### Development Server
instead of running `ng serve` directly, run `npm start` to start the test
 server so that all ajax request on page will be proxy to backend server
 at `localhost:3000`
