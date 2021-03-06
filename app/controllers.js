var app = angular.module('myApp', ['ngCookies', 'routers']);

app.factory('Users', [ '$resource', function($resource) {
    return $resource('app/users.json', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
}]);

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

app.controller('LoginCtrl', [ '$scope', '$state', '$cookies', '$timeout', 'Users', function($scope, $state, $cookies, $timeout, Users) {
    if ($cookies.get('user')){
        $state.go('user-info.user-show');
    }

    $scope.submit = function() {
        if ($scope.loginForm.$valid) {

            Users.query().$promise.then(function(data) {
                var user = data.filter(function(obj){
                    return (obj.login == $scope.username && obj.pass == $scope.userpassword);
                });

                if (user.length>0 ) {
                    $cookies.put('user', $scope.username);
                    $cookies.put('pass', $scope.userpassword);
                    $state.go('user-info.user-show');
                    $scope.errorSubmit = false;
                    $scope.errorForm = false;
                } else {
                    $scope.userpassword = "";
                    $scope.errorFormWibro = $scope.errorSubmit= true;
                    $scope.errorForm = false;
                    $timeout(function(){
                        $scope.errorFormWibro = false;
                    }, 400);
                }
            });
        } else {
            $scope.errorSubmit = false;
            $scope.errorForm = true;
        }
    }
}]);

app.controller('UserDetailCtrl', [ '$scope', '$state', '$cookies', function($scope, $state, $cookies) {
    $scope.user = $scope.$parent.user;
    if (!$cookies.get('user')){
        $state.go('login');
    }

    $scope.logout = function(){
       $cookies.remove('user'); 
       $cookies.remove('pass'); 
       $state.go('login');
    }

    $scope.edit = function(){
        if (!$scope.$parent.user){
            $scope.$parent.user = {};
        }
        $scope.$parent.user = $scope.user;
    }
    
}]);

app.controller('ForgotCtrl', [ '$scope', '$state', '$timeout', 'Users', function($scope, $state, $timeout, Users){
    $scope.submit = function() {
        if ($scope.forgotForm.$valid) {

            Users.query().$promise.then(function(data) {
                var user = data.filter(function(obj){
                    return (obj.login == $scope.username);
                });

                if (user.length>0 ) {
                    $scope.errorSubmit = false;
                    $scope.errorForm = false;
                    
                    $timeout(function(){
                        $scope.password = user[0].pass;
                        $scope.showPassword = true;
                    }, 1500);
                } else {
                    $scope.errorFormWibro = $scope.errorSubmit = true;
                    $scope.errorForm = $scope.showPassword = false;
                    $timeout(function(){
                        $scope.errorFormWibro = false;
                    }, 400);
                }
            });
        } else {
            $scope.showPassword = $scope.errorSubmit = false;
            $scope.errorForm = true;
        }   
    }
}]);

app.controller('LanguageCtrl', [ '$scope', '$translate', function($scope, $translate) {
    $scope.lang = {};
    $scope.lang.en = true;

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
        $scope.lang = {};

        if (langKey == 'ru') {$scope.lang.ru = true;}
        if (langKey == 'en') {$scope.lang.en = true;}
    };   
}]);