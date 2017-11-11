app = angular.module('loadBalancer', []);   

app.controller('indexController', ($scope, $http) => {
  $scope.navigationElems = {};
  $scope.allTovars = {};
  $scope.pages = {};
  $scope.main = { "color" : "#83e407", "border-bottom" : "4px solid #81e407" };
  $scope.ordervalue = "price_asc";
  
  // Get all Navigation
  $http.get('/server/navigation')
  .success((data) => {
    $scope.navigationElems = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
});

app.controller('loginController', ($scope, $http) => {
  $scope.navigationElems = {};
  $scope.formData = {};
  $scope.login = { "color" : "#83e407", "border-bottom" : "4px solid #81e407" };
  
  // Get all Navigation
  $http.get('/server/navigation')
  .success((data) => {
    $scope.navigationElems = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Login user
  $scope.loginUser = () => {
    $http.post('/server/login', $scope.formData)
    .success((data) => {
      $scope.formData = {};
	  if(data==true)//Logined succesfully
	  {
	    document.getElementById('status').style.color = "#80e004";
		document.getElementById('status').innerHTML = "Ви успішно увійшли! </br> Вас буде переадресовано на головну сторінку";
	    setTimeout(function() { window.location.replace("/index.html"); }, 1000);
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

app.controller('registerController', ($scope, $http) => {
  $scope.navigationElems = {};
  $scope.formData = {};
  $scope.register= { "color" : "#83e407", "border-bottom" : "4px solid #81e407" };
  
  // Get all Navigation
  $http.get('/server/navigation')
  .success((data) => {
    $scope.navigationElems = data;
	$scope.register = 
	{
		"color" : "#83e407",
		"border-bottom" : "4px solid #81e407"
	}
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Register a new user
  $scope.createUser = () => {
    $http.post('/server/register', $scope.formData)
    .success((data) => {
      $scope.formData = {};
	  if(data==true)//Registered succesfully
	  {
		document.getElementById('status').style.color = "#80e004";
	    document.getElementById('status').innerHTML = "Ваш профіль успішно створено! </br> Увійдіть на сайт використовуючи свій логін та пароль";
	    setTimeout(function() {$('#status').fadeOut('fast');}, 5000);
	  }
	  else
	  {
	    document.getElementById('status').style.color = "red";
	    document.getElementById('status').innerHTML = "Помилка під час реєстрації";
	  }
      console.log(data);
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };
});

app.controller('profileController', ($scope, $http) => {
  $scope.navigationElems = {};
  $scope.formData = {};
  $scope.profile= { "color" : "#83e407", "border-bottom" : "4px solid #81e407" };
  
  // Get all Navigation
  $http.get('/server/navigation')
  .success((data) => {
    $scope.navigationElems = data;
	$scope.profile = 
	{
		"color" : "#83e407",
		"border-bottom" : "4px solid #81e407"
	}
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
});