import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SuiModule} from 'ng2-semantic-ui';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {CourseItemComponent} from './components/course-item/course-item.component';
import {PreferenceSelectorComponent} from './components/preference-selector/preference-selector.component';
import {TimetableComponent} from './components/timetable/timetable.component'
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {AlertComponent} from './components/alert/alert.component'

import {PreferenceService} from './services/preference.service';
import {CourseService} from './services/course.service';
import {AlertService} from './services/alert.service';

import {TranslatePipe} from './pipes/translate.pipe';
import {ResponsiveModule} from 'ng2-responsive';
import {CourseBodyComponent} from './components/course-body/course-body.component';
import {ConstraintComponent} from './components/constraint/constraint.component';
import {ConstraintDetailComponent} from './components/constraint-detail/constraint-detail.component';
import {SuiModal} from "ng2-semantic-ui/dist";

export const routing = RouterModule.forRoot([
    {path: '', component: AppComponent},

    // otherwise redirect to home
    {path: '**', redirectTo: ''}
]);

@NgModule({
    declarations: [
        AppComponent,
        CourseItemComponent,
        TranslatePipe,
        TimetableComponent,
        SearchBarComponent,
        CourseBodyComponent,
        AlertComponent,
        ConstraintComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SuiModule,
        ResponsiveModule,
        RouterModule,
        routing
    ],
    providers: [CourseService, AlertService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
