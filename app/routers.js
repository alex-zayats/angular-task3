 var app = angular.module('routers', ['ui.router', 'ngResource']);

 app.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
       .state('index', {
           url: "/phones",
           templateUrl: "templates/login-form.html",
           controller: "PhoneListCtrl"
       })

       .state('phone-details', {
            url: "/phones/:phoneId",
            templateUrl: "templates/phone-details.html",
            controller: "PhoneDetailCtrl"
        });

     //$urlRouterProvider.otherwise("/phones");
 });

 app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode({
  		enabled: true,
  		requireBase: true
	});
}]);