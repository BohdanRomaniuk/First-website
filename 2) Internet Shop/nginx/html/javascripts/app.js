angular.module('asusShop', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.allTovars = {};
  
  // Get all tovars
  $http.get('/server/index')
  .success((data) => {
    $scope.allTovars = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Create a new user
  $scope.createUser = () => {
    $http.post('/server/register', $scope.formData)
    .success((data) => {
      $scope.formData = {};
      $scope.allTovars = data;
      console.log(data);
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };
  
  // Delete a tovar
  $scope.deleteTovar = (tovarID) => {
    $http.delete('/server/index/' + tovarID)
    .success((data) => {
      $scope.allTovars = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
});
