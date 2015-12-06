'use strict';

angular.module('myApp.emergency', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/emergency', {
    templateUrl: 'emergency/emergency.html',
    controller: 'EmergencyCtrl'
  });
}])

.controller('EmergencyCtrl', function($scope) {
    var maintitle = "";
    $("text").hide();
    $("#footer").hide();
    $("svg a.action").click(function(e){
        e.preventDefault();
        maintitle = $(this).attr("title");
        var title= "You can provide: "+maintitle;
        $("#page-title").text(title);
        $(this).toggleClass("active");
        $("text").show();
        //$("svg").hide();
        //$("#footer").show();       
    });
    
    //contact
    $("#gocontact").click(function(e){
         e.preventDefault();
        var title= 'Thank you for offering "'+maintitle+'"';
        $("#page-title").text(title);
        $("svg").hide();
        $("#footer").show();      
    });

});
