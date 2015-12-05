var _server = "http://172.20.10.12:3000/";


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

function broadcast(obj) {
	socket.emit('message',obj);
}