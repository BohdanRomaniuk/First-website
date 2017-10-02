angular.module('asusShop', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.allTovars = {};
  $scope.bucketTovars = {};
  
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
  
  
  //Check if user loggined
  $http.get('/server/loggined')
  .success((data) => {
		if(data)
		{
		    document.getElementById('bucket').style.display = 'unset';
			document.getElementById('profile').style.display = 'unset';
			document.getElementById('profile').innerHTML += ' ['+ data + ']';
			if(data=='admin')
			{
				document.getElementById('add').style.display = 'unset';
				var deleteButtons = document.getElementsByClassName("del");
				for(i=0; i<deleteButtons.length; i++)
				{
					deleteButtons[i].style.display = 'unset';
				}
			}
			document.getElementById('logout').style.display = 'unset';
			var buyButtons = document.getElementsByClassName('buy');
			for(i=0; i<buyButtons.length; i++)
			{
				buyButtons[i].style.display = 'unset';
			}
		}
		else
		{
			document.getElementById('login').style.display = 'unset';
			document.getElementById('register').style.display = 'unset';
		}
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
});
