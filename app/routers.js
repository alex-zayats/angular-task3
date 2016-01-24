 var app = angular.module('routers', ['ui.router', 'ngResource']);

 app.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
       .state('login', {
           url: "/login",
           templateUrl: "templates/login-form.html",
           controller: "LoginCtrl"
       })

       .state('user-info', {
            url: "/user-info/:phoneId",
            templateUrl: "templates/phone-details.html",
            controller: "PhoneDetailCtrl"
        });

     $urlRouterProvider.otherwise("/login");
 });

 app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode({
  		enabled: true,
  		requireBase: true
	});
}]);