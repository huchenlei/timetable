#!/bin/bash
read -p $'insert csc108'
curl -X POST http://localhost:3000/courses/insertCourse \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC108",
  "title": "Intro to Python",
  "description": "easy",
  "br": 1
}'

read -p $'\ninsert csc148'
curl -X POST http://localhost:3000/courses/insertCourse \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC148",
  "title": "Advanced course to Python",
  "description": "medium",
  "br": 1
}'

read -p $'\nInsert section'
curl -X POST http://localhost:3000/courses/insertSection \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC108",
  "semester": "2016F",
  "type": "lec",
  "sectionCode": "0101",
  "instructor": "kinder"
}'

read -p $'\ninsertTimeslot'
curl -X POST http://localhost:3000/courses/insertTimeslot \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC108",
  "semester": "2016F",
  "type": "lec",
  "sectionCode": "0101",
  "weekday": "mon",
  "start": 12,
  "end": 14,
  "location": "ba2270"
}'

read -p $'\nget courseInfo for CSC108'
curl -X GET http://localhost:3000/courses/CSC108

read -p $'\nget courseInfo for CSC148'
curl -X GET http://localhost:3000/courses/CSC148

read -p $'\nget all csc courses'
curl -X GET http://localhost:3000/courses?courseCode=CSC
