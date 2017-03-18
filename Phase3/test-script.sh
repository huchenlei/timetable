#!/bin/bash
read -p $'insertCourse'
curl -X POST http://localhost:3000/courses/insertCourse \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC108",
  "title": "cs course",
  "description": "easy",
  "br": 1
}'

read -p $'\nget courseInfo'
curl -X GET http://localhost:3000/courses/courseInfo/2016F/CSC108

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

read -p $'\nUpdate section'
curl -X PUT http://localhost:3000/courses/updateSection \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC108",
  "semester": "2016F",
  "type": "lec",
  "sectionCode": "0101",
  "instructor": "jasmine"
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

read -p $'\ndelelteTimeslot'
curl -X DELETE http://localhost:3000/courses/deleteTimeslot \
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

read -p $'\nadd a user'

curl -X POST http://localhost:3000/users/addUser \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "userName": "limartinzj",
  "password": "123456",
  "fullName": "MartinLi",
  "emailAdress": "limartinzj@gmail.com"
}'

read -p $'\nfind user test'

curl -X GET http://localhost:3000/users/info/limartinzj

read -p $'\nupdate user test'

curl -X PUT http://localhost:3000/users/info/limartinzj \
    -H "Content-Type: application/json; charset=utf-8" \
    -d '{
    "userName": "limartinzj",
    "passWord": "654321",
    "fullName": "LIZHIJIAN",
    "emailAdress": "martin.li@mail.utoronto.ca"
    }'

read -p $'\nadd course section to user'

curl -X POST http://localhost:3000/users/info/limartinzj/addUserCourse \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "courseCode": "CSC108",
  "semester": "2016F",
  "type": "lec",
  "sectionCode": "0101",
  "instructor": "kinder"
}'

read -p $'\ninsertPreference test'
curl -X POST http://localhost:3000/users/insertPreference/limartinzj \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "type": "mon",
  "value": "morning"
}'

read -p $'\ninsertPreference test (fail becaues no user named kinder)'
curl -X POST http://localhost:3000/users/insertPreference/kinder \
     -H "Content-Type: application/json; charset=utf-8" \
     -d '{
  "type": "mon",
  "value": "morning"
}'

read -p $'\ndelete user test'

curl -X DELETE http://localhost:3000/users/info/limartinzj \
    -d '{
    "userName": "limartinzj"
    }'