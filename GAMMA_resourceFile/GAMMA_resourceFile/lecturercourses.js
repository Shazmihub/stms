app.controller('lecturercourses', function ($scope, $http, $rootScope) {
  var url = $rootScope.url;
  console.log($rootScope.url);
  if (!$rootScope.timetable) {
    $http.get(url + 'entity=subjek&sesi=2022/2023&semester=1').then(
      function (response) {
        //$rootScope.userCourses[idx].timetable = response.data;
        $rootScope.timetable = response.data;
        console.log(response.data);
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

// var course = $rootScope.userCourses[idx];

// var urlTimetable = url;
// urlTimetable +=
//   'entity=jadual_subjek' +
//   '&sesi=' +
//   $rootScope.currentSession +
//   '&semester=' +
//   $rootScope.currentSemester +
//   '&kod_subjek=' +
//   course.kod_subjek +
//   '&nama_subjek=' +
//   course.nama_subjek +
//   '&seksyen=' +
//   course.seksyen;

// function getUserCourses($http) {
//   var urlUserCourses = url;

//   if ($rootScope.sessionUser.description == 'Pensyarah') {
//     urlUserCourses +=
//       'entity=pensyarah_subjek&no_pekerja=' + $rootScope.sessionUser.no_pekerja;
//   } else {
//     // maybe admin or student
//   }

//   $http.get(urlUserCourses).then(
//     function (response) {
//       console.log(response.data);

//       if (response.data) {
//         $rootScope.userCourses = response.data;

//         var length = $rootScope.userCourses.length;
//         for (var i = 0; i < length; i++) {
//           if (
//             $rootScope.userCourses[i].sesi == $rootScope.currentSession &&
//             $rootScope.userCourses[i].semester == $rootScope.currentSemester
//           ) {
//             console.log($rootScope.userCourses[i].kod_subjek);
//             getCourseTimetable($http, i);
//           }
//         }
//       } else {
//         alert("Please enter valid user's session ID!");
//       }
//       // More implementation goes here ...
//     },
//     function (response) {
//       // 2nd function to handle connection error
//       alert('AJAX connection error!');
//     }
//   );
// }

// function getUserCourses($http) {
//   var urlUserCourses = url;

//   if ($rootScope.sessionUser.description == 'Pensyarah') {
//     urlUserCourses +=
//       'entity=pensyarah_subjek&no_pekerja=' + $rootScope.sessionUser.no_pekerja;
//   } else {
//     // maybe admin or student
//   }

// function getCourseTimetable($http, idx) {
//   var dayListMap = [
//     '-',
//     'SUNDAY',
//     'MONDAY',
//     'TUESDAY',
//     'WEDNESDAY',
//     'THURSDAY',
//     'FRIDAY',
//     'SATURDAY',
//   ];

//   var timeListMap = [
//     '-',
//     '07 AM - 08 AM',
//     '08 AM - 09 AM',
//     '09 AM - 10 AM',
//     '10 AM - 11 AM',
//     '11 AM - 12 PM',
//     '12 PM - 01 PM',
//     '01 PM - 02 PM',
//     '02 PM - 03 PM',
//     '03 PM - 04 PM',
//     '04 PM - 05 PM',
//     '05 PM - 06 PM',
//   ];

//   var course = $rootScope.userCourses[idx];

//   var urlTimetable = url;
//   urlTimetable +=
//     'entity=jadual_subjek' +
//     '&sesi=' +
//     $rootScope.currentSession +
//     '&semester=' +
//     $rootScope.currentSemester +
//     '&kod_subjek=' +
//     course.kod_subjek +
//     '&nama_subjek=' +
//     course.nama_subjek +
//     '&seksyen=' +
//     course.seksyen;

//   console.log(urlTimetable);

//   $http.get(urlTimetable).then(
//     function (response) {
//       console.log(response.data);

//       if (response.data) {
//         $rootScope.userCourses[idx].timetable = response.data;
//         $rootScope.userCourses[idx].timetableView = [];

//         var length = response.data.length;

//         for (var i = 0; i < length; i++) {
//           var ttDay = dayListMap[response.data[i].hari];
//           var ttTime = timeListMap[response.data[i].masa];

//           $rootScope.userCourses[idx].timetableView.push({
//             day: ttDay,
//             time: ttTime,
//           });
//         }
//       } else {
//         alert("Can't get course's timetable!");
//       }
//       // More implementation goes here ...
//     },
//     function (response) {
//       // 2nd function to handle connection error
//       alert('AJAX connection error!');
//     }
//   );
// }
