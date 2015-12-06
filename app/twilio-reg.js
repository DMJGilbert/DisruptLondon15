var _server = "";
var latitude = 0;
var longitude = 0;

var USERNAME = null;
var USERS_CONNECTED;

var TEMP_USERNAME =  randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');


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
	obj.username = USERNAME!==null?USERNAME:TEMP_USERNAME;
	console.log(obj);
	socket.emit('message',obj);
}
function broadcast_help(obj) {
	obj.username = USERNAME!==null?USERNAME:TEMP_USERNAME;
	console.log(obj);
	obj.help = 1;
	socket.emit('help',obj);
}
function message_received(obj) {
	console.log(obj);
}
function users_connected(count) {
	USERS_CONNECTED = count;
}

/*
navigator.geolocation.getCurrentPosition(GetLocation);

function GetLocation(location) {
    latitude=(location.coords.latitude);
    longitude=(location.coords.longitude);
}
*/
function generate_random_location_near_london() {
	var items = [
		{lat:51.5443805,lon:-0.0197973},
		{lat:51.5254506,lon:-0.1292581},
		{lat:51.5280672,lon:-0.0855703},
		{lat:51.5025893,lon:-0.1365537},
		{lat:51.5221397,lon:-0.174405},
		{lat:51.5090536,lon:-0.2184362},
		{lat:51.4667786,lon:-0.1807565},
		{lat:51.5089382,lon:-0.215531}
	];
	var item = items[Math.floor(Math.random()*items.length)];
	latitude = item.lat;
	longitude = item.lon;
}
generate_random_location_near_london();

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}