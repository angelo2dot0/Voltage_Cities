var markers=[];
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '528557553979075',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

function geo(){
        
        $("#geocomplete").geocomplete()
          .bind("geocode:result", function(event, result){
            $.log("Result: " + result.formatted_address);
          })
          .bind("geocode:error", function(event, status){
            $.log("ERROR: " + status);
          })
          .bind("geocode:multiple", function(event, results){
            $.log("Multiple: " + results.length + " results found");
          });   
        
};

// When the window has finished loading create our google map below
       // google.maps.event.addDomListener(window, 'load', init);
        function init() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var id= $('.map').attr('id');
            console.log("the id is " ,id);
            switch (id) {
                case 'mapsan-francisco':

                    var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                        zoom: 12,
                // The latitude and longitude to center the map (always required)
                        center: new google.maps.LatLng(37.78, -122.44), // San Francisco

                // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                        styles: [{"featureType":"all","elementType":"geometry","stylers":[{"saturation":"-64"},{"lightness":"31"},{"gamma":"1.65"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"lightness":"-8"},{"saturation":"-7"},{"gamma":"1.52"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"},{"hue":"#ff0045"},{"saturation":"3"},{"lightness":"1"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#2f173f"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-58"},{"lightness":"3"},{"hue":"#b800ff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                    };
                    //var mapElement = document.getElementById('mapsan-francisco');
                    var map = new google.maps.Map(document.getElementById('mapsan-francisco'), {
                      center: {lat: 37.78, lng: -122.44},
                      styles: [{"featureType":"all","elementType":"geometry","stylers":[{"saturation":"-64"},{"lightness":"31"},{"gamma":"1.65"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"lightness":"-8"},{"saturation":"-7"},{"gamma":"1.52"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"},{"hue":"#ff0045"},{"saturation":"3"},{"lightness":"1"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#2f173f"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-58"},{"lightness":"3"},{"hue":"#b800ff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                  ,
                      zoom: 12
                    });
                    // Create the Google Map using our element and options defined above
                    //var map = new google.maps.Map(mapElement, mapOptions);
                    var input = /** @type {!HTMLInputElement} */(document.getElementById('location'));
                    console.log('the input gives', input)
                    var autocomplete = new google.maps.places.Autocomplete(input);
                    google.maps.event.addListener(autocomplete, 'place_changed', function(){
                      var place = autocomplete
                    })
                    var infowindow = new google.maps.InfoWindow();
                    var marker = new google.maps.Marker({
                        map: map,
                        anchorPoint: new google.maps.Point(0, -29)
                    });

                    autocomplete.addListener('place_changed', function() {
                        infowindow.close();
                        marker.setVisible(false);
                        var place = autocomplete.getPlace();
                        if (!place.geometry) {
                          window.alert("Autocomplete's returned place contains no geometry");
                          return;
                        }

                        // If the place has a geometry, then present it on a map.
                        if (place.geometry.viewport) {
                          map.fitBounds(place.geometry.viewport);
                        } else {
                          map.setCenter(place.geometry.location);
                          map.setZoom(17);  // Why 17? Because it looks good.
                        }
                        marker.setIcon(/** @type {google.maps.Icon} */({
                          url: place.icon,
                          size: new google.maps.Size(71, 71),
                          origin: new google.maps.Point(0, 0),
                          anchor: new google.maps.Point(17, 34),
                          scaledSize: new google.maps.Size(35, 35)
                        }));
                        marker.setPosition(place.geometry.location);
                        marker.setVisible(true);

                        var address = '';
                        if (place.address_components) {
                          address = [
                            (place.address_components[0] && place.address_components[0].short_name || ''),
                            (place.address_components[1] && place.address_components[1].short_name || ''),
                            (place.address_components[2] && place.address_components[2].short_name || '')
                          ].join(' ');
                        }

                        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                        infowindow.open(map, marker);
                    });
                break;

                case 'mapnew-york':
                    var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                        zoom: 13,
                // The latitude and longitude to center the map (always required)
                        center: new google.maps.LatLng(40.7127, -74.0059), // New York
                // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                        styles: [{"featureType":"all","elementType":"geometry","stylers":[{"saturation":"-64"},{"lightness":"31"},{"gamma":"1.65"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"lightness":"-8"},{"saturation":"-7"},{"gamma":"1.52"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"},{"hue":"#ff0045"},{"saturation":"3"},{"lightness":"1"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#2f173f"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-58"},{"lightness":"3"},{"hue":"#b800ff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                    };
                    var mapElement = document.getElementById('mapnew-york');
                    // Create the Google Map using our element and options defined above
                     var map = new google.maps.Map(mapElement, mapOptions);
                break;
                case 'maplondon':
                    var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                        zoom: 12,
                // The latitude and longitude to center the map (always required)
                        center: new google.maps.LatLng(51.507409, -0.127489), // London
                // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                        styles: [{"featureType":"all","elementType":"geometry","stylers":[{"saturation":"-64"},{"lightness":"31"},{"gamma":"1.65"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"lightness":"-8"},{"saturation":"-7"},{"gamma":"1.52"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"},{"hue":"#ff0045"},{"saturation":"3"},{"lightness":"1"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#2f173f"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-58"},{"lightness":"3"},{"hue":"#b800ff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                    };
                    var mapElement = document.getElementById('maplondon');
                    // Create the Google Map using our element and options defined above
                     var map = new google.maps.Map(mapElement, mapOptions);
                break;
                case 'mapgibraltar':
                    var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                        zoom: 12,
                // The latitude and longitude to center the map (always required)
                        center: new google.maps.LatLng(36.134477, -5.350000), // Gibraltar
                // How you would like to style the map. 
                // This is where you would paste any style found on Snazzy Maps.
                        styles: [{"featureType":"all","elementType":"geometry","stylers":[{"saturation":"-64"},{"lightness":"31"},{"gamma":"1.65"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"lightness":"-8"},{"saturation":"-7"},{"gamma":"1.52"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"},{"hue":"#ff0045"},{"saturation":"3"},{"lightness":"1"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#2f173f"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-58"},{"lightness":"3"},{"hue":"#b800ff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                    };
                    var mapElement = document.getElementById('mapgibraltar');
                    // Create the Google Map using our element and options defined above
                     var map = new google.maps.Map(mapElement, mapOptions);
                break;
                default:
                    var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 2,
                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(37.78, -122.44), // San Francisco
                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"featureType":"all","elementType":"geometry","stylers":[{"saturation":"-64"},{"lightness":"31"},{"gamma":"1.65"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"lightness":"-8"},{"saturation":"-7"},{"gamma":"1.52"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"on"},{"hue":"#ff0045"},{"saturation":"3"},{"lightness":"1"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#2f173f"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-58"},{"lightness":"3"},{"hue":"#b800ff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
                     };
                     // Get the HTML DOM element that will contain your map 
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');
            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);
            // Let's add a marker for San Francisco:
            var marker1 = new google.maps.Marker({
                position: new google.maps.LatLng(37.78, -122.44),
                map: map,
                title: 'Snazzy!'
            });

            // Adds link to maker
            google.maps.event.addListener(marker1, 'click', function() { 
              window.location = "/cities/san-francisco";
            });

            // Let's also add a marker for New York:
            var marker2 = new google.maps.Marker({
                position: new google.maps.LatLng(40.7127, -74.0059),
                map: map,
                title: 'Snazzy!'
            });

            // Adds link to maker
            google.maps.event.addListener(marker2, 'click', function() { 
              window.location = "/cities/new-york";
            });

            // Let's also add a marker for Gibraltar:
            var marker3 = new google.maps.Marker({
                position: new google.maps.LatLng(36.134477, -5.350000),
                map: map,
                title: 'Snazzy!'
            });

            // Adds link to maker
            google.maps.event.addListener(marker3, 'click', function() { 
              window.location = "cities/london";
            });

            // Let's also add a marker for London:
            var marker4 = new google.maps.Marker({
                position: new google.maps.LatLng(51.507409, -0.127489),
                map: map,
                title: 'Snazzy!'
            });

            // Adds link to maker
            google.maps.event.addListener(marker4, 'click', function() { 
              window.location = "/cities/gibraltar";
            });
        }   
        }