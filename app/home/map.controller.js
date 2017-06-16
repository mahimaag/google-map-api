angular.module('myApp')
    .controller('MapCtrl', function () {
        var home = this;
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService;
        var map;
        function drawRoute() {
            var mapCenter = new google.maps.LatLng(28.535891, 77.345700);
            var myOptions =
                {
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: mapCenter
                };
            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
//There should be a div with id 'map_canvas' in your html.
            var request = {
                origin: 'Sector 127, Noida',
                destination: 'Sector 18, Noida',
                travelMode: 'DRIVING'
            };
            var lineSymbol = {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 4
            };

            var polylineOptionsActual = {
                strokeColor: '#FB802E',
                strokeOpacity:0,
                strokeWeight: 0,
                icons: [{
                    icon: lineSymbol,
                    offset: '0',
                    repeat: '20px'
                }]
            };
            directionsService.route(request, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: polylineOptionsActual});
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                    // For each route, display summary information.
                } else {
                    console.log('Directions request failed due to ' + status, response);
                }
            });

        }

        function drawRouteByWaypoints() {
            //covering Location Array

            var otherLocations = [{latitude: 28.535618, longitude: 77.348914}, {latitude: 28.555861, longitude: 77.329794}, {latitude: 28.561299, longitude: 77.336473}];
            var wayPoints = [];
            angular.forEach(otherLocations, function (waypoint) {
                wayPoints.push({
                    location: new google.maps.LatLng(waypoint.latitude, waypoint.longitude),
                    stopover: true
                });
            });
            var request = {
                origin: 'Sector 127, Noida',
                destination: 'Sector 18, Noida',
                waypoints: wayPoints,
                optimizeWaypoints: true,
                travelMode: 'DRIVING'
            };
            directionsService.route(request, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay = new google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                    // For each route, display summary information.
                } else {
                    console.log('Directions request failed due to ' + status, response);
                }
            });
            createSimpleMarker(map);
            createMarkerWithLabel(map);
            createMarkerWithCustomColor(map);
            createMarkerWithImage(map);
            createMarkerWithLabelJS(map);
            createMarkerWithMapIcon(map);


        }

        function createMap(map) {
            var mapCenter = new google.maps.LatLng(28.535891, 77.345700);
            var myOptions =
                {
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    center: mapCenter
                };
            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

        }

        function createSimpleMarker(map) {
            var marker = new google.maps.Marker({
                map: map,
                //label: '1',
                position: {lat: 28.533938, lng: 77.348235}
                //icon: pinSymbol("#FFF")
            });
        }

        function createMarkerWithLabel(map) {
            var marker = new google.maps.Marker({
                map: map,
                label: '1',
                position: {lat: 28.543792, lng: 77.331007}
                //icon: pinSymbol("#FFF")
            });
        }
        function createMarkerWithCustomColor(map) {
            var marker = new google.maps.Marker({
                map: map,
                //label: '1',
                position: {lat: 28.570317, lng: 77.321820},
                icon: pinSymbol("#FFF")
            });
        }
        function createMarkerWithImage(map) {
            var marker = new google.maps.Marker({
                map: map,
                //label: '1',
                position: {lat: 28.573405, lng: 77.371203},
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            });
        }

        function createMarkerWithLabelJS(map) {
            var marker = new MarkerWithLabel({
                position: {lat: 28.529377, lng: 77.391295},
                map: map,
                labelContent: 1,
                labelAnchor: new google.maps.Point(7, 35),
                labelClass: "labels", // the CSS class for the label
                labelInBackground: false,
                icon: pinSymbol('red')
            });
        }

        function createMarkerWithMapIcon(map) {
            var marker = new Marker({
                position: {lat: 28.533938, lng: 77.348235},
                map: map,
                icon: {
                    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                    fillColor: '#0000FF',
                    fillOpacity: 1,
                    strokeColor: '',
                    strokeWeight: 0
                },
                map_icon_label: "<span class='map-icon map-icon-bus-station'></span>"
            });
        }

        function pinSymbol(color) {
            return {
                path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                fillColor: color,
                fillOpacity: 1,
                strokeColor: '#000',
                strokeWeight: 2,
                scale: 1
            };
        }
        drawRoute();
        drawRouteByWaypoints();
    });