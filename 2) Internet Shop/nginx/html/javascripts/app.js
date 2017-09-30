angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.allTovars = {};
  // Get all todos
  $http.get('/index')
  .success((data) => {
    $scope.allTovars = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  // Create a new todo
  $scope.createTodo = () => {
    $http.post('/index', $scope.formData)
    .success((data) => {
      $scope.formData = {};
      $scope.allTovars = data;
      console.log(data);
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };
  // Delete a todo
  $scope.deleteTovar = (todoID) => {
    $http.delete('/index/' + todoID)
    .success((data) => {
      $scope.allTovars = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
});
