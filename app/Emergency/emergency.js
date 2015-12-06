'use strict';


angular.module('myApp.emergency', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/emergency', {
    templateUrl: 'Emergency/emergency.html',
    controller: 'EmergencyCtrl'
  })
}])

.controller('EmergencyCtrl', function($scope, $location) {
    var maintitle = "";
    $("text").hide();
    $("#footer").hide();
    $("svg a.action").click(function(e){
        return;
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
        return;
         e.preventDefault();
        var title= 'Thank you for offering "'+maintitle+'"';
        $("#page-title").text(title);
        $("svg").hide();
        $("#footer").show();   
        $(".no-of-people-watching").hide();
    });

    $scope.global_text_save = function(){
        return;
        //TO DO POST THIS MESSAGE
        broadcast_help({text:$scope.text, maintitle:maintitle});
        $("#global_text").val();
       // $location.path("/");
    }
});
