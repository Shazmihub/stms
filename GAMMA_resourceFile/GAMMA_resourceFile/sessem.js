app.controller('sessem', function ($scope, $http, $rootScope) {
  var url = $rootScope.url;
  console.log($rootScope.sessionUser);
  if (!$rootScope.sessemList) {
    $http.get(url + 'entity=sesisemester').then(
      function (response) {
        $rootScope.sessemList = response.data;
        //console.log($scope.data);
        // More implementation goes here ...
      },
      function (response) {
        // 2nd function to handle connection error
        alert('AJAX connection error!');
      }
    );
  } else {
    console.log('$rootScope.sessemList exist');
  }
});
