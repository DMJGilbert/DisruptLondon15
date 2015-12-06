'use strict';

angular.module('myApp.emergency', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/emergency', {
    templateUrl: 'emergency/emergency.html',
    controller: 'EmergencyCtrl'
  });
}])

.controller('EmergencyCtrl', function($scope) {
    $("text").hide();
    $("#footer").hide();
    $("svg a.action").click(function(e){
        e.preventDefault();
        var title= "You can provide: "+$(this).attr("title");
        $("#page-title").text(title);
        $(this).toggleClass("active");
        $("text").show();
        //$("svg").hide();
        //$("#footer").show();       
    });
    
    //contact
    $("#gocontact").click(function(e){
         e.preventDefault();
        $("svg").hide();
        $("#footer").show();      
    });

});
