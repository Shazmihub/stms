// Start Angular JS from here
var app = angular.module('myTime', ['ngRoute']);

// ngRoute configuration
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
    })
    .when('/sessem', {
      templateUrl: 'sessem.html',
    })
    .when('/courses', {
      templateUrl: 'courses.html',
    })
    .when('/studentcourses', {
      templateUrl: 'studentcourses.html',
    })
    .when('/studentpage', {
      templateUrl: 'studentpage.html',
    })
    .when('/lecturercourses', {
      templateUrl: 'lecturercourses.html',
    })
    .when('/lecturerpage', {
      templateUrl: 'lecturerpage.html',
      
    })
    .when("/search", {
      templateUrl: "search.html"
   })
    .when("/studentsearch", {
      templateUrl: "studentsearch.html"
      
   })
   .when("/studentdetails", {
    templateUrl: "studentdetails.html"
  })
   .when("/lectsearch", {
    templateUrl: "lectsearch.html"
    })
    .when("/lectdetails", {
      templateUrl: "lectdetails.html"
    })
    
    .when("/forgotpassword" , {
      templateUrl: "forgotpassword.html"
});
});

// main controller of myTime angular app
app.controller('main', function ($scope, $http, $rootScope) {
  var url = 'http://web.fc.utm.my/ttms/web_man_webservice_json.cgi?';
  $rootScope.url = url;
});
