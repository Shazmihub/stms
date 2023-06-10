app.controller('searchoption', function ($scope, $http, $rootScope) {
    
    
   $scope.clickCourse = function (){
        $rootScope.click = 'course';
    };
    $scope.clickStudent = function (){
        $rootScope.click = 'student';
    };
    $scope.clickLect = function (){
        $rootScope.click = 'lect';
    };

  }
)


app.controller(
    'searchcourses',
    function ($scope, $http, $rootScope) {
        var url = $rootScope.url;
        console.log($rootScope.url);
        if (!$rootScope.timetable) {
            $http.get(url + "entity=subjek&sesi=2021/2022&semester=1")
                            .then(
                function (response) {
                    //$rootScope.userCourses[idx].timetable = response.data;
                    $rootScope.timetable = response.data;

                },
                function (response) {
                    alert("AJAX connection error!");
                }
            );
        } else {
            console.log("$rootScope.userCourses[idx].timetable exist");
        }
        $scope.searchcourseFilter = function (item) {
            if (!$scope.searchc) {
              return true;
            }
            return (item.nama_subjek.toLowerCase().indexOf($scope.searchc.toLowerCase()) !== -1) || (item.kod_subjek.toLowerCase().indexOf($scope.searchc.toLowerCase()) !== -1);
          };
    },
);

app.controller(
    'searchlecturer',
    function ($scope, $http, $rootScope) {
        var url = $rootScope.url;
        console.log($rootScope.url);
        if (!$rootScope.pensyarah) {
            $http.get(url + "entity=pensyarah&session_id="+ $rootScope.sessionAdmin.session_id +"&sesi=2022/2023&semester=1")
                            .then(
                function (response) {

                    $rootScope.pensyarah = response.data;

                },
                function (response) {
                    alert("AJAX connection error!");
                }
            );
        } else {
            console.log("rootscope.pensyarah already exist");
        }
        $scope.searchlectFilter = function (pen) {
            if (!$scope.searchl) {
              return true;
            }
            var nopekerja = String(pen.no_pekerja);
         
            return (pen.nama.toLowerCase().indexOf($scope.searchl.toLowerCase()) !== -1)  || (nopekerja.toLowerCase().indexOf($scope.searchl.toLowerCase()) !== -1);
          };

        
          $scope.setLectDetails = function (pensyarah) {
            
            $rootScope.clickedLect = pensyarah;
            
          };
    },
);

app.controller(
    'searchstudent',
    function ($scope, $http, $rootScope) {
        var url = $rootScope.url;
        console.log($rootScope.url);
        if (!$rootScope.listpelajar) {
            

                $http.get(url + "entity=pelajar&session_id="+ $rootScope.sessionAdmin.session_id + "&sesi=2022/2023&semester=1&limit=100&offset=0")
                            .then(
                function (response) {

                    $rootScope.listpelajar = response.data;
                    for(var offset = 100; offtset < 1601; offset = offset + 100) {
                        $http.get(url + "entity=pelajar&session_id="+ $rootScope.sessionAdmin.session_id + "&sesi=2022/2023&semester=1&limit=100&offset=" + offset)
                                    .then(
                        function (response) {
        
                            $rootScope.listpelajar = $rootScope.listpelajar.concat(response.data)
                        },
                        function (response) {
                            alert("AJAX connection error!");
                        }
                    );
                    }
                },
                function (response) {
                    alert("AJAX connection error!");
                }
            );
            
        } else {
            console.log("rootscope.listpelajar already exist");
        }
        $scope.searchstudentFilter = function (pel) {
            if (!$scope.searchs) {
              return true;
            }
            
         
            return (pel.nama.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1)  || (pel.no_matrik.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1);
          };
    },
);


