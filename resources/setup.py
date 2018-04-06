import uoftscrapers as uoft
import os


def mkdir(path):
    if not os.path.exists(path):
        os.mkdir(path)


resource_root = "./"
mkdir(resource_root)

course_dir = resource_root + "/courses"
mkdir(course_dir)
uoft.Courses.scrape(course_dir)

building_dir = resource_root + "/buildings"
mkdir(building_dir)
uoft.Buildings.campuses = ['utsg']
uoft.Buildings.scrape(building_dir)
