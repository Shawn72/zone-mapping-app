'use-strict';
var googleMaps = function () {  

  var map = null;
  var geocoder = null;
  var marker = null;
  var bounds = null;
  var center = null;
  var golfcourse = null; // golf-course zone
  var kilimani = null; // kilimani zone
  var upperhill = null; //upperhill zone
  

  var initializeMap = function() { 
   
      var golfcourseZone = [  
        { lat: -1.2984225 , lng: 36.8023862 },
        { lat: -1.2998813 , lng: 36.78831 },
        { lat: -1.3044291, lng: 36.7885675},
        { lat: -1.3097492, lng: 36.7930307 },
        { lat: -1.3113796, lng: 36.8007555 },
        { lat: -1.3087195, lng: 36.8039312 },
        { lat: -1.3015974, lng: 36.8019571 },
        { lat: -1.2984225, lng: 36.8023862}
      ];

      var kilimaniZone = [
        { lat: -1.2836082 , lng: 36.7855634 },
        { lat: -1.2891429 , lng: 36.7798557 },
        { lat: -1.2904729, lng: 36.7767658},
        { lat: -1.2902155, lng:  36.7747058 },
        { lat: -1.3000406, lng:  36.7744054 },
        { lat: -1.2993971, lng: 36.7880525 },
        { lat: -1.2923178, lng: 36.7869367},
        { lat: -1.2894861, lng: 36.7865505},
        { lat: -1.2852386, lng: 36.7878379},
        { lat: -1.2836082, lng: 36.7855634}
      ];

      var upperhillZone = [
        { lat: -1.2960199, lng: 36.8089094 },
        { lat: -1.3025413, lng: 36.8093385 },
        { lat: -1.3020265, lng: 36.811656 },
        { lat: -1.3025413, lng: 36.8130292 },
        { lat: -1.300911, lng: 36.8189516 },
        { lat: -1.2979935, lng: 36.8184366 },
        { lat: -1.2946469, lng: 36.8138017 },
        { lat: -1.2960199, lng: 36.8089094 },
      ]    

      //initialize map's center
      center = new google.maps.LatLng(-1.311404060879111, 36.8005596938941);

      //first: initialize map
      map = new google.maps.Map(document.getElementById("deliv_map_pred"), {
        center:center,
        zoom: 5,
        scaleControl: true
      });    

      //geocoder
      geocoder = new google.maps.Geocoder(); // step 1 added   

      // bounds: step 2
      
      //Nairobi only
      bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-1.412140, 36.670792),//southWest 
        new google.maps.LatLng(-1.165245, 36.956347));//northEast 

      //add listener : step 3
       google.maps.event.addListenerOnce(map, 'tilesloaded', function(evt) { 
          bounds = map.getBounds();
      });       

      var motherPolygon = new google.maps.Polygon({
          paths: [golfcourseZone, kilimaniZone, upperhillZone]
      });    
          
      
        var input = document.getElementById('prd-address');
        var options = {
          bounds: bounds,
          componentRestrictions: { country: "ke" },
          strictBounds: true // enanble this
        };
        
        var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener('place_changed', function() {

          //  if (marker && marker.setMap) marker.setMap(null);

            var placePoint = autocomplete.getPlace();
         
            var newBounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());  
           
            if (!placePoint.geometry) {
               
              //get input value
            
              // processAddress(input.value)
              return;

            }

            //marker.setPosition(placePoint.geometry.location);
          //  marker.setMap(map);
            newBounds.extend(placePoint.geometry.location);
           // map.fitBounds(newBounds);
            
            if (google.maps.geometry.poly.containsLocation(placePoint.geometry.location, motherPolygon))
            {
                alert("Address location found within allowed zones")

                //from here

            } 
            else {


             $("#map-feedback").attr("class", "alert alert-danger alert-dismissible");
             $("#map-feedback").html("Area outside demarcation!");
             alert("Address outside allowed demarcation!")
           
             };            
	      });     

      function geoLocateAddress(address) 
      { 

        geocoder.geocode({
          'address': address
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) { 

               var point = results[0].geometry.location;

              // from here
              var newBounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
              marker.setPosition(point);
              marker.setMap(map);
              newBounds.extend(point);
              map.fitBounds(newBounds);

              if (google.maps.geometry.poly.containsLocation(point, polygon1)){
              alert('The area contains the address');  
              } else {
              alert('The address is outside of the area.');  
              };             

            } else {
              alert("geolocating failed" + status);
            }
        });
      }  






      //end initialize function
  };

  //call functions here
  return {
      init: function () {
        initializeMap();
      }
  }
}()


$(document).ready(function () {
  googleMaps.init()
})