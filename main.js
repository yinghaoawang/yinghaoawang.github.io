(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/about/about.module.ts":
/*!***************************************!*\
  !*** ./src/app/about/about.module.ts ***!
  \***************************************/
/*! exports provided: AboutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutModule", function() { return AboutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _about_about_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./about/about.component */ "./src/app/about/about/about.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AboutModule = /** @class */ (function () {
    function AboutModule() {
    }
    AboutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
            declarations: [_about_about_component__WEBPACK_IMPORTED_MODULE_2__["AboutComponent"]]
        })
    ], AboutModule);
    return AboutModule;
}());



/***/ }),

/***/ "./src/app/about/about/about.component.css":
/*!*************************************************!*\
  !*** ./src/app/about/about/about.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "p {\r\n    margin: 0 0 1rem;\r\n    line-height: 2rem;\r\n}\r\n\r\n.post-text {\r\n    padding: 0 2em;\r\n    max-width: 880px;\r\n}\r\n\r\n.list-text {\r\n    padding: 0 2em;\r\n    max-width: 880px;\r\n}\r\n\r\n.row {\r\n    padding: 0 2rem;\r\n    display: flex;\r\n}\r\n\r\n.col {\r\n    flex: 33%;\r\n    padding: 1rem;\r\n}\r\n\r\n.skills-container {\r\n    max-width: 880px;\r\n    margin: 0 auto;\r\n}\r\n\r\n.skills-container h3 {\r\n    margin: .5rem;\r\n}\r\n\r\n.skills-container p {\r\n    line-height: 1.5rem;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/about/about/about.component.html":
/*!**************************************************!*\
  !*** ./src/app/about/about/about.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section>\n  <div class=\"container\">\n    <div class=\"header\">\n      <h1 class=\"header-description\">\n        About me\n      </h1>\n    </div>\n  </div>\n</section>\n<section>\n  <div class=\"flex-container\">\n    <div class=\"post-text\">\n      <p *ngFor=\"let paragraph of aboutParagraphs | async\">\n        {{ paragraph }}\n      </p>\n    </div>\n  </div>\n  <!--\n  <div class=\"skills-container\">\n    <h2>\n      Skills\n    </h2>\n    <div class=\"row\">\n\n      <div class=\"col\">\n\n        <h3>General</h3>\n        <p>\n          ★★★★☆ Java\n          <br/> ★★★★☆ OOP\n          <br/> ★★★☆☆ Git\n          <br/> ★★☆☆☆ C, C++\n        </p>\n      </div>\n\n      <div class=\"col\">\n        <h3>Web Design</h3>\n        <p>\n          ★★★★☆ Angular 2+\n          <br/> ★★★★☆ HTML, CSS, JS\n          <br/> ★★★☆☆ Express.js\n          <br/> ★★★☆☆ Node.js\n          <br/> ★★★☆☆ D3.js\n          <br/> ★★★☆☆ SQL\n          <br/> ★★★☆☆ Bootstrap 3+\n          <br/> ★★☆☆☆ AWS\n          <br/> ★★☆☆☆ Ruby on Rails\n          <br/> ★★☆☆☆ MongoDB\n          <br/> ★☆☆☆☆ PHP\n        </p>\n      </div>\n\n      <div class=\"col\">\n        <h3>Game Design</h3>\n        <p>\n          ★★★☆☆ C#, Unity\n          <br/> ★★★☆☆ PixiJS\n          <br/> ★★☆☆☆ Photoshop\n        </p>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col\">\n      <h3>Rating System</h3>\n      <p>\n        ★★★★★ - Know this inside out.\n        <br/> ★★★★☆ - Experienced.\n        <br/> ★★★☆☆ - Good enough.\n        <br/> ★★☆☆☆ - Can get stuff done, eventually.\n        <br/> ★☆☆☆☆ - Barely understand this.\n      </p>\n      </div>\n    </div>\n  </div>\n  -->\n</section>\n"

/***/ }),

/***/ "./src/app/about/about/about.component.ts":
/*!************************************************!*\
  !*** ./src/app/about/about/about.component.ts ***!
  \************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_about_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/about.service */ "./src/app/about/shared/about.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutComponent = /** @class */ (function () {
    function AboutComponent(aboutService) {
        this.aboutService = aboutService;
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.aboutParagraphs = this.aboutService.getAboutParagraphs();
    };
    AboutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(/*! ./about.component.html */ "./src/app/about/about/about.component.html"),
            styles: [__webpack_require__(/*! ./about.component.css */ "./src/app/about/about/about.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_about_service__WEBPACK_IMPORTED_MODULE_1__["AboutService"]])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./src/app/about/shared/about.service.ts":
/*!***********************************************!*\
  !*** ./src/app/about/shared/about.service.ts ***!
  \***********************************************/
/*! exports provided: AboutService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutService", function() { return AboutService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutService = /** @class */ (function () {
    function AboutService() {
    }
    AboutService.prototype.getAboutParagraphs = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(ABOUT_PARAGRAPHS);
    };
    AboutService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], AboutService);
    return AboutService;
}());

var ABOUT_PARAGRAPHS = [
    "\n    Hey, my name is Yinghao Wang. You may also know me by Alan, which is what\n    most people call me. I live in the Bay Area, and I am currently looking for a software\n    engineering position. I have recently graduated with a double major\n    in Computer Science and Economics from University of California, Santa Cruz.\n  ",
    "\n    I have always been fascinated with designing and writing software.\n    As a child I played web browser games, and that got me interested in computers.\n    My first memory of writing code is when I made a website that shares movie links\n    in middle school. It was really bad because I wrote it purely in HTML and CSS,\n    so I had to manually update everything every time anything was added or changed.\n  ",
    "\n    Currently, I enjoy writing software in my free time. I write a bit of everything,\n    but web apps are my favorite because they are so easy to share.\n    Outside of programming, I am very passionate about table tennis. Besides that, my other\n    hobbies are pretty generic like spending time with friends, browsing YouTube, and exercising.\n  ",
    "\n    If you'd like to talk with me, just send me an email.\n  "
];


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _projects_project_list_project_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects/project-list/project-list.component */ "./src/app/projects/project-list/project-list.component.ts");
/* harmony import */ var _projects_project_project_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projects/project/project.component */ "./src/app/projects/project/project.component.ts");
/* harmony import */ var _about_about_about_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about/about/about.component */ "./src/app/about/about/about.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var appRoutes = [
    { path: '', component: _projects_project_list_project_list_component__WEBPACK_IMPORTED_MODULE_2__["ProjectListComponent"], pathMatch: 'full' },
    { path: 'projects', redirectTo: '/' },
    { path: 'project/:id', component: _projects_project_project_component__WEBPACK_IMPORTED_MODULE_3__["ProjectComponent"] },
    { path: 'about', component: _about_about_about_component__WEBPACK_IMPORTED_MODULE_4__["AboutComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(appRoutes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-content {\r\n    min-height: 70vh;\r\n    min-height: calc(100vh - 88px);\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"main-content\">\n    <router-outlet></router-outlet>\n</div>\n<app-footer></app-footer>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _projects_projects_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projects/projects.module */ "./src/app/projects/projects.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _about_about_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./about/about.module */ "./src/app/about/about.module.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _projects_projects_module__WEBPACK_IMPORTED_MODULE_3__["ProjectsModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _about_about_module__WEBPACK_IMPORTED_MODULE_5__["AboutModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/projects/project-list/project-list.component.css":
/*!******************************************************************!*\
  !*** ./src/app/projects/project-list/project-list.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header-link:hover {\r\n  color: #999;\r\n}\r\n\r\n.content-header {\r\n  text-align: center;\r\n}\r\n\r\nul {\r\n  padding: 0;\r\n}\r\n\r\n.content-header h4 {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.project-list {\r\n  max-width: 1400px;\r\n  display: table;\r\n  margin: 0 auto;\r\n  display: inline-block;\r\n}\r\n\r\n@media (max-width: 900px) {\r\n  .project-container {\r\n    display: block !important;\r\n  }\r\n}\r\n\r\n@media (max-width: 500px) {\r\n  .project-container {\r\n    width: 350px !important;\r\n  }\r\n}\r\n\r\n@media (max-width: 400px) {\r\n  .project-container {\r\n    width: 300px !important;\r\n  }\r\n}\r\n\r\n@media (max-width: 300px) {\r\n  .project-container {\r\n    width: 200px !important;\r\n  }\r\n}\r\n\r\n@media (max-width: 250px) {\r\n  .project-container {\r\n    width: 150px !important;\r\n  }\r\n}\r\n\r\n.project-container {\r\n  cursor: pointer;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10px;\r\n  width: 400px;\r\n  margin: 0.75rem;\r\n  display: inline-block;\r\n  vertical-align: top;\r\n  box-shadow: 1px 2px 5px #ddd;\r\n  transition: 500ms;\r\n}\r\n\r\n.project-container:hover {\r\n  box-shadow: 3px 8px 5px #ddd;\r\n  transition: 500ms;\r\n}\r\n\r\nimg.project-img {\r\n  width: 100%;\r\n  height: auto;\r\n  margin: 0 auto;\r\n  border-top-left-radius: 10px;\r\n  border-top-right-radius: 10px;\r\n}\r\n\r\n.project-container h2 {\r\n  margin: 0.5rem;\r\n}\r\n\r\n.project-container p {\r\n  margin: 0 1rem 0.5rem;\r\n  line-height: 1.6rem;\r\n}\r\n\r\n.project-category {\r\n  margin: 0 1rem 1rem;\r\n}\r\n\r\n.category-pill {\r\n  background: #ccc;\r\n  color: #000;\r\n  border-radius: 20px;\r\n  padding: 3px 8px;\r\n  font-size: 12px;\r\n  margin-right: 0.25rem;\r\n}\r\n"

/***/ }),

/***/ "./src/app/projects/project-list/project-list.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/projects/project-list/project-list.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section>\n  <div class=\"flex-container\">\n    <div class=\"header\">\n      <h1 class=\"header-description\">\n        Hi, I'm Yinghao. I am looking for a software engineering job.\n      </h1>\n      <a class=\"header-link\" routerLink=\"/about\">More about me</a>\n    </div>\n  </div>\n  <div class=\"content-header\">\n    <h4>\n      Projects\n    </h4>\n  </div>\n  <div class=\"flex-container\">\n    <div class=\"project-list\">\n      <div *ngFor=\"let project of visibleProjects | async\" (click)=\"goToURL(project.github_url)\" class=\"project-container\">\n        <div class=\"project-thumbnail\">\n          <img src=\"{{ project.thumbnail_url }}\" class=\"project-img\">\n        </div>\n        <div class=\"project-description\">\n          <h2>{{ project.name }}</h2>\n          <p>{{ project.description }}</p>\n          <div class=\"project-category\">\n            <span *ngFor=\"let category of project.categories\" class=\"category-pill\">\n              {{ category }}\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n<section></section>"

/***/ }),

/***/ "./src/app/projects/project-list/project-list.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/projects/project-list/project-list.component.ts ***!
  \*****************************************************************/
/*! exports provided: ProjectListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectListComponent", function() { return ProjectListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/project.service */ "./src/app/projects/shared/project.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectListComponent = /** @class */ (function () {
    function ProjectListComponent(projectService) {
        this.projectService = projectService;
    }
    ProjectListComponent.prototype.ngOnInit = function () {
        this.visibleProjects = this.projectService.getProjects();
    };
    ProjectListComponent.prototype.goToURL = function (url) {
        window.open(url);
    };
    ProjectListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project-list',
            template: __webpack_require__(/*! ./project-list.component.html */ "./src/app/projects/project-list/project-list.component.html"),
            styles: [__webpack_require__(/*! ./project-list.component.css */ "./src/app/projects/project-list/project-list.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"]])
    ], ProjectListComponent);
    return ProjectListComponent;
}());



/***/ }),

/***/ "./src/app/projects/project/project.component.css":
/*!********************************************************!*\
  !*** ./src/app/projects/project/project.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/projects/project/project.component.html":
/*!*********************************************************!*\
  !*** ./src/app/projects/project/project.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  project works!\n</p>\n"

/***/ }),

/***/ "./src/app/projects/project/project.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/projects/project/project.component.ts ***!
  \*******************************************************/
/*! exports provided: ProjectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectComponent", function() { return ProjectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectComponent = /** @class */ (function () {
    function ProjectComponent() {
    }
    ProjectComponent.prototype.ngOnInit = function () {
    };
    ProjectComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-project',
            template: __webpack_require__(/*! ./project.component.html */ "./src/app/projects/project/project.component.html"),
            styles: [__webpack_require__(/*! ./project.component.css */ "./src/app/projects/project/project.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ProjectComponent);
    return ProjectComponent;
}());



/***/ }),

/***/ "./src/app/projects/projects.module.ts":
/*!*********************************************!*\
  !*** ./src/app/projects/projects.module.ts ***!
  \*********************************************/
/*! exports provided: ProjectsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsModule", function() { return ProjectsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_project_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/project.service */ "./src/app/projects/shared/project.service.ts");
/* harmony import */ var _project_project_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project/project.component */ "./src/app/projects/project/project.component.ts");
/* harmony import */ var _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-list/project-list.component */ "./src/app/projects/project-list/project-list.component.ts");
/* harmony import */ var _shared_project_filter_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/project-filter.pipe */ "./src/app/projects/shared/project-filter.pipe.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../app-routing.module */ "./src/app/app-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ProjectsModule = /** @class */ (function () {
    function ProjectsModule() {
    }
    ProjectsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"]
            ],
            providers: [
                _shared_project_service__WEBPACK_IMPORTED_MODULE_2__["ProjectService"]
            ],
            declarations: [
                _project_project_component__WEBPACK_IMPORTED_MODULE_3__["ProjectComponent"],
                _project_list_project_list_component__WEBPACK_IMPORTED_MODULE_4__["ProjectListComponent"],
                _shared_project_filter_pipe__WEBPACK_IMPORTED_MODULE_5__["ProjectFilterPipe"]
            ]
        })
    ], ProjectsModule);
    return ProjectsModule;
}());



/***/ }),

/***/ "./src/app/projects/shared/project-filter.pipe.ts":
/*!********************************************************!*\
  !*** ./src/app/projects/shared/project-filter.pipe.ts ***!
  \********************************************************/
/*! exports provided: ProjectFilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectFilterPipe", function() { return ProjectFilterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ProjectFilterPipe = /** @class */ (function () {
    function ProjectFilterPipe() {
    }
    ProjectFilterPipe.prototype.transform = function (value, args) {
        return null;
    };
    ProjectFilterPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'projectFilter'
        })
    ], ProjectFilterPipe);
    return ProjectFilterPipe;
}());



/***/ }),

/***/ "./src/app/projects/shared/project.service.ts":
/*!****************************************************!*\
  !*** ./src/app/projects/shared/project.service.ts ***!
  \****************************************************/
/*! exports provided: ProjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectService", function() { return ProjectService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectService = /** @class */ (function () {
    function ProjectService() {
    }
    ProjectService.prototype.getProjects = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(PROJECTS);
    };
    ProjectService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], ProjectService);
    return ProjectService;
}());

var PROJECTS = [
    {
        'name': 'Flappy Bot',
        'description': 'Using neural networks and genetic algorithms, AI learns to play Flappy Bird.',
        'categories': [
            'machine learning',
            'javascript'
        ],
        'github_url': 'https://yinghaoawang.github.io/flappy/',
        'thumbnail_url': 'https://i.imgur.com/DsQZwYb.png'
    },
    {
        'name': 'Super Chess',
        'description': "A fully featured chess game written from scratch with emphasis on OOP practices.",
        'categories': [
            'java'
        ],
        'github_url': 'https://github.com/yinghaoawang/Super-Chess',
        'thumbnail_url': 'https://i.imgur.com/tHQESiQ.png'
    },
    {
        'name': 'Machine Instructions Simulator',
        'description': 'A server sided virtual machine that interprets and executes instructions.',
        'categories': [
            'c++'
        ],
        'github_url': 'https://github.com/yinghaoawang/MIS',
        'thumbnail_url': 'https://i.imgur.com/TrmYxKu.png'
    },
    {
        'name': 'Lotka-Volterra and Collision Detection',
        'description': "Includes a predator-prey simulation with modifiable graph. A separate visualization of a quadtree and\n    spatial hashing is included.\n    ",
        'categories': [
            'javascript',
            'java',
            'processing',
            'optimization'
        ],
        'github_url': 'https://yinghaoawang.github.io/lv/lv-sim.html',
        'thumbnail_url': 'https://i.imgur.com/kc9LOQ3.png'
    },
    {
        'name': 'ComicHub',
        'description': "A single-page web application for hosting and reading online comics. It ensures smoothness\n    by using techniques such as image preloading.",
        'categories': [
            'javascript',
            'sql',
            'node.js',
            'angular',
            'group project',
        ],
        'github_url': 'https://github.com/CMPS-115-Webcomics',
        'thumbnail_url': 'https://static.comicvine.com/uploads/scale_small/0/4/44248-3790-51407-1-flash.jpg'
    },
    {
        'name': 'California Wildfires',
        'description': "A visualization of wildfires in CA from 2008 to 2016. Allows filtering by type of fire, and type of damage.",
        'categories': [
            'javascript',
            'd3.js',
        ],
        'github_url': 'https://yinghaoawang.github.io/CMPS165/Final_Project/',
        'thumbnail_url': 'https://i.imgur.com/USjH8Q8.png'
    },
];


/***/ }),

/***/ "./src/app/shared/footer/footer.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/footer/footer.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer>\n  <div class=\"container\">\n    <ul>\n      <li>\n          <a href=\"https://www.github.com/yinghaoawang/\">Github</a>\n      </li>\n      <li>\n          <a href=\"https://www.linkedin.com/in/yinghao-a-wang/\">LinkedIn</a>\n      </li>\n      <li>\n          <a href=\"mailto:yinghao.a.wang@gmail.com\">Email</a>\n      </li>\n    </ul>\n  </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/shared/footer/footer.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/footer/footer.component.ts ***!
  \***************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/shared/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ../shared.css */ "./src/app/shared/shared.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/shared/navbar/navbar.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/navbar/navbar.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header>\n  <nav>\n    <div class=\"container\">\n      <a class=\"logo selected\" href=\"/\">Yinghao Wang</a>\n      <ul class=\"nav-links\">\n        <li>\n          <a routerLink=\"/projects\">Projects</a>\n        </li>\n\n        <li>\n          <a routerLink=\"/about\">About Me</a>\n        </li>\n\n      </ul>\n    </div>\n  </nav>\n</header>"

/***/ }),

/***/ "./src/app/shared/navbar/navbar.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/navbar/navbar.component.ts ***!
  \***************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavbarComponent = /** @class */ (function () {
    function NavbarComponent() {
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/shared/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ../shared.css */ "./src/app/shared/shared.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/shared/shared.css":
/*!***********************************!*\
  !*** ./src/app/shared/shared.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nav, footer {\r\n    width: 100%;\r\n    height: 38px;\r\n    justify-content: center;\r\n    display: flex;\r\n}\r\n\r\nnav .container {\r\n    padding: 0;\r\n    justify-content: space-between;\r\n}\r\n\r\nnav ul {\r\n    margin: 0;\r\n}\r\n\r\nnav ul li,\r\nfooter ul li {\r\n    list-style: none;\r\n    display: inline-block;\r\n    line-height: 1rem;\r\n}\r\n\r\nnav ul li:not(:last-of-type):after,\r\nfooter ul li:not(:last-of-type):after {\r\n    color: #151515;\r\n    content: '/';\r\n    position: relative;\r\n    margin: 0 1rem;\r\n}\r\n\r\n.container {\r\n    width: 100%;\r\n    max-width: 1200px;\r\n    margin: 0 1.5rem;\r\n    display: flex;\r\n    flex-flow: row wrap;\r\n    align-content: flex-start;\r\n    justify-content: center;\r\n}\r\n\r\n.logo {\r\n    padding: 1rem 0;\r\n    font-weight: bold;\r\n}\r\n\r\na.logo.selected:hover {\r\n    color: #666;\r\n}\r\n\r\na.selected {\r\n    color: #222;\r\n}\r\n\r\na:not(.selected):hover {\r\n    color: #999;\r\n}\r\n\r\n.nav-links {\r\n    padding: 1rem 0;\r\n    z-index: 1;\r\n}\r\n\r\nfooter {\r\n    height: 50px;\r\n}\r\n\r\nfooter {\r\n    z-index: 1;\r\n}\r\n\r\n@media (max-width: 375px) {\r\n    nav ul li:not(:last-of-type):after,\r\n    footer ul li:not(:last-of-type):after {\r\n        color: #151515;\r\n        content: '/';\r\n        position: relative;\r\n        margin: 0 .5rem;\r\n    }\r\n\r\n    nav {\r\n        font-size: 16px;\r\n    }\r\n}\r\n\r\n@media (max-width: 315px) {\r\n    nav ul li:not(:last-of-type):after,\r\n    footer ul li:not(:last-of-type):after {\r\n        color: #151515;\r\n        content: '/';\r\n        position: relative;\r\n        margin: 0 .35rem;\r\n    }\r\n\r\n    nav {\r\n        font-size: 14px;\r\n    }\r\n}\r\n\r\n@media (max-width: 285px) {\r\n    nav ul li:not(:last-of-type):after,\r\n    footer ul li:not(:last-of-type):after {\r\n        color: #151515;\r\n        content: '/';\r\n        position: relative;\r\n        margin: 0 .2rem;\r\n    }\r\n\r\n    nav {\r\n        font-size: 10px;\r\n    }\r\n\r\n    footer {\r\n        font-size: 12px;\r\n    }\r\n}\r\n\r\n@media (max-width: 215px) {\r\n    nav ul li:not(:last-of-type):after,\r\n    footer ul li:not(:last-of-type):after {\r\n        color: #151515;\r\n        content: '/';\r\n        position: relative;\r\n        margin: 0 .1rem;\r\n    }\r\n\r\n    nav {\r\n        font-size: 8px;\r\n    }\r\n\r\n    footer {\r\n        font-size: 10px;\r\n    }\r\n}"

/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/shared/navbar/navbar.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/shared/footer/footer.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app-routing.module */ "./src/app/app-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"]
            ],
            declarations: [_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_2__["NavbarComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]],
            exports: [
                _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_2__["NavbarComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /mnt/c/Users/Wang/Documents/Projects/Personal-Website/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map