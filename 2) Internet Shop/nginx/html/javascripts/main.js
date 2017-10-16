app = angular.module('asusShop', []);   

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
  
  // Get all tovars
  $http.get('/server/index/1&price_asc')
  .success((data) => {
    $scope.allTovars = data;
	$scope.currentpage = "1";
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  //Get pages
  $http.get('/server/pages')
  .success((data) => {
    $scope.pages = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  
  // Get tovars by special order
  $scope.getTovars = (page, order) => {
    $http.get('/server/index/'+ page +'&' + order)
    .success((data) => {
	  $scope.currentpage  = page;
	  var pages = document.getElementsByClassName("page");
	  for(var i=0; i<pages.length; ++i)
	  {
		if(pages[i].innerHTML==page)
		{
		  pages[i].style.backgroundColor = "#fd8383";
		  pages[i].style.border = "1px solid #ab0606";
		}
		else
		{
		  pages[i].style.backgroundColor = "#a2fd83";
		  pages[i].style.border = "1px solid #06ab20";
		}
	  }
      $scope.allTovars = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
  
  // Add tovar to Bucket
  $scope.addTovarToBucket = (tovarID, pageNumber, order) => {
    $http.post('/server/addBucket/' + tovarID + '&' + pageNumber + '&' + order)
    .success((data) => {
      $scope.allTovars = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
  
  //Delete tovar from Bucket
  $scope.deleteTovarFromBucket = (tovarID, pageNumber, order) => {
    $http.delete('/server/index/' + tovarID + '&' + pageNumber + '&' + order)
    .success((data) => {
      $scope.allTovars = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
});

app.controller('bucketController', ($scope, $http) => {
  $scope.navigationElems = {};
  $scope.bucketTovars = {};
  $scope.bucket = { "color" : "#83e407", "border-bottom" : "4px solid #81e407" };
  
  // Get all Navigation
  $http.get('/server/navigation')
  .success((data) => {
    $scope.navigationElems = data;
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
});

app.controller('profileController', ($scope, $http) => {
  $scope.navigationElems = {};
  $scope.allTovars = {};
  $scope.bucketTovars = {};
  $scope.profile = { "color" : "#83e407", "border-bottom" : "4px solid #81e407" };
  
  // Get all Navigation
  $http.get('/server/navigation')
  .success((data) => {
    $scope.navigationElems = data;
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