angular.module('asusShop', [])
.controller('adminController', ($scope, $http) => {
  $scope.formData = {};
  $scope.allTovars = {};
  $scope.bucketTovars = {};
  
  // Get all tovars
  $http.get('../server/admin/index')
  .success((data) => {
    $scope.allTovars = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Add tovar
  $scope.addTovar = function () {
    $http.post('../server/admin/add', $scope.formData)
    .success((data) => {
      $scope.formData = {};
	  if(data==true)//Created succesfully
	  {
		document.getElementById('status').style.color = "#80e004";
	    document.getElementById('status').innerHTML = "Товар успішно додано";
	    setTimeout(function() {$('#status').fadeOut('fast');}, 5000);
	  }
	  else
	  {
	    document.getElementById('status').style.color = "red";
	    document.getElementById('status').innerHTML = "Помилка під час додавання товару";
	  }
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
  
  // Add action
  $scope.addActionToTovar = function(tovarID) {
	var amountOfAction = prompt("Введіть розмір знижки:", "10");
    $http.post('../server/admin/addActionToTovar/' + tovarID +'&' + amountOfAction)
    .success((data) => {
	  alert('Акцію успішно додано!');
      $scope.allTovars = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
  
  // Delete action
  $scope.deleteActionFromTovar = function(tovarID) {
    $http.delete('../server/admin/deleteActionFromTovar/' + tovarID)
    .success((data) => {
	  alert('Акцію успішно скасовано!');
      $scope.allTovars = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
  
  // Delete a tovar
  $scope.deleteTovar = function(tovarID) {
	var sure = confirm("Ви впевнені що хочете видалити цей товар?");
	if(sure==true)
	{
	  $http.delete('../server/admin/index/' + tovarID)
		.success((data) => {
		$scope.allTovars = data;
		console.log(data);
      })
      .error((data) => {
		console.log('Error: ' + data);
      });
	}
  };
});
