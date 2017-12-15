angular.module('loadBalancer', [])
.controller('adminController', ($scope, $http) => {
  $scope.allTasks = {};
  
  // Get all tovars
  $http.get('../server/admin/index')
  .success((data) => {
    $scope.allTasks = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
});