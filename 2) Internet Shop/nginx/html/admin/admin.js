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
	  if(data==true)//Created succesfully
	  {
		$scope.formData = {};
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



angular.module('fileUpload', ['ngFileUpload'])
.controller('MyCtrl',['Upload','$window',function(Upload,$window){
    var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    }
    
    vm.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:3001/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };
}]);