import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SuiModule } from 'ng2-semantic-ui';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

import { AppComponent } from './app.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { PreferenceSelectorComponent } from './components/preference-selector/preference-selector.component';
import { TimetableComponent } from './components/timetable/timetable.component'
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { PreferenceService } from './services/preference.service';
import { CourseService } from './services/course.service';

import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CourseItemComponent,
    PreferenceSelectorComponent,
    TranslatePipe,
    TimetableComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SuiModule
  ],
  providers: [ PreferenceService, CourseService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
