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
  
  // Delete a tovar
  $scope.deleteTovar = (tovarID) => {
	var sure = confirm("Ви впевнені що хочете видалити цей товар?");
	if(sure==true)
	{
	  $http.delete('/server/index/' + tovarID)
		.success((data) => {
		$scope.allTovars = data;
		console.log(data);
      })
      .error((data) => {
		console.log('Error: ' + data);
      });
	}
  };
  
  // Create a new user
  $scope.createUser = () => {
    $http.post('/server/register', $scope.formData)
    .success((data) => {
      $scope.formData = {};
      $scope.allTovars = data;
	  document.getElementById('status').innerHTML = "Ваш профіль успішно створено! </br> Увійдіть на сайт використовуючи свій логін та пароль";
	  setTimeout(function() {$('#status').fadeOut('fast');}, 5000);
      console.log(data);
    })
    .error((error) => {
	  document.getElementById('status').style.color = "red";
	  document.getElementById('status').innerHTML = "Помилка під час реєстрації";
      console.log('Error: ' + error);
    });
  };
  
  // Login user
  $scope.loginUser = () => {
    $http.post('/server/login', $scope.formData)
    .success((data) => {
      $scope.formData = {};
	  if(data==true)//Logined succesfully
	  {
		document.getElementById('status').innerHTML = "Ви успішно увійшли! </br> Вас буде переадресовано на головну сторінку";
	    setTimeout(function() { window.location.replace("/index.html"); }, 5000);
	  }
	  else
	  {
	    document.getElementById('status').style.color = "red";
		document.getElementById('status').innerHTML = "Такий користувач не існує!</br>Можливо ви помилилися при вводі паролю чи імені користувача";
	  }
      console.log(data);
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };
});
