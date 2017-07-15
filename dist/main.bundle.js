webpackJsonp([1],{

/***/ "./src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src async recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".logo-branding {\n    background-color: #51B8A3 !important;\n    font-size: 18px;\n}\n\n.ui.vertical.inverted.sidebar.menu.left.overlay.visible {\n    background-color: #4E4E4E;\n}\n\napp-course-item.course {\n  border: none !important;\n  border-radius: 4px;\n    margin: 5px 0 !important;\n}\n\napp-course-item.course:hover {\n    background-color: #777;\n}\n\n.solution {\n  display: block;\n  padding: 5px 10px;\n  border-radius: 5px;\n  background-color: #454545 !important;\n  margin-bottom: 5px;\n  cursor: pointer;\n}\n\n.solution:hover {\n  background-color: #656565 !important;\n}\n\n#logo {\n  height: 50px;\n  display: inline-block;\n}\n\n.content {\n  margin-left: 375px;\n  padding:25px;\n}\n\n.side-button {\n  background-color: #000;\n  position: fixed;\n  width: 100%;\n  -webkit-box-pack:start;\n      -ms-flex-pack:start;\n          justify-content:flex-start;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  padding:10px;\n  color:white !important;\n  cursor: pointer;\n}\n.sidebar-toggle {\n  color: white;\n  position: -webkit-sticky;\n  position: sticky;\n}\n\nalert {\n  position: fixed;\n  top: 0;\n}\n\ninput * {\n  width: 100% !important;\n}\n\n.ui.input.icon, sui-search, app-search-bar, .ui.search {\n  width: 100% !important;\n}\n\n@media screen and (max-width: 990px) {\n  .content {\n    margin-left: 0px;\n    padding: 50px 0px 10px 0px;\n  }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The whole content below can be removed with the new code.-->\n<alert></alert>\n<sui-sidebar-container class=\"ui bottom attached segment\">\n    <sui-sidebar class=\"inverted vertical\" #sidebar>\n      <div class=\"item logo-branding\">\n          <img src=\"../assets/images/logo-white.svg\" alt=\"\" id=\"logo\"> <span style=\"font-size:14px\"> Smart Timetable</span> <sup style=\"font-size:9px\">2018</sup>\n          <i class=\"close icon\" (click)=\"sidebar.close();\"></i>\n      </div>\n      <div class=\"item\">\n        <app-search-bar (addCourse)=\"addCourse($event)\" [term]=\"term\"></app-search-bar>\n      </div>\n      <div class=\"item course-queue\">\n          <div class=\"header\">\n              Courses\n          </div>\n          <app-course-item\n              *ngFor=\"let course of getCourseInOneList()\"\n              href=\"\"\n              class=\"course ui grid\"\n              [course]=\"course\"\n              (deleteCourse)=\"deleteCourse($event)\">\n          </app-course-item>\n      </div>\n      <div class=\"item preferences\">\n          <div class=\"header\">\n              Preferences\n          </div>\n          <app-preference-selector>\n          </app-preference-selector>\n          <br />\n          <button (click)=\"getSolutions()\" class=\"fluid ui button\" style=\"background-color:#51B8A3; margin-top:10px\">\n              Get solution\n          </button>\n      </div>\n\n      <div class=\"item solutions\">\n        <div class=\"header\">\n            Solutions\n        </div>\n        <a *ngFor=\"let solution of solutionlist[term]; let i = index\" (click)=\"timetable.renderSolution(i, term);sidebar.close();\" class=\"solution\">\n          Solution {{i + 1}}<br /><span style=\"font-size:12px; opacity: 0.5\">{{solution.extraTitle}}</span>\n        </a>\n      </div>\n    </sui-sidebar>\n    <sui-sidebar-sibling [isDimmedWhenVisible]=\"true\">\n      <div *responsive=\"{\n                          bootstrap: ['xl','lg','md']\n                        }\">\n        <!-- ui inverted vertical left fixed menu tablet or lower hidden -->\n          <div class=\"ui left vertical inverted labeled sidebar menu pushable push visible tablet or lower hidden\" style=\"overflow:overlay;\">\n\n              <div class=\"item logo-branding\">\n                  <img src=\"../assets/images/logo-white.svg\" alt=\"\" id=\"logo\"> <span style=\"font-size:14px\"> Smart Timetable</span> <sup style=\"font-size:9px\">2018</sup>\n              </div>\n              <div class=\"item\">\n                <app-search-bar (addCourse)=\"addCourse($event)\" [term]=\"term\"></app-search-bar>\n              </div>\n              <div class=\"item course-queue\">\n                  <div class=\"header\">\n                      Courses\n                  </div>\n                  <app-course-item\n                      *ngFor=\"let course of getCourseInOneList()\"\n                      href=\"\"\n                      class=\"course ui grid\"\n                      [term]=\"term\"\n                      [course]=\"course\"\n                      (deleteCourse)=\"deleteCourse($event)\">\n                  </app-course-item>\n              </div>\n              <div class=\"item preferences\">\n                  <div class=\"header\">\n                      Preferences\n                  </div>\n                  <app-preference-selector>\n                  </app-preference-selector>\n                  <br />\n                  <button (click)=\"getSolutions()\" class=\"fluid ui button\" style=\"background-color:#51B8A3; margin-top:10px\">\n                      Get solution\n                  </button>\n              </div>\n\n              <div class=\"item solutions\">\n                <div class=\"header\">\n                    Solutions\n                </div>\n                <a *ngFor=\"let solution of solutionlist[term]; let i = index\" (click)=\"timetable.renderSolution(i, term)\" class=\"solution\">\n                  Solution {{i + 1}}<br /><span style=\"font-size:12px; opacity: 0.5\">{{solution.extraTitle}}</span>\n                </a>\n              </div>\n          </div>\n      </div>\n      <div class=\"side-button\" *responsive=\"{\n                          bootstrap: ['xs','sm']\n                        }\" (click)=\"sidebar.toggle()\">\n        <a class=\"launch icon item sidebar-toggle\">\n          <i class=\"sidebar icon\"></i>\n        </a>\n      </div>\n\n      <div class=\"content\" style=\"\">\n          <div class=\"ui container\">\n              <div class=\"ui segment\">\n                <div class=\"ui secondary pointing menu\">\n                  <a class=\"{{(this.term === '2017 Fall') ? 'active' : ''}} item\" (click)=\"selectTerm('2017 Fall')\">\n                    Fall 2017\n                  </a>\n                  <a class=\"{{(this.term === '2018 Winter') ? 'active' : ''}} item\" (click)=\"selectTerm('2018 Winter')\">\n                    Winter 2018\n                  </a>\n                  <!-- <a class=\"item disabled\" >\n                    Summer 2018\n                  </a> -->\n                </div>\n              </div>\n              <app-timetable></app-timetable>\n\n          </div>\n      </div>\n\n    </sui-sidebar-sibling>\n</sui-sidebar-container>\n<div class=\"ui active dimmer\" *ngIf=\"loading\">\n  <div class=\"ui loader\"></div>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_timetable_timetable_component__ = __webpack_require__("./src/app/components/timetable/timetable.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_course_service__ = __webpack_require__("./src/app/services/course.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_preference_service__ = __webpack_require__("./src/app/services/preference.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alert_service__ = __webpack_require__("./src/app/services/alert.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = (function () {
    function AppComponent(courseService, preferenceService, alertService) {
        this.courseService = courseService;
        this.preferenceService = preferenceService;
        this.alertService = alertService;
        this.title = 'app';
        this.selectedCourses = ['CSC108', 'CSC165', 'MAT137', 'PSY100', 'ECO100'];
        this.term = "2017 Fall";
        this.solutionlist = {};
        this.loading = false;
        this.dirty = { "2017 Fall": true, "2018 Winter": true };
        this.courses = this.courseService.loadCourseData(this.term);
        this.selectedCourses = this.courseService.loadCourseList();
        this.preferences = this.preferenceService.loadPreferences();
        this.solutionlist = this.courseService.loadSolutionList();
        this.alertService.success("hello world");
    }
    AppComponent.prototype.selectTerm = function (term) {
        this.term = term;
        this.timetable.renderSolution(0, this.term);
    };
    AppComponent.prototype.getCourseInOneList = function () {
        var s = new Set();
        this.selectedCourses["2017 Fall"].forEach(function (c) { return s.add(c); });
        this.selectedCourses["2018 Winter"].forEach(function (c) { return s.add(c); });
        return Array.from(s);
    };
    AppComponent.prototype.determineTerm = function (code) {
        if (code.indexOf("H1F"))
            return ["2017 Fall"];
        if (code.indexOf("H1S"))
            return ["2018 Winter"];
        if (code.indexOf("Y1Y"))
            return ["2017 Fall", "2018 Winter"];
        else
            return [];
    };
    AppComponent.prototype.deleteCourse = function (course) {
        var _this = this;
        this.selectedCourses["2017 Fall"].splice(this.selectedCourses[this.term].indexOf(course), 1);
        this.selectedCourses["2018 Winter"].splice(this.selectedCourses[this.term].indexOf(course), 1);
        this.courseService.storeCourseList(this.selectedCourses);
        this.determineTerm(course).forEach(function (term) { return _this.dirty[term] = true; });
    };
    AppComponent.prototype.addCourse = function (course) {
        var _this = this;
        if (course.code.indexOf("H1F") >= 0) {
            if (this.selectedCourses["2017 Fall"].indexOf(course.code) == -1) {
                this.selectedCourses["2017 Fall"].push(course.code);
                this.courseService.storeCourseList(this.selectedCourses);
            }
        }
        else if (course.code.indexOf("H1S") >= 0) {
            if (this.selectedCourses["2018 Winter"].indexOf(course.code) == -1) {
                this.selectedCourses["2018 Winter"].push(course.code);
                this.courseService.storeCourseList(this.selectedCourses);
            }
        }
        else {
            if (this.selectedCourses["2017 Fall"].indexOf(course.code) == -1) {
                this.selectedCourses["2017 Fall"].push(course.code);
            }
            if (this.selectedCourses["2018 Winter"].indexOf(course.code) == -1) {
                this.selectedCourses["2018 Winter"].push(course.code);
            }
            this.courseService.storeCourseList(this.selectedCourses);
            this.determineTerm(course.code).forEach(function (term) { return _this.dirty[term] = true; });
        }
    };
    AppComponent.prototype.receiveSolution = function (res, term) {
        this.dirty[term] = false;
        this.solutionlist[term] = JSON.parse(res.solutions);
        this.courses = JSON.parse(res.courses);
        this.courseService.storeCourseData(this.courses, term);
        this.courseService.storeSolutionList(this.solutionlist);
        this.courseService.load_solution_list(this.solutionlist, term);
        this.courseService.storeSolutionList(this.solutionlist);
        this.timetable.updateSolution(this.solutionlist);
    };
    AppComponent.prototype.getSolutions = function () {
        var _this = this;
        var otherTerm = '2018 Winter';
        if (this.term == otherTerm)
            otherTerm = '2017 Fall';
        if (this.dirty[this.term]) {
            this.loading = true;
            this.courseService.getSolutions(this.term)
                .then(function (res) {
                _this.receiveSolution(res, _this.term);
                _this.timetable.renderSolution(0, _this.term);
                _this.loading = false;
            })
                .catch(function (err) {
                console.log(err);
                _this.loading = false;
            })
                .then(function () {
                if (_this.dirty[otherTerm]) {
                    _this.courseService.getSolutions(otherTerm)
                        .then(function (res) {
                        _this.receiveSolution(res, otherTerm);
                        _this.loading = false;
                    })
                        .catch(function (err) {
                        console.log(err);
                        _this.loading = false;
                    });
                }
            });
        }
        else if (this.dirty[otherTerm]) {
            this.loading = true;
            this.courseService.getSolutions(otherTerm)
                .then(function (res) {
                _this.receiveSolution(res, otherTerm);
                _this.loading = false;
            })
                .catch(function (err) {
                console.log(err);
                _this.loading = false;
            });
        }
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__components_timetable_timetable_component__["a" /* TimetableComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__components_timetable_timetable_component__["a" /* TimetableComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__components_timetable_timetable_component__["a" /* TimetableComponent */]) === "function" && _a || Object)
], AppComponent.prototype, "timetable", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_course_service__["a" /* CourseService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_course_service__["a" /* CourseService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_preference_service__["a" /* PreferenceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_preference_service__["a" /* PreferenceService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_alert_service__["a" /* AlertService */]) === "function" && _d || Object])
], AppComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_semantic_ui__ = __webpack_require__("./node_modules/ng2-semantic-ui/dist/public.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_course_item_course_item_component__ = __webpack_require__("./src/app/components/course-item/course-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_preference_selector_preference_selector_component__ = __webpack_require__("./src/app/components/preference-selector/preference-selector.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_timetable_timetable_component__ = __webpack_require__("./src/app/components/timetable/timetable.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_search_bar_search_bar_component__ = __webpack_require__("./src/app/components/search-bar/search-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_alert_alert_component__ = __webpack_require__("./src/app/components/alert/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_preference_service__ = __webpack_require__("./src/app/services/preference.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_course_service__ = __webpack_require__("./src/app/services/course.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_alert_service__ = __webpack_require__("./src/app/services/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pipes_translate_pipe__ = __webpack_require__("./src/app/pipes/translate.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_responsive__ = __webpack_require__("./node_modules/ng2-responsive/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ng2_responsive___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_ng2_responsive__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_course_body_course_body_component__ = __webpack_require__("./src/app/components/course-body/course-body.component.ts");
/* unused harmony export routing */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var routing = __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */].forRoot([
    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
]);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_7__components_course_item_course_item_component__["a" /* CourseItemComponent */],
            __WEBPACK_IMPORTED_MODULE_8__components_preference_selector_preference_selector_component__["a" /* PreferenceSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_15__pipes_translate_pipe__["a" /* TranslatePipe */],
            __WEBPACK_IMPORTED_MODULE_9__components_timetable_timetable_component__["a" /* TimetableComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_search_bar_search_bar_component__["a" /* SearchBarComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_course_body_course_body_component__["a" /* CourseBodyComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_alert_alert_component__["a" /* AlertComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ng2_semantic_ui__["a" /* SuiModule */],
            __WEBPACK_IMPORTED_MODULE_16_ng2_responsive__["ResponsiveModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* RouterModule */],
            routing
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_12__services_preference_service__["a" /* PreferenceService */], __WEBPACK_IMPORTED_MODULE_13__services_course_service__["a" /* CourseService */], __WEBPACK_IMPORTED_MODULE_14__services_alert_service__["a" /* AlertService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/components/alert/alert.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div *ngFor=\"let alert of alerts\" class=\"{{ cssClass(alert) }} alert-dismissable\">\n     {{alert.message}}\n     <a class=\"close\" (click)=\"removeAlert(alert)\">&times;</a>\n</div> -->\n\n<sui-message *ngFor=\"let alert of alerts\" class=\"{{ cssClass(alert) }}\">\n    <div class=\"header\">\n        {{cssClass(alert)}}\n    </div>\n    <p>{{alert.message}}</p>\n</sui-message>\n\n<!-- <div *ngFor=\"let alert of alerts\" class=\"ui {{ cssClass(alert) }} message\">\n  <i class=\"close icon\"></i>\n  <p>{{alert.message}}</p>\n</div> -->\n"

/***/ }),

/***/ "./src/app/components/alert/alert.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_alert__ = __webpack_require__("./src/app/models/alert.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alert_service__ = __webpack_require__("./src/app/services/alert.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertComponent = (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
        this.alerts = [];
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getAlert().subscribe(function (alert) {
            if (!alert) {
                // clear alerts when an empty alert is received
                _this.alerts = [];
                return;
            }
            // add alert to array
            _this.alerts.push(alert);
        });
    };
    AlertComponent.prototype.removeAlert = function (alert) {
        this.alerts = this.alerts.filter(function (x) { return x !== alert; });
    };
    AlertComponent.prototype.cssClass = function (alert) {
        if (!alert) {
            return;
        }
        // return css class based on alert type
        switch (alert.type) {
            case __WEBPACK_IMPORTED_MODULE_1__models_alert__["a" /* AlertType */].Success:
                return 'success';
            case __WEBPACK_IMPORTED_MODULE_1__models_alert__["a" /* AlertType */].Error:
                return 'danger';
            case __WEBPACK_IMPORTED_MODULE_1__models_alert__["a" /* AlertType */].Info:
                return 'info';
            case __WEBPACK_IMPORTED_MODULE_1__models_alert__["a" /* AlertType */].Warning:
                return 'warning';
        }
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'alert',
        template: __webpack_require__("./src/app/components/alert/alert.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_alert_service__["a" /* AlertService */]) === "function" && _a || Object])
], AlertComponent);

var _a;
//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ "./src/app/components/course-body/course-body.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/components/course-body/course-body.component.html":
/***/ (function(module, exports) {

module.exports = "<h2>{{courseCode}}</h2>\n<h3>{{body.name}}</h3>\n  <p>\n    {{body.description}}\n  </p>\n<div class=\"ui divider\"></div>\n<div *ngFor=\"let section of lectures\">\n  {{section.code}}: {{section.instructors}} @{{section.locations.length>0 ? section.locations : 'TBA'}}\n</div>\n"

/***/ }),

/***/ "./src/app/components/course-body/course-body.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_course_service__ = __webpack_require__("./src/app/services/course.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_course__ = __webpack_require__("./src/app/models/course.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CourseBodyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CourseBodyComponent = (function () {
    function CourseBodyComponent(courseService) {
        this.courseService = courseService;
        this.body = new __WEBPACK_IMPORTED_MODULE_2__models_course__["a" /* Course */]();
        this.sections = [];
        this.lectures = [];
    }
    CourseBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.courseService.fetchCourseBody(this.courseCode)
            .then(function (body) {
            _this.body = body[0];
            _this.sections = body[0].meeting_sections;
            _this.sections.forEach(function (s) {
                if (s.code[0] === "L") {
                    var copy = s;
                    if (s.instructors.length == 0) {
                        copy.instructors.push("TBA");
                    }
                    var times_1 = new Set();
                    s.times.forEach(function (t) { console.log(t); times_1.add(t.location); });
                    copy.locations = Array.from(times_1);
                    _this.lectures.push(copy);
                }
            });
        });
    };
    return CourseBodyComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CourseBodyComponent.prototype, "courseCode", void 0);
CourseBodyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-course-body',
        template: __webpack_require__("./src/app/components/course-body/course-body.component.html"),
        styles: [__webpack_require__("./src/app/components/course-body/course-body.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_course_service__["a" /* CourseService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_course_service__["a" /* CourseService */]) === "function" && _a || Object])
], CourseBodyComponent);

var _a;
//# sourceMappingURL=course-body.component.js.map

/***/ }),

/***/ "./src/app/components/course-item/course-item.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".row {\n  border: none !important;\n  border-radius: 4px;\n  background-color: #656565;\n  padding: 10px 10px 10px 00 !important;\n  /*padding: ;*/\n  cursor: pointer;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/components/course-item/course-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div *responsive=\"{\n                    bootstrap: ['xl','lg','md']\n                  }\"\n      class=\"row\" suiPopup [popupTemplate]=\"popupTemplate\" [popupPlacement]=\"right\" popupTrigger=\"outsideClick\">\n    <div class=\"left floated column\">\n        {{course}}\n    </div>\n    <div class=\"right floated column\">\n        <a (click)='onClickClose()'><i class=\"close icon\" style=\"color:white\"></i></a>\n    </div>\n</div>\n\n<div *responsive=\"{\n                    bootstrap: ['sm','xs']\n                  }\"\n      class=\"row\">\n    <div class=\"left floated column\">\n        {{course}}\n    </div>\n    <div class=\"right floated column\">\n        <a (click)='onClickClose()'><i class=\"close icon\" style=\"color:white\"></i></a>\n    </div>\n</div>\n\n<ng-template let-popup #popupTemplate>\n    <div class=\"content\">\n      <app-course-body [courseCode]=\"course\"></app-course-body>\n    </div>\n</ng-template>\n"

/***/ }),

/***/ "./src/app/components/course-item/course-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CourseItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CourseItemComponent = (function () {
    function CourseItemComponent() {
        this.deleteCourse = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.right = "right";
    }
    CourseItemComponent.prototype.ngOnInit = function () {
    };
    CourseItemComponent.prototype.onClickClose = function () {
        this.deleteCourse.emit(this.course);
    };
    return CourseItemComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CourseItemComponent.prototype, "course", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CourseItemComponent.prototype, "term", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], CourseItemComponent.prototype, "deleteCourse", void 0);
CourseItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-course-item',
        template: __webpack_require__("./src/app/components/course-item/course-item.component.html"),
        styles: [__webpack_require__("./src/app/components/course-item/course-item.component.css")]
    }),
    __metadata("design:paramtypes", [])
], CourseItemComponent);

var _a;
//# sourceMappingURL=course-item.component.js.map

/***/ }),

/***/ "./src/app/components/preference-selector/preference-selector.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "td {\n    transition: background-color 5s ease;\n}\n\ntd:hover {\n    background-color: rgba(81, 184, 163, 0.2)\n}\n\n/*td.all:hover {\n    background-color: rgba(220, 76, 70, 0.2)\n}*/\n\n.selector-background {\n    position: absolute;\n    top: auto;\n    left: auto;\n}\n\ntr {\n    height: 40px;\n}\n\ntd.selected {\n    background-color: #51B8A3 !important;\n}\n\ntd.red {\n\n  background-color: #DC4C46 !important;\n}\n\nth.red {\n  background-color: #DC4C46 !important;\n}\n\ntable {\n  background-image: url(/assets/images/preference.svg)\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/components/preference-selector/preference-selector.component.html":
/***/ (function(module, exports) {

module.exports = "<table class=\"ui inverted fixed unstackable table\">\n    <thead>\n        <tr>\n          <th class=\"center aligned\">\n\n          </th>\n            <th class=\"center aligned\">\n                M\n            </th>\n            <th class=\"center aligned\">\n                T\n            </th>\n            <th class=\"center aligned\">\n                W\n            </th>\n            <th class=\"center aligned\">\n                H\n            </th>\n            <th class=\"center aligned\">\n                F\n            </th>\n        </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let time of times\">\n        <td class=\"all center aligned {{preferenceService.getDaySum(preference, time) == -5 ? 'red' : ''}}\" (click)=\"excludeRow(time)\">\n          <i class=\"close icon\"></i>\n        </td>\n        <td\n          *ngFor=\"let day of days\"\n          (click)=\"flip(day, time)\"\n          class=\"center aligned {{ preference[day][time] == 1 ? 'selected' : ''}} {{ preference[day][time]==-1 ? 'red' : ''}}\"\n        >\n        {{timeToHour[time]}}\n        </td>\n\n      </tr>\n        <tr>\n          <td>\n          </td>\n            <td (click)=\"excludeCol('monday')\" class=\"all center aligned {{ preferenceService.getTimeSum(preference, 'monday') == -4 ? 'red' : ''}}\">\n              <i class=\"close icon\"></i>\n            </td>\n            <td (click)=\"excludeCol('tuesday')\" class=\"all center aligned {{ preferenceService.getTimeSum(preference, 'tuesday') == -4 ? 'red' : ''}}\">\n              <i class=\"close icon\"></i>\n            </td>\n            <td (click)=\"excludeCol('wednesday')\" class=\"all center aligned {{ preferenceService.getTimeSum(preference, 'wednesday') == -4 ? 'red' : ''}}\">\n              <i class=\"close icon\"></i>\n            </td>\n            <td (click)=\"excludeCol('thursday')\" class=\"all center aligned {{ preferenceService.getTimeSum(preference, 'thursday') == -4 ? 'red' : ''}}\">\n              <i class=\"close icon\"></i>\n            </td>\n            <td (click)=\"excludeCol('friday')\" class=\"all center aligned {{ preferenceService.getTimeSum(preference, 'friday') == -4 ? 'red' : ''}}\">\n              <i class=\"close icon\"></i>\n            </td>\n        </tr>\n    </tbody>\n</table>\n<span style=\"color:#51B8A3\"><i class=\"square icon\"></i> I prefer this timeslot.</span><br />\n<span style=\"color:#DC4C46\"><i class=\"square icon\"></i> I dont want this timeslot.</span>\n"

/***/ }),

/***/ "./src/app/components/preference-selector/preference-selector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_preference__ = __webpack_require__("./src/app/models/preference.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_preference_service__ = __webpack_require__("./src/app/services/preference.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreferenceSelectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var timeToHour = {
    morning: "8-12",
    noon: "12-3",
    afternoon: "3-6",
    evening: "6-9"
};
var PreferenceSelectorComponent = (function () {
    function PreferenceSelectorComponent(preferenceService) {
        this.preferenceService = preferenceService;
        this.days = __WEBPACK_IMPORTED_MODULE_2__services_preference_service__["b" /* days */];
        this.times = __WEBPACK_IMPORTED_MODULE_2__services_preference_service__["c" /* times */];
        this.preference = new __WEBPACK_IMPORTED_MODULE_1__models_preference__["a" /* Preference */]();
        this.timeToHour = timeToHour;
    }
    PreferenceSelectorComponent.prototype.ngOnInit = function () {
        this.preference = this.preferenceService.loadPreferences();
    };
    PreferenceSelectorComponent.prototype.flip = function (day, time) {
        this.preferenceService.updateDay(this.preference, day, time);
        this.preferenceService.storePreferences(this.preference);
    };
    PreferenceSelectorComponent.prototype.excludeRow = function (time) {
        this.preferenceService.excludeTime(this.preference, time);
        this.preferenceService.storePreferences(this.preference);
    };
    PreferenceSelectorComponent.prototype.excludeCol = function (day) {
        this.preferenceService.excludeDay(this.preference, day);
        this.preferenceService.storePreferences(this.preference);
    };
    return PreferenceSelectorComponent;
}());
PreferenceSelectorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-preference-selector',
        template: __webpack_require__("./src/app/components/preference-selector/preference-selector.component.html"),
        styles: [__webpack_require__("./src/app/components/preference-selector/preference-selector.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_preference_service__["a" /* PreferenceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_preference_service__["a" /* PreferenceService */]) === "function" && _a || Object])
], PreferenceSelectorComponent);

var _a;
//# sourceMappingURL=preference-selector.component.js.map

/***/ }),

/***/ "./src/app/components/search-bar/search-bar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ui.search>.results {\n  max-width: 24px !important;\n  width: 24px !important;\n  overflow: overlay;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/components/search-bar/search-bar.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"ui search\">\n  <div class=\"ui icon fluid input\">\n    <input class=\"prompt\" type=\"text\" placeholder=\"Common passwords...\">\n    <i class=\"search icon\"></i>\n  </div>\n  <div class=\"results\"></div>\n</div> -->\n\n<ng-template let-result let-query=\"query\" #template style=\"max-width：240px; overflow:hidden\">\n  {{ result.code }}<br />\n  <span style=\"color: #999; font-size:11px; \">{{result.name}}</span>\n</ng-template>\n\n<sui-search\n  optionsField=\"code\"\n  placeholder=\"Search by course code\"\n  [optionsLookup]=\"fetchCourse\"\n  [resultTemplate]=\"template\"\n  [retainSelectedResult]=\"false\"\n  (resultSelected)=\"select($event)\">\n</sui-search>\n"

/***/ }),

/***/ "./src/app/components/search-bar/search-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_course_service__ = __webpack_require__("./src/app/services/course.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_filter__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchBarComponent = (function () {
    // else {
    //   return Promise.reject("Invalid cosecode");
    // }
    function SearchBarComponent(courseService) {
        var _this = this;
        this.courseService = courseService;
        // options : Course[] = [];
        this.addCourse = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.fetchCourse = function (query) {
            // if (/[a-z]{3}[0-9]{3}/i.test(query)) {
            if (query == "") {
                return Promise.resolve([]);
            }
            // Do the extended lookup on multiple fields manually here:
            return _this.courseService
                .fetchCourse(query, _this.term)
                .then(function (result) {
                return Promise.resolve(result);
            })
                .catch(function (err) { return Promise.reject("Course not found"); });
        };
    }
    SearchBarComponent.prototype.ngOnInit = function () {
    };
    SearchBarComponent.prototype.select = function (course) {
        // console.log(course)
        // alert(text);
        this.addCourse.emit(course);
    };
    return SearchBarComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SearchBarComponent.prototype, "addCourse", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SearchBarComponent.prototype, "term", void 0);
SearchBarComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search-bar',
        template: __webpack_require__("./src/app/components/search-bar/search-bar.component.html"),
        styles: [__webpack_require__("./src/app/components/search-bar/search-bar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_course_service__["a" /* CourseService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_course_service__["a" /* CourseService */]) === "function" && _a || Object])
], SearchBarComponent);

var _a;
//# sourceMappingURL=search-bar.component.js.map

/***/ }),

/***/ "./src/app/components/timetable/timetable.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "td {\n  height: 4em !important;\n  /*border-collapse: collapse;*/\n  padding:0 !important;\n}\n\ntd.course {\n  /*border: 2px solid rgba(0,0,0,0.5) !important;*/\n  border-left: 1px solid rgba(34, 36, 38, 0.1);\n  border-right: 1px solid rgba(34, 36, 38, 0.1);\n  cursor:pointer;\n}\n\ntd.option {\n  border-left: 1px solid rgba(34, 36, 38, 0.1);\n  border-right: 1px solid rgba(34, 36, 38, 0.1);\n  opacity: 0.5;\n  cursor: pointer;\n}\n\n@media screen and (max-width: 990px) {\n  td {\n    font-size: 8px\n  }\n  td strong {\n    font-size: 10px\n  }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/components/timetable/timetable.component.html":
/***/ (function(module, exports) {

module.exports = "<table class=\"ui fixed center aligned equal height row unstackable table\">\n    <thead>\n        <tr>\n            <th class=\"first\"></th>\n            <th>Mon</th>\n            <th>Tue</th>\n            <th>Wed</th>\n            <th>Thu</th>\n            <th>Fri</th>\n        </tr>\n    </thead>\n    <tbody *ngIf=\"timetableSlot\">\n        <tr *ngFor=\"let item of createRange(15); let i = index\">\n            <td>{{8 + i}}:00</td>\n              <td\n                *ngFor=\"let col of createTd(timetableSlot.map, i); let j = index\"\n                [style.background-color]=\"col.color\"\n                class=\"{{col.class}}\"\n                [attr.rowspan]=\"col.rowspan\"\n                (click)=\"col.fn()\"\n                >\n                <span *ngIf=\"col.section=='multiple'; else elseBlock;\">\n                  <ng-template let-popup #popupTemplate>\n                      <div class=\"header\">Sections</div>\n                      <div class=\"content\">\n                        {{col.lst}}\n                      </div>\n                  </ng-template>\n\n                  <span suiPopup [popupTemplate]=\"popupTemplate\">\n                    <strong>{{col.code}}</strong><span style=\"opacity:0.5\"> {{col.section}}<br />\n                    <span *ngIf=\"col.start\">{{col.start / 3600}}:00-{{col.end / 3600}}:00</span></span>\n                  </span>\n                </span>\n                <ng-template #elseBlock>\n                  <strong>{{col.code}}</strong><span style=\"opacity:0.5\"> {{col.section}}<br />\n                  <span *ngIf=\"col.start\">{{col.start / 3600}}:00-{{col.end / 3600}}:00</span></span>\n                </ng-template>\n\n              </td>\n        </tr>\n    </tbody>\n</table>\n"

/***/ }),

/***/ "./src/app/components/timetable/timetable.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_timetable_slot__ = __webpack_require__("./src/app/models/timetable-slot.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_course_service__ = __webpack_require__("./src/app/services/course.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimetableComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TimetableComponent = (function () {
    function TimetableComponent(courseService) {
        this.courseService = courseService;
        this.currentlist = [];
        this.convert_day = { "MONDAY": 1, "TUESDAY": 2, "WEDNESDAY": 3, "THURSDAY": 4, "FRIDAY": 5 };
        this.back = ["PaleGoldenRod", "lightblue", "LightSalmon", "lightgreen", "lightpink", "Chocolate", "GreenYellow", "GoldenRod"];
        this.option_back = ["MediumPurple", "Fuchsia", "Aqua"];
        this.timetableSlot = new __WEBPACK_IMPORTED_MODULE_1__models_timetable_slot__["a" /* TimetableSlot */]();
    }
    TimetableComponent.prototype.ngOnInit = function () {
        this.term = "2017 Fall";
        this.timetableSlot = new __WEBPACK_IMPORTED_MODULE_1__models_timetable_slot__["a" /* TimetableSlot */]();
        this.solutionList = this.courseService.loadSolutionList();
        this.renderSolution(0, this.term);
    };
    TimetableComponent.prototype.overlap = function (a, b) {
        for (var i = 0; i < a.length; i++)
            for (var j = 0; j < b.length; j++)
                if (a[i].day == b[j].day && Math.max(a[i].start, b[j].start) < Math.min(a[i].end, b[j].end))
                    return true;
        return false;
    };
    TimetableComponent.prototype.createRange = function (number) {
        var items = [];
        for (var i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    };
    TimetableComponent.prototype.createTd = function (a, index) {
        var result = [];
        for (var i = 0; i < 5; i++) {
            if (!a[i][index].delete) {
                result.push(a[i][index]);
            }
        }
        return result;
    };
    TimetableComponent.prototype.countCol = function (a, i) {
    };
    TimetableComponent.prototype.updateSolution = function (solutionlist) {
        this.solutionList = solutionlist;
    };
    TimetableComponent.prototype.renderSolution = function (index, term) {
        if (term === void 0) { term = "2017 Fall"; }
        this.term = term;
        this.cleanTable();
        // console.log(this.solutionList)
        this.solutionList = this.courseService.loadSolutionList();
        if (this.solutionList[term].length != 0) {
            var solution = this.solutionList[term][index];
            this.currentlist = solution;
            this.cur = index;
            for (var i = 0; i < solution.length; i++)
                this.drawCourse(solution[i]);
        }
        console.log("rendering", this.term);
    };
    TimetableComponent.prototype.cleanTable = function () {
        this.timetableSlot = new __WEBPACK_IMPORTED_MODULE_1__models_timetable_slot__["a" /* TimetableSlot */]();
    };
    TimetableComponent.prototype.initTimetable = function (timetable) {
        var _this = this;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 15; j++) {
                if (timetable.map[i][j].code == "") {
                    timetable.setValue(i, j, {
                        code: "",
                        section: "",
                        color: "#fff",
                        class: "",
                        rowspan: 1,
                        delete: false,
                        fn: function () { _this.renderSolution(_this.cur, _this.term); }
                    });
                }
            }
        }
    };
    TimetableComponent.prototype.drawCourse = function (course) {
        var _this = this;
        course.color = this.back[0];
        for (var i = 0; i < course.times.length; i++) {
            var col_num = this.convert_day[course.times[i].day] - 1;
            // let start = course.times[i].start / 3600 - 7;
            // for (let n = 0; n <= course.times[i].duration/3600; n++) {
            //   // console.log(course.code, col_num - 1, start + n - 1, this.timetableSlot.map[col_num - 1][start + n - 1].delete)
            //   // console.log(this.timetableSlot.printTable());
            //   if (this.timetableSlot.map[col_num - 1][start + n - 1].delete) {
            //     console.log(col_num - 1, start + n - 1)
            //     this.timetableSlot.cleanSpan(col_num - 1, start + n - 1);
            //   }
            // }
            for (var j = course.times[i].start / 3600 - 7; j < course.times[i].end / 3600 - 7; j++) {
                if (j == course.times[i].start / 3600 - 7) {
                    this.timetableSlot.setValue(col_num, j - 1, {
                        code: course.courseCode,
                        section: course.code[0],
                        color: course.color,
                        class: "course",
                        rowspan: course.times[i].duration / 3600,
                        delete: false,
                        start: course.times[i].start,
                        end: course.times[i].end,
                        fn: function () {
                            _this.renderSolution(_this.cur, _this.term);
                            var courseData = _this.courseService.loadCourseData(_this.term);
                            console.log("course", course);
                            console.log("data", courseData);
                            console.log("term", _this.term);
                            var optLst = courseData[course.courseCode][_this.term][course.code[0][0]];
                            // this.drawOption(course);
                            for (var i = 0; i < optLst.length; i++) {
                                var ok = true;
                                for (var j = 0; j < _this.currentlist.length; j++)
                                    if (_this.currentlist[j] != course && _this.overlap(optLst[i].times, _this.currentlist[j].times)) {
                                        ok = false;
                                        break;
                                    }
                                if (ok)
                                    _this.drawOption(optLst[i]);
                            }
                        },
                    });
                }
                else {
                    this.timetableSlot.setValue(col_num, j - 1, {
                        code: " ",
                        section: " ",
                        color: "",
                        class: "",
                        delete: true,
                        fn: function () { console.log("别点了"); }
                    });
                }
            }
        }
    };
    TimetableComponent.prototype.onCLickCourse = function (course) {
        this.renderSolution(this.cur, this.term);
        var courseData = this.courseService.loadCourseData(this.term);
        var optLst = courseData[course.courseCode][this.term][course.code[0][0]];
        this.drawOption(course);
        for (var i = 0; i < optLst.length; i++) {
            var ok = true;
            for (var j = 0; j < this.currentlist.length; j++)
                if (this.currentlist[j] != course && this.overlap(optLst[i].times, this.currentlist[j].times)) {
                    ok = false;
                    break;
                }
            if (ok)
                this.drawOption(optLst[i]);
        }
    };
    TimetableComponent.prototype.drawOption = function (course) {
        var _this = this;
        var color = this.back[0];
        this.initTimetable(this.timetableSlot);
        for (var i = 0; i < course.times.length; i++) {
            var col_num = this.convert_day[course.times[i].day];
            var start = course.times[i].start / 3600 - 7;
            for (var n = 0; n <= course.times[i].duration / 3600; n++) {
                // console.log(course.code, col_num - 1, start + n - 1, this.timetableSlot.map[col_num - 1][start + n - 1].delete)
                // console.log(this.timetableSlot.printTable());
                if (this.timetableSlot.map[col_num - 1][start + n - 1].delete) {
                    this.timetableSlot.cleanSpan(col_num - 1, start + n - 1);
                }
            }
            for (var j = course.times[i].start / 3600 - 7; j < course.times[i].end / 3600 - 7; j++) {
                var k = {
                    code: "OPTION",
                    section: (course.code.length != 1) ? "multiple" : course.code[0],
                    color: color,
                    class: "option",
                    rowspan: course.times[i].duration / 3600,
                    start: course.times[i].start,
                    end: course.times[i].end,
                    // rowspan:1,
                    delete: false,
                    lst: (course.code.length != 1) ? course.code.join('\n') : "",
                    fn: function () {
                        // if (course.code.length == 1) {
                        // console.log(this.currentlist);
                        for (var i = 0; i < _this.currentlist.length; i++)
                            if (_this.currentlist[i].courseCode == course.courseCode && _this.currentlist[i].code[0][0] == course.code[0][0]) {
                                _this.solutionList[_this.term][_this.cur].splice(i, 1, course);
                                _this.courseService.storeSolutionList(_this.solutionList);
                                _this.renderSolution(_this.cur, _this.term);
                                break;
                            }
                        // console.log(this.currentlist)
                        // }
                    }
                };
                if (j == course.times[i].start / 3600 - 7) {
                    this.timetableSlot.setValue(col_num - 1, j - 1, k);
                }
                else {
                    this.timetableSlot.setValue(col_num - 1, j - 1, {
                        code: " ",
                        section: " ",
                        color: "",
                        class: "",
                        delete: true
                    });
                }
            }
        }
    };
    return TimetableComponent;
}());
TimetableComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-timetable',
        template: __webpack_require__("./src/app/components/timetable/timetable.component.html"),
        styles: [__webpack_require__("./src/app/components/timetable/timetable.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_course_service__["a" /* CourseService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_course_service__["a" /* CourseService */]) === "function" && _a || Object])
], TimetableComponent);

var _a;
//
//
// if (course.code.length == 1) {
// 	k.text("Option: " + course.code[0]).on("click", function() {
// 		for (var i = 0; i < currentlist.length; i++)
// 			if (currentlist[i].courseCode == course.courseCode && currentlist[i].code[0][0] == course.code[0][0]) {
// 				currentlist.splice(i, 1, course);
// 				render_solution(cur);
// 				break;
// 			}
// 	});
// } else {
// 	k.text("Options: " + course.code[0] + "/...");
// 	k.off().on("click", function() {
// 		div = $("<div></div>").addClass("stacklist");
// 		ul = $("<ul></ul>").css("list-style-type", "none");
// 		ul.css("width", k.css("width"));
// 		ul.append($("<li></li>").text("Select One").on("click", function(e) {
// 			e.stopPropagation();
// 			render_solution(cur);
// 		}));
// 		for (var i = 0; i < course.code.length; i++)
// 			ul.append($("<li></li>").text(course.code[i]).on("click", function(e) {
// 				e.stopPropagation();
// 				var index = course.code.indexOf($(this).text());
// 				// swap code[0] and code[index];
// 				var temp = course.code[0];
// 				course.code[0] = course.code[index];
// 				course.code[index] = temp;
// 				var replace_index = 0;
// 				for (var j = 0; j < currentlist.length; j++)
// 					if (currentlist[j].courseCode == course.courseCode && currentlist[j].code[0][0] == course.code[0][0]) {
// 						replace_index = j;
// 						break;
// 					}
//
// 				currentlist.splice(replace_index, 1, course);
// 				localStorage.solution = JSON.stringify(solutionlist);
// 				render_solution(cur);
// 				return;
// 			}));
// 		k.append(div.append(ul));
// 	});
// }
//# sourceMappingURL=timetable.component.js.map

/***/ }),

/***/ "./src/app/models/alert.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Alert */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertType; });
var Alert = (function () {
    function Alert() {
    }
    return Alert;
}());

var AlertType;
(function (AlertType) {
    AlertType[AlertType["Success"] = 0] = "Success";
    AlertType[AlertType["Error"] = 1] = "Error";
    AlertType[AlertType["Info"] = 2] = "Info";
    AlertType[AlertType["Warning"] = 3] = "Warning";
})(AlertType || (AlertType = {}));
//# sourceMappingURL=alert.js.map

/***/ }),

/***/ "./src/app/models/course.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Course; });
var Course = (function () {
    function Course() {
    }
    return Course;
}());

//# sourceMappingURL=course.js.map

/***/ }),

/***/ "./src/app/models/preference.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Preference; });
/* unused harmony export Day */
var Preference = (function () {
    function Preference() {
        this.monday = new Day();
        this.tuesday = new Day();
        this.wednesday = new Day();
        this.thursday = new Day();
        this.friday = new Day();
    }
    return Preference;
}());

var Day = (function () {
    function Day() {
        this.morning = 0; // 8-12
        this.noon = 0; // 12-1
        this.afternoon = 0; // 3-6
        this.evening = 0; // 6-10
    }
    return Day;
}());

//# sourceMappingURL=preference.js.map

/***/ }),

/***/ "./src/app/models/timetable-slot.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TimetableSlot; });
/* unused harmony export Cell */
var TimetableSlot = (function () {
    function TimetableSlot() {
        this.map = [];
        for (var i = 0; i < 5; i++) {
            this.map[i] = [];
            for (var j = 0; j < 15; j++) {
                this.map[i][j] = new Cell();
            }
        }
    }
    TimetableSlot.prototype.setValue = function (i, j, value) {
        this.map[i][j] = value;
    };
    TimetableSlot.prototype.cleanSpan = function (i, j) {
        console.log("clean");
        for (var k = j; k > 0; k--) {
            if (this.map[i][k].rowspan > 1) {
                this.map[i][k].rowspan = 1;
                this.map[i][k].color = "#a00";
                break;
            }
        }
    };
    TimetableSlot.prototype.printTable = function () {
        var res = "";
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 5; j++) {
                if (this.map[j][i].delete) {
                    res += "| d ";
                }
                else {
                    res += "|   ";
                }
            }
            res += '\n';
        }
        return res;
    };
    return TimetableSlot;
}());

var Cell = (function () {
    function Cell() {
        this.code = "";
        this.section = "";
        this.color = "#fff";
        this.class = "";
        this.rowspan = 1;
        this.delete = false;
        this.fn = function () { console.log("别点了"); };
        this.lst = "";
    }
    return Cell;
}());

//# sourceMappingURL=timetable-slot.js.map

/***/ }),

/***/ "./src/app/pipes/translate.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslatePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TranslatePipe = (function () {
    function TranslatePipe() {
    }
    TranslatePipe.prototype.transform = function (value, args) {
        return null;
    };
    return TranslatePipe;
}());
TranslatePipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'translate'
    })
], TranslatePipe);

//# sourceMappingURL=translate.pipe.js.map

/***/ }),

/***/ "./src/app/services/alert.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_alert__ = __webpack_require__("./src/app/models/alert.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.keepAfterRouteChange = false;
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationStart */]) {
                if (_this.keepAfterRouteChange) {
                    // only keep for a single route change
                    _this.keepAfterRouteChange = false;
                }
                else {
                    // clear alert messages
                    _this.clear();
                }
            }
        });
    }
    AlertService.prototype.getAlert = function () {
        console.log("alert");
        return this.subject.asObservable();
    };
    AlertService.prototype.success = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(__WEBPACK_IMPORTED_MODULE_3__models_alert__["a" /* AlertType */].Success, message, keepAfterRouteChange);
    };
    AlertService.prototype.error = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(__WEBPACK_IMPORTED_MODULE_3__models_alert__["a" /* AlertType */].Error, message, keepAfterRouteChange);
    };
    AlertService.prototype.info = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(__WEBPACK_IMPORTED_MODULE_3__models_alert__["a" /* AlertType */].Info, message, keepAfterRouteChange);
    };
    AlertService.prototype.warn = function (message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.alert(__WEBPACK_IMPORTED_MODULE_3__models_alert__["a" /* AlertType */].Warning, message, keepAfterRouteChange);
    };
    AlertService.prototype.alert = function (type, message, keepAfterRouteChange) {
        if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: type, message: message });
    };
    AlertService.prototype.clear = function () {
        // clear alerts
        this.subject.next();
    };
    return AlertService;
}());
AlertService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object])
], AlertService);

var _a;
//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ "./src/app/services/course.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__preference_service__ = __webpack_require__("./src/app/services/preference.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CourseService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CourseService = (function () {
    function CourseService(http, preferenceService) {
        this.http = http;
        this.preferenceService = preferenceService;
    }
    CourseService.prototype.fetchCourse = function (query, term) {
        var course_code = query;
        var url = 'courses/s/' + course_code;
        return this.http.get(url)
            .toPromise()
            .then(function (res) {
            return Promise.resolve(res.json());
        })
            .catch(function (err) { return Promise.reject(err); });
    };
    CourseService.prototype.fetchCourseBody = function (query) {
        var course_code = query;
        var url = 'courses/' + course_code;
        return this.http.get(url)
            .toPromise()
            .then(function (res) {
            return Promise.resolve(res.json());
        })
            .catch(function (err) { return Promise.reject(err); });
    };
    CourseService.prototype.getSolutions = function (term) {
        // if (localStorage.term && localStorage.courselist)
        return this.http.post('/smart', {
            term: term,
            courselist: JSON.stringify(JSON.parse(localStorage.courselist)[term]),
            preferences: JSON.stringify(this.preferenceService.parsePreference(this.preferenceService.loadPreferences()))
        })
            .toPromise()
            .then(function (data) {
            return data.json();
        })
            .catch(function (err) { return Promise.reject(err); });
    };
    CourseService.prototype.storeCourseData = function (courseList, term) {
        var course_data = JSON.parse(localStorage.getItem("course_data"));
        if (!(course_data && (term in course_data))) {
            this.initLocalStorage();
        }
        course_data[term] = courseList;
        localStorage.setItem("course_data", JSON.stringify(course_data));
    };
    // removeCourseData(course: string) {
    //   var course_data = this.loadCourseData();
    //   delete course_data[course];
    //   localStorage.setItem("course_data", JSON.stringify(course_data));
    // }
    CourseService.prototype.initLocalStorage = function () {
        localStorage.setItem("course_data", JSON.stringify({
            "2017 Fall": [],
            "2018 Winter": []
        }));
        localStorage.setItem("solution", JSON.stringify({
            "2017 Fall": [],
            "2018 Winter": []
        }));
        localStorage.setItem("courselist", JSON.stringify({
            "2017 Fall": [],
            "2018 Winter": []
        }));
    };
    CourseService.prototype.loadCourseData = function (term) {
        var data = JSON.parse(localStorage.getItem("course_data"));
        if (!(data && (term in data))) {
            this.initLocalStorage();
        }
        return JSON.parse(localStorage.getItem("course_data"))[term];
    };
    CourseService.prototype.storeCourseList = function (courseList) {
        localStorage.setItem("courselist", JSON.stringify(courseList));
    };
    CourseService.prototype.loadCourseList = function () {
        return JSON.parse(localStorage.getItem("courselist"))
            ? JSON.parse(localStorage.getItem("courselist"))
            : { "2017 Fall": [], "2018 Winter": [] };
    };
    CourseService.prototype.storeSolutionList = function (solutionList) {
        localStorage.setItem("solution", JSON.stringify(solutionList));
    };
    CourseService.prototype.loadSolutionList = function () {
        return JSON.parse(localStorage.getItem("solution"))
            ? JSON.parse(localStorage.getItem("solution"))
            : { "2017 Fall": [], "2018 Winter": [] };
    };
    CourseService.prototype.load_solution_list = function (solutionlist, semester) {
        var courselist = JSON.parse(localStorage.getItem('courselist'));
        var not_complete = false;
        for (var i = 0; i < solutionlist[semester].length; i++) {
            var extra_title = "";
            var solution = solutionlist[semester][i];
            var dict_sol_courselst = {};
            for (var j = 0; j < solution.length; j++)
                dict_sol_courselst[solution[j].courseCode] = true;
            console.log(dict_sol_courselst);
            for (var j = 0; j < courselist[semester].length; j++)
                if (!dict_sol_courselst.hasOwnProperty(courselist[semester][j].substr(0, 6))) {
                    solutionlist[semester][i].extraTitle = "(not include " + courselist[semester][j] + ")";
                    console.log(semester, i, "(not include " + courselist[semester][j] + ")");
                    not_complete = true;
                    break;
                }
        }
        if (not_complete)
            alert("No valid solution on all of your course. We tried our best to show you some solutions.");
        return solutionlist;
    };
    return CourseService;
}());
CourseService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__preference_service__["a" /* PreferenceService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__preference_service__["a" /* PreferenceService */]) === "function" && _b || Object])
], CourseService);

var _a, _b;
//# sourceMappingURL=course.service.js.map

/***/ }),

/***/ "./src/app/services/preference.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_preference__ = __webpack_require__("./src/app/models/preference.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return days; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return times; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreferenceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
var times = ['morning', 'noon', 'afternoon', 'evening'];
var PreferenceService = (function () {
    function PreferenceService() {
    }
    PreferenceService.prototype.updateDay = function (preference, day, time) {
        var previous = preference[day][time];
        // if (times.indexOf(time) >= 0) {
        //   preference[day] = new Day();
        // }
        preference[day][time] = !previous;
        // console.log(this.print(preference));
        // console.log(this.parsePreference(preference))
        this.storePreferences(preference);
    };
    PreferenceService.prototype.excludeTime = function (preference, time) {
        var excluded = (this.getDaySum(preference, time) == -5);
        days.forEach(function (day) {
            if (excluded)
                preference[day][time] = 0;
            else
                preference[day][time] = -1;
        });
        this.storePreferences(preference);
    };
    PreferenceService.prototype.excludeDay = function (preference, day) {
        var excluded = (this.getTimeSum(preference, day) == -4);
        times.forEach(function (time) {
            if (excluded)
                preference[day][time] = 0;
            else
                preference[day][time] = -1;
        });
        this.storePreferences(preference);
    };
    PreferenceService.prototype.getTimeSum = function (preference, day) {
        return preference[day]['morning']
            + preference[day]['noon']
            + preference[day]['afternoon']
            + preference[day]['evening'];
    };
    PreferenceService.prototype.getDaySum = function (preference, time) {
        return preference.monday[time]
            + preference.tuesday[time]
            + preference.wednesday[time]
            + preference.thursday[time]
            + preference.friday[time];
    };
    PreferenceService.prototype.getDays = function () {
        return days;
    };
    PreferenceService.prototype.getTimes = function () {
        return times;
    };
    PreferenceService.prototype.print = function (preference) {
        var table = "   | M | U | W | T | F \n---+---+---+---+---+---\n";
        times.forEach(function (t) {
            table += " " + t[0] + " ";
            days.forEach(function (d) {
                table += "| " + (preference[d][t] ? 'O' : ' ') + " ";
            });
            table += "\n";
        });
        return table;
    };
    PreferenceService.prototype.loadPreferences = function () {
        var p = localStorage.getItem("preferences");
        return (p && p != "undefined") ? JSON.parse(p) : (new __WEBPACK_IMPORTED_MODULE_1__models_preference__["a" /* Preference */]());
    };
    PreferenceService.prototype.convertPrefToTime = function (dayObj, day) {
        var result = [];
        var exclude = false;
        if (dayObj.morning)
            result.push({
                day: day.substr(0, 3),
                start: 8 * 3600,
                end: 12 * 3600,
                exclude: dayObj.morning,
            });
        if (dayObj.noon)
            result.push({
                day: day.substr(0, 3),
                start: 12 * 3600,
                end: 15 * 3600,
                exclude: dayObj.noon,
            });
        if (dayObj.afternoon)
            result.push({
                day: day.substr(0, 3),
                start: 15 * 3600,
                end: 18 * 3600,
                exclude: dayObj.afternoon,
            });
        if (dayObj.evening)
            result.push({
                day: day.substr(0, 3),
                start: 18 * 3600,
                end: 22 * 3600,
                exclude: dayObj.evening,
            });
        return result;
    };
    PreferenceService.prototype.parsePreference = function (preference) {
        var _this = this;
        var result = [];
        days.forEach(function (d) {
            // if (preference[d].no) {
            //   result[d.substr(0,3)] = "no-class";
            // } else {
            //   times.forEach(t => {
            //     if (preference[d][t]) {
            //       result[d.substr(0,3)] = t;
            //     }
            //   })
            //   if (!result.hasOwnProperty(d.substr(0,3))) {
            //     result[d.substr(0,3)] = 'any';
            //   }
            // }
            _this.convertPrefToTime(preference[d], d).forEach(function (p) {
                result.push(p);
            });
        });
        return result;
    };
    PreferenceService.prototype.storePreferences = function (p) {
        localStorage.setItem("preferences", JSON.stringify(p));
    };
    return PreferenceService;
}());
PreferenceService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], PreferenceService);

//# sourceMappingURL=preference.service.js.map

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map