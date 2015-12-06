var _server = "";
var latitude = 0;
var longitude = 0;

var USERNAME;
var USERS_CONNECTED;


function init() {
	socket.on('message', message_received);
	socket.on('users', users_connected);
}
init();

function register_with_twilio(username, password, phoneNumber, callback) {
	
	$.ajax({
	  type: "GET",
	  url: _server+"api/register",
	  data: {username:username,password:password,phoneNumber:phoneNumber},
	  cache: false,
	  success: function(data){
	     if(callback)
	     	callback(data);
	  }
	});
}

function login_with_username(username, password,callback) {
	$.ajax({
	  type: "POST",
	  url: _server+"api/login",
	  data: {username:username,password:password},
	  cache: false,
	  success: function(data){
	     USERNAME = data.username;
	     if(typeof USERNAME === "undefined")
	     	USERNAME=null;
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
function users_connected(count) {
	USERS_CONNECTED = count;
}


navigator.geolocation.getCurrentPosition(GetLocation);

function GetLocation(location) {
    latitude=(location.coords.latitude);
    longitude=(location.coords.longitude);
}