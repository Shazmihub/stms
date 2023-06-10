app.controller('courses', function ($scope, $http, $rootScope) {
  var url = $rootScope.url;
  console.log($rootScope.url);
  if (!$rootScope.timetable) {
    $http.get(url + 'entity=subjek&sesi=2022/2023&semester=1').then(
      function (response) {
        //$rootScope.userCourses[idx].timetable = response.data;
        $rootScope.timetable = response.data;
      },
      function (response) {
        alert('AJAX connection error!');
      }
    );
  } else {
    console.log('$rootScope.userCourses[idx].timetable exist');
  }
});
