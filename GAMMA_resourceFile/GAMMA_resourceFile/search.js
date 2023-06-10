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
             var nosubjek = String(pen.bil_subjek);
             var nosection = String(pen.bil_seksyen);
             var nopelajar = String(pen.bil_pelajar);
          
            // return (pen.nama.toLowerCase().indexOf($scope.searchl.toLowerCase()) !== -1)  || (nopekerja.toLowerCase().indexOf($scope.searchl.toLowerCase()) !== -1);
 
             if($scope.typefilter == "nama"){
                 console.log($scope.typefilter);
                 return (pen.nama.toLowerCase().indexOf($scope.searchl.toLowerCase()) !== -1);
             }else if($scope.typefilter == "nopekerja"){
                 console.log($scope.typefilter);
                return (nopekerja.toLowerCase().indexOf($scope.searchl.toLowerCase()) !== -1);
             }else if($scope.typefilter == "nosubjek"){
                 console.log($scope.typefilter);
                return (nosubjek.toLowerCase().indexOf($scope.searchl.toLowerCase()) !== -1);
             }else if($scope.typefilter == "nosection"){
                 console.log($scope.typefilter);
                return (nosection.toLowerCase().indexOf($scope.searchl.toLowerCase()) !== -1);
             }else if($scope.typefilter == "nopelajar"){
                 console.log($scope.typefilter);
                return (nopelajar.toLowerCase().indexOf($scope.searchl.toLowerCase()) !== -1);
             }
             
 
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
                 },
                 function (response) {
                     alert("AJAX connection error!");
                 }
             );
             
 
 
                 for(let i = 1; i < 22; i++){
                     $http.get(url + "entity=pelajar&session_id="+ $rootScope.sessionAdmin.session_id + "&sesi=2022/2023&semester=1&limit=100&offset=" + i + "00")
                                     .then(
                         function (response2) {
                             
                             Array.prototype.push.apply($rootScope.listpelajar, response2.data);
                             
                             
                             
                         },  
                         function (response2) {
                             alert("AJAX connection error!");
                         }
                     );
                     
                 }
                 
                 
                 
     
         } else {
             console.log("rootscope.listpelajar already exist");
         }
 
 
         $scope.searchstudentFilter = function (pel) {
             if (!$scope.searchs) {
               return true;
             }
             
             var bilsubjek = String(pel.bil_subjek);
             var tahunkursus = String(pel.tahun_kursus);
 
             if($scope.typefilter == "nama"){
                 console.log($scope.typefilter);
                 return (pel.nama.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1);
             }else if($scope.typefilter == "nomatrik"){
                 console.log($scope.typefilter);
                return (pel.no_matrik.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1);
             }else if($scope.typefilter == "kodfakulti"){
                 console.log($scope.typefilter);
                return (pel.kod_fakulti.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1);
             }else if($scope.typefilter == "kodkursus"){
                 console.log($scope.typefilter);
                return (pel.kod_kursus.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1);
             }else if($scope.typefilter == "bilsubjek"){
                 console.log($scope.typefilter);
                return (bilsubjek.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1);
             }else if($scope.typefilter == "tahunkursus"){
                 console.log($scope.typefilter);
                return (tahunkursus.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1);
             }
          
            // return (pel.nama.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1)  || (pel.no_matrik.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1) || (pel.kod_fakulti.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1) 
            // || (pel.kod_kursus.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1) || (bilsubjek.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1) || (tahunkursus.toLowerCase().indexOf($scope.searchs.toLowerCase()) !== -1);
           };
 
 
           $scope.setStudentDetails = function (pelajar) {
             
             $rootScope.clickedStudent = pelajar;
             
             
           };
     },
 );
 
 app.controller('studentpage', function ($scope, $http, $rootScope) {
    var url = $rootScope.url;
         console.log($rootScope.url);
        
         if (!$rootScope.listpelajar) {
 
             $http.get(url + "entity=pelajar&session_id="+ $rootScope.sessionAdmin.session_id + "&sesi=2022/2023&semester=1&limit=100&offset=0")
                             .then(
                 function (response) {
 
                     $rootScope.listpelajar = response.data;           
                 },
                 function (response) {
                     alert("AJAX connection error!");
                 }
             );
             
 
 
                 for(let i = 1; i < 22; i++){
                     $http.get(url + "entity=pelajar&session_id="+ $rootScope.sessionAdmin.session_id + "&sesi=2022/2023&semester=1&limit=100&offset=" + i + "00")
                                     .then(
                         function (response2) {
                             
                             Array.prototype.push.apply($rootScope.listpelajar, response2.data);
                             
                             
                             
                         },  
                         function (response2) {
                             alert("AJAX connection error!");
                         }
                     );
                     
                 }
                 
                 
                 
     
         } else {
             console.log("rootscope.listpelajar already exist");
         }
    
         $scope.studentprofile = function (pelajar) {
            console.log(pelajar);
            return pelajar.no_matrik == $rootScope.sessionUser.login_name;
            
            
          };
   
   }
 )

 app.controller('lecturerpage', function ($scope, $http, $rootScope) {
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
    
        $scope.lecturerprofile = function (lecturer) {
            console.log(lecturer);
            return lecturer.no_pekerja == $rootScope.sessionUser.no_pekerja;
            
            
          };
   }
 )