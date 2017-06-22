#!/bin/bash
for filename in *; 
    do mongoimport --db timetable --collection courses --file $filename;
done