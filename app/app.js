'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.mapview',
  'myApp.loginview'
]);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/view1'
	});
}]);


app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter, {
                        'event': event
                    });
                });

                event.preventDefault();
            }
        });
    };
});