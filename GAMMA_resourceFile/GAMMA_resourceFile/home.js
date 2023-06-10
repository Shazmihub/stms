app.controller('home', function ($scope, $http, $rootScope) {
  $scope.login = '12085';
  $scope.password = 'S808323';
  //$scope.login = 'A20EC0002';
  //$scope.password = '011226140377';

  var url = $rootScope.url;

  $scope.authUser = function () {
    var urlAuthUser =
      url +
      'entity=authentication&login=' +
      $scope.login +
      '&password=' +
      $scope.password;

    console.log(urlAuthUser);

    $http.get(urlAuthUser).then(
      function (response) {
        console.log(response.data);

        if (response.data) {
          $rootScope.sessionUser = response.data[0];
          authAdmin($http);
          getSessemList($http);
        } else {
          alert('Please enter correct username and password!');
        }
        // More implementation goes here ...
      },
      function (response) {
        // 2nd function to handle connection error
        alert('AJAX connection error!');
      }
    );
  };

  function authAdmin($http) {
    var urlAdmin =
      'http://web.fc.utm.my/ttms/auth-admin.php?session_id=' +
      $rootScope.sessionUser.session_id;

    console.log(urlAdmin);

    $http.get(urlAdmin).then(
      function (response) {
        console.log(response.data);

        if (response.data) {
          $rootScope.sessionAdmin = response.data[0];
        } else {
          alert("Please enter valid user's session ID!");
        }
        // More implementation goes here ...
      },
      function (response) {
        // 2nd function to handle connection error
        alert('AJAX connection error!');
      }
    );
  }

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

  function getUserCourses($http) {
    var urlUserCourses = url;

    if ($rootScope.sessionUser.description == 'Pensyarah') {
      urlUserCourses +=
        'entity=pensyarah_subjek&no_pekerja=' +
        $rootScope.sessionUser.no_pekerja;
    } else if ($rootScope.sessionUser.description == 'Pelajar FSKSM') {
      urlUserCourses +=
        'entity=pelajar_subjek&no_matrik=' + $rootScope.sessionUser.login_name;
    }

    $http.get(urlUserCourses).then(
      function (response) {
        console.log(response.data);

        if (response.data) {
          $rootScope.userCourses = response.data;

          var length = $rootScope.userCourses.length;
          for (var i = 0; i < length; i++) {
            if (
              $rootScope.userCourses[i].sesi == $rootScope.currentSession &&
              $rootScope.userCourses[i].semester == $rootScope.currentSemester
            ) {
              console.log($rootScope.userCourses[i].kod_subjek);
              console.log($rootScope.userCourses[i].nama_subjek);
              getCourseTimetable($http, i);
            }
          }
        } else {
          alert("Please enter valid user's session ID!");
        }
        // More implementation goes here ...
      },
      function (response) {
        // 2nd function to handle connection error
        alert('AJAX connection error!');
      }
    );
  }

  function getCourseTimetable($http, idx) {
    var course = $rootScope.userCourses[idx];

    var urlTimetable = url;
    urlTimetable +=
      'entity=jadual_subjek' +
      '&sesi=' +
      $rootScope.currentSession +
      '&semester=' +
      $rootScope.currentSemester +
      '&kod_subjek=' +
      course.kod_subjek +
      '&nama_subjek=' +
      course.nama_subjek +
      '&seksyen=' +
      course.seksyen;

    console.log(urlTimetable);

    $http.get(urlTimetable).then(
      function (response) {
        console.log(response.data);

        if (response.data) {
          $rootScope.userCourses[idx].timetable = response.data;
          $rootScope.userCourses[idx].timetableView = [];

          var length = response.data.length;

          for (var i = 0; i < length; i++) {
            var ttDay = dayListMap[response.data[i].hari];
            var ttTime = timeListMap[response.data[i].masa];

            $rootScope.userCourses[idx].timetableView.push({
              day: ttDay,
              time: ttTime,
            });
          }
        } else {
          alert("Can't get course's timetable!");
        }
        // More implementation goes here ...
      },
      function (response) {
        // 2nd function to handle connection error
        alert('AJAX connection error!');
      }
    );
  }

  $scope.logout = function () {
    console.log('Try to logout');
    $rootScope.sessionUser = null;
    $rootScope.sessionAdmin = null;
    $rootScope.userCourses = null;
    $rootScope.sessemList = null;
  };
});
