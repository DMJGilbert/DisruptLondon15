var _server = "";
var latitude = 0;
var longitude = 0;

var USERNAME;


function init() {
	socket.on('message', message_received);
}
init();

function register_with_twilio(username, password, phoneNumber) {
	
	$.ajax({
	  type: "GET",
	  url: _server+"api/register",
	  data: {username:username,password:password,phoneNumber:phoneNumber},
	  cache: false,
	  success: function(data){
	     alert(data);
	  }
	});
}

function login(username, password,callback) {
	$.ajax({
	  type: "POST",
	  url: _server+"api/login",
	  data: {username:username,password:password},
	  cache: false,
	  success: function(data){
	     USERNAME = data.username;
	    if(callback)
	     	callback(USERNAME);
	  }
	});
}

function broadcast(obj) {
	if(latitude!==0)
		obj.lat = latitude;
	if(longitude!==0)
		obj.lon = longitude;
	socket.emit('message',obj);
}
function message_received(obj) {
	console.log(obj);
}


navigator.geolocation.getCurrentPosition(GetLocation);

function GetLocation(location) {
    latitude=(location.coords.latitude);
    longitude=(location.coords.longitude);
}