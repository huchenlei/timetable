#!/bin/bash
read -p $'insert CSC108'
curl -X POST http://localhost:3000/courses/insertCourse \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC108",
  "title": "Intro to Python",
  "description": "easy",
  "br": 1,
  "courseLevel": 100
}'

read -p $'\nInsert CSC108 L0101'
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

read -p $'\ninsert ENV400'
curl -X POST http://localhost:3000/courses/insertCourse \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "ENV400",
  "title": "Intro to environmental studies",
  "description": "easy",
  "br": 2,
  "courseLevel": 400
}'

read -p $'\nInsert ENV400 L0101'
curl -X POST http://localhost:3000/courses/insertSection \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "ENV400",
  "semester": "2016F",
  "type": "lec",
  "sectionCode": "0101",
  "instructor": "morgan"
}'

read -p $'\ninsertTimeslot'
curl -X POST http://localhost:3000/courses/insertTimeslot \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "ENV400",
  "semester": "2016F",
  "type": "lec",
  "sectionCode": "0101",
  "weekday": "mon",
  "start": 12,
  "end": 14,
  "location": "MS2150"
}'

read -p $'\ninsertTimeslot'
curl -X POST http://localhost:3000/courses/insertTimeslot \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "ENV400",
  "semester": "2016F",
  "type": "lec",
  "sectionCode": "0101",
  "weekday": "wed",
  "start": 12,
  "end": 14,
  "location": "MS2150"
}'

read -p $'\ninsert CSC148'
curl -X POST http://localhost:3000/courses/insertCourse \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC148",
  "title": "Advanced course to Python",
  "description": "medium",
  "br": 1,
  "courseLevel": 100
}'


read -p $'\nInsert CSC148 L0201'
curl -X POST http://localhost:3000/courses/insertSection \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC148",
  "semester": "2016F",
  "type": "lec",
  "sectionCode": "0201",
  "instructor": "david"
}'

read -p $'\ninsertTimeslot'
curl -X POST http://localhost:3000/courses/insertTimeslot \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC148",
  "semester": "2016F",
  "type": "lec",
  "sectionCode": "0201",
  "weekday": "fri",
  "start": 10,
  "end": 13,
  "location": "MS2150"
}'



