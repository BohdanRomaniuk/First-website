angular.module('asusShop', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.allTovars = {};
  $scope.bucketTovars = {};
  $scope.navigationElems = {};
  
  // Get all Navigation
  $http.get('/server/navigation')
  .success((data) => {
    $scope.navigationElems = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Get all tovars
  $http.get('/server/index')
  .success((data) => {
    $scope.allTovars = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Get all bucketTovars
  $http.get('/server/bucket')
  .success((data) => {
    $scope.bucketTovars = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Get all cancelTovars
  $http.get('/server/cancels')
  .success((data) => {
    $scope.cancelTovars = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Add tovar to Bucket
  $scope.addTovarToBucket = (tovarID) => {
    $http.post('/server/addBucket/' + tovarID)
    .success((data) => {
	  alert('Товар успішно додано в Корзину');
      $scope.allTovars = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
  
  // Add tovar
  $scope.addTovar = () => {
    $http.post('/server/add', $scope.formData)
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
  
  //Delete tovar from Bucket
  $scope.deleteTovarFromBucket = (tovarID) => {
    $http.delete('/server/deleteBucket/' + tovarID)
    .success((data) => {
      $scope.bucketTovars = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
  
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
