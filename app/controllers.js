var app = angular.module('myApp', ['ui.router', 'ngResource', 'routers']);

app.factory('Phone', function($resource) {
    return $resource('phones.json', {}, {
        query: {
            method: 'GET',
            isArray: true
        },
    });
});

app.controller('PhoneListCtrl', function($scope, Phone) {
    //$scope.phones = Phone.query();
});

app.controller('PhoneDetailCtrl', function($scope, $stateParams, $http) {
     $http.get('phones/' + $stateParams.phoneId + '.json').success(function(data) {
         $scope.phone = data;
     });	
})