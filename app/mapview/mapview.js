'use strict';

angular.module('myApp.mapview', ['ngRoute', 'esri.map'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/mapview', {
			templateUrl: 'mapview/mapview.html',
			controller: 'SimpleMapCtrl'
		});
}]).controller('SimpleMapCtrl', function ($scope) {
		var esriMap;
        var broadcaster = {};
        var longitude;
        var latitude;
        var lastMessage;


		$scope.map = {
			options: {
				basemap: 'gray',
				center: [-0.0222079, 51.5443536],
				zoom: 11,
				sliderStyle: 'small'
			}
		};
		$scope.mapLoaded = function (map) {
			esriMap = map;

			var text = new esri.symbol.TextSymbol("test").setColor(
				new dojo.Color([10, 10, 10])).setAlign(esri.symbol.TextSymbol.ALIGN_START).setFont(
				new esri.symbol.Font(((map.getZoom() * map.getZoom()) * .05) + "pt").setFamily('arial').setWeight(esri.symbol.Font.WEIGHT_BOLD));

			//generateDiv(map);

			map.on('extent-change', changeHandler);

			//var graphic = esri.Graphic(point, text);
			//map.graphics.add(graphic)
		}
        
        socket.on('message', socket_received);
        function socket_received(obj) {
        	if(obj.final===1) return;
            if(document.getElementById("container")) {
                broadcaster[obj.username] = obj;
                // rest content
                document.getElementById("container").innerHTML = "";
                // add content
                for (var key in broadcaster) {
                    var obj = broadcaster[key];
                    generateDiv(esriMap, obj.lon, obj.lat, obj.message, obj.username);
                }
            }
        }

		function changeHandler(evt) {
            // rest content
            document.getElementById("container").innerHTML = "";
            // add content
            for (var key in broadcaster) {
                var obj = broadcaster[key];
                generateDiv(esriMap, obj.lon, obj.lat, obj.message, obj.username);
            }
		}

    
    		function generateDiv(map, lon, lat, message, username) {
                if(lon && document.getElementById("container")){
					var point = new esri.geometry.Point(lon, lat);
					var screenPoint = map.toScreen(point);

					var screen_point = map.position;
					var final_x = screenPoint.x + screen_point.x;
					var final_y = screenPoint.y + screen_point.y;

					
					if(message.length<16) {
						var number_of_symbols_to_add = 16-message.length;
						for(var i=0;i<number_of_symbols_to_add;i++) {
							message+=' ';
						}
					}

					var html = '<a href="#/view1?broadcaster=Andriy"><h3 id="broadcasterCircle'+username+'" class="roundText" style="position: absolute; top: '+final_y+'px; left: '+final_x+'px; z-index:10000000;"> '+message.substring(message.length>16 ? message.length-16 : 0, message.length)+'</h3></a>';
                    
					   document.getElementById("container").innerHTML += html;
                        $('#broadcasterCircle'+username).show().arctext({radius: 15});

                }

		}
	});
