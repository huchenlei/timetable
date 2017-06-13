import { Component } from '@angular/core';

import { CourseItemComponent } from './components/course-item/course-item.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectedCourses = ['CSC108', 'CSC165', 'MAT137', 'PSY100', 'ECO100']

  deleteCourse(course : string): void {
      this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
  }
}
