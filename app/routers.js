 var app = angular.module('routers', ['ui.router', 'ngResource']);

 app.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
       .state('login', {
           url: "/login",
           templateUrl: "templates/login-form.html",
           controller: "LoginCtrl"
       })

       .state('user-info', {
            templateUrl: "templates/user-detail.html",
            controller: "UserDetailCtrl",
        })

       .state('user-info.user-edit', { 
                  url: "/user-edit",
                  templateUrl: "templates/user-edit.html",
        })

        .state('user-info.user-show', {
                  url: "/user-show",
                  templateUrl: "templates/user-show.html",
        });

     $urlRouterProvider.otherwise("/login");
 });

 app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode({
  		enabled: true,
  		requireBase: true
	});
}]);