app.controller(
    'courses',
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
        $scope.searchFilter = function (item) {
            if (!$scope.search) {
              return true;
            }
            return (item.nama_subjek.toLowerCase().indexOf($scope.search.toLowerCase()) !== -1) || (item.kod_subjek.toLowerCase().indexOf($scope.search.toLowerCase()) !== -1);
          };
    },
);
