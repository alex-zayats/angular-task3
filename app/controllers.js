var app = angular.module('myApp', ['ui.router', 'ngResource', 'routers']);

app.factory('Phone', function($resource) {
    return $resource('phones.json', {}, {
        query: {
            method: 'GET',
            isArray: true
        },
    });
});

app.directive('userDirective', function() {
  return {
    restrict: 'A', //a - attribute, e - element, c - class
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.userDirective = function(modelValue, viewValue) {

        if (modelValue && modelValue.length > 3) {
          return true;
        }

        return false;
        }
      }
    };
});


app.controller('LoginCtrl', function($scope) {

    //$scope.phones = Phone.query();
    //$scope.loginform = {};
    //$scope.list = [];

    console.log($scope);
    console.log($scope.loginForm);

    $scope.submit = function(){
            console.log($scope.loginform);
        //$scope.list.push($scope.username);
    }
});

app.controller('PhoneDetailCtrl', function($scope, $stateParams, $http) {
     $http.get('phones/' + $stateParams.phoneId + '.json').success(function(data) {
         $scope.phone = data;
     });	
})