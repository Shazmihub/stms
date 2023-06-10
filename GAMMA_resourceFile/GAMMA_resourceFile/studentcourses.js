app.controller('studentcourses', function ($scope, $http, $rootScope) {
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

function getSessemList($http) {
  var urlSessemList = url + 'entity=sesisemester';

  $http.get(urlSessemList).then(
    function (response) {
      console.log(response.data);

      if (response.data) {
        $rootScope.sessemList = response.data;
        $rootScope.currentSession = $rootScope.sessemList[0].sesi;
        $rootScope.currentSemester = $rootScope.sessemList[0].semester;

        getUserCourses($http);
      }
    },
    function (response) {
      // 2nd function to handle connection error
      alert('AJAX connection error!');
    }
  );
}

var dayListMap = [
  '-',
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

var timeListMap = [
  '-',
  '07 AM - 08 AM',
  '08 AM - 09 AM',
  '09 AM - 10 AM',
  '10 AM - 11 AM',
  '11 AM - 12 PM',
  '12 PM - 01 PM',
  '01 PM - 02 PM',
  '02 PM - 03 PM',
  '03 PM - 04 PM',
  '04 PM - 05 PM',
  '05 PM - 06 PM',
];
