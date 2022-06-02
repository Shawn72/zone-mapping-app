'use-strict';
var googleMaps = function () { 
 
  var geoXml = null;
  var map = null;
  var geocoder = null;
  var toggleState = 1;
  var infowindow = null;
  var marker = null;
  var address = null;

  var initialize = function() {

     // alert("still loading things from here: initialize")
    
     //load stored kml map files
      var polygonZoneA =  loadFileToElement("~/xml_zones/zone_a.xml");    
      var polygonZoneB =  loadFileToElement("http://localhost:9090/zoning/zone_b.xml"); 
    

      geocoder = new google.maps.Geocoder();
      infowindow = new google.maps.InfoWindow({
          size: new google.maps.Size(150, 50)
      });

      // var myLatLng = new google.maps.LatLng(-1.299182789116766, 36.78356022890926);
      // var maptype = google.maps.MapTypeId.ROADMAP;
    
      // If there are any parameters at eh end of the URL, they will be in  location.search
      // looking something like  "?marker=3"
     
      map = new google.maps.Map(document.getElementById("deliv_map"), {
        center: {
          lat: -1.299182789116766, lng: 36.78356022890926
        },
        zoom: 5,
      });
      
      geoXml = new geoXML3.parser({
        map: map,
        singleInfoWindow: true,
        infoWindow: infowindow,
        zoom: true
      });
    
      google.maps.event.addListener(geoXml, "parsed", function() {
        if (address) setTimeout(function() {
          showAddress(address);
        }, 500);
      });

      //parse the covered zones here
      geoXml.parseKmlString(polygonZoneA);
      geoXml.parseKmlString(polygonZoneB);

      google.maps.event.addListenerOnce(map, "idle", function() {
        for (var j = 0; j < geoXml.docs.length; j++) {
          for (var i = 0; i < geoXml.docs[j].placemarks.length; i++) {
            var placemark = geoXml.docs[j].placemarks[i];
            if (placemark.polygon) {
              google.maps.event.addListener(placemark.polygon, 'click', clickHandler);
            }
          }
        }
      });

      google.maps.event.addListener(map, 'click', clickHandler);

      //map click event handler
      function clickHandler(evt) {
        var contentString = "Click <br> Outside the area";
        var point = evt.latLng;
        contentString += "<br>" + point.toUrlValue(6);
        map.setCenter(point);
        if (marker && marker.setMap) marker.setMap(null);
        marker = new google.maps.Marker({
          map: map,
          position: point
        });
        contentString = findAndDisplayKml("click", point, contentString);
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
        });
        google.maps.event.trigger(marker, "click");
      }

      //search the submitted address
      function showAddress(address) {        
        var contentString = address + "<br>Is Outside the Zone";      
        geocoder.geocode({
          'address': address
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var point = results[0].geometry.location;
              //alert(JSON.stringify(results))
              contentString += "<br>" + point;
              map.setCenter(point);
              if (marker && marker.setMap) marker.setMap(null);
              marker = new google.maps.Marker({
                map: map,
                position: point
              });
              contentString = findAndDisplayKml(address, point, contentString);
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
              });
              google.maps.event.trigger(marker, "click");
            } else {
              alert("Geolocation coding was not successful due to the following reason: " + status);
            }
        });
      }


      function processAddress(address) {        
        var contentString = null;     
        geocoder.geocode({
          'address': address
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var point = results[0].geometry.location;

              map.setCenter(point);
              if (marker && marker.setMap) marker.setMap(null);
              marker = new google.maps.Marker({
                map: map,
                position: point
              });

              //search from the zones
              contentString = detectAddressZone(address, point, contentString); 

              //point of ref
              var myLatLng = new google.maps.LatLng(-1.299182789116766, 36.78356022890926);
              var distanceinmeters = getTheDistance(myLatLng, point) 
              
              switch(contentString){
                case "zone A":
                  alert("Address found in zone A, Distance:"+(distanceinmeters/1000).toFixed(3)+" KMs away")
                  break;
                case "zone B":
                  alert("Address found in zone B, Distance: "+(distanceinmeters/1000).toFixed(3)+" KMs away" )
                break;
                default: //returned null
                  alert("Address outside any of the demarcations! Distance: "+(distanceinmeters/1000).toFixed(3)+" KMs away")
                  break;
              }        
            } else {
              alert("geolocating failed" + status);
            }
        });
      }

      var rad = function(x) {
        return x * Math.PI / 180;
      };
      
      //calculate distance from main location (Morningside in this case)
      var getTheDistance = function(p1, p2) {
        //p1: point 1, p2: point 2
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat() - p1.lat());
        var dLong = rad(p2.lng() - p1.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
      };


      function detectAddressZone(address, point, contentString){
        var zoneString = null;
        for (var j = 0; j < geoXml.docs.length; j++) {
          geoXml.hideDocument(geoXml.docs[j]);
          for (var i = 0; i < geoXml.docs[j].gpolygons.length; i++) {
            if (google.maps.geometry.poly.containsLocation(point, geoXml.docs[j].gpolygons[i])) {
              // modify here to return desired content
              //return zone name
              zoneString =  geoXml.docs[j].placemarks[i].name;        
            }
          }
        }
        return zoneString;      
      }

      //to draw polygon on the map for location found
      function findAndDisplayKml(address, point, contentString) {
        for (var j = 0; j < geoXml.docs.length; j++) {
          geoXml.hideDocument(geoXml.docs[j]);
          for (var i = 0; i < geoXml.docs[j].gpolygons.length; i++) {
            if (google.maps.geometry.poly.containsLocation(point, geoXml.docs[j].gpolygons[i])) {
              contentString = address + "<br>" + geoXml.docs[j].placemarks[i].name;
              contentString += "<br>" + point + "<br>polygon#" + i;
              geoXml.showDocument(geoXml.docs[j]);         
            }
          }
        }
        return contentString;    
        }

        //handle search click
      $(".address_form .btnSearch").click(function (e) {
        e.preventDefault()
           var addressVal = $("#address").val();
          // alert("Search Address: "+ addressVal)
          // showAddress(addressVal);
           processAddress(addressVal)

         // console.log("location status: "+pp)
         // alert("address: "+pp);
        //  var zDetector =  detectAddressZone(addressVal);
        //  var splitter = zDetector.split('*');
        //  if(splitter[1] =="insidezone"){
        //    alert("Address is in the specified Zones")
        //  }
        // else if(splitter[1] =="outsidezone"){
        //   alert("Address is oustide coverage area, try another")
        // }

      })

      //load xml
      $(".address_form .btnLoadXml").click(function (e) {
        e.preventDefault()
       var xmlfile = loadFileToElement("http://localhost:9090/zoning/zone_a.xml");       
       convertXmlToJson(xmlfile)
      })


      //load xml file from drive
      function loadFileToElement(filename)
      {
          var xmlHTTP = new XMLHttpRequest();
          try
          {
          xmlHTTP.open("GET", filename, false);
          xmlHTTP.send(null);
          }
          catch (e) {
              window.alert("Unable to load the requested the file!");
              return;
          }
          return xmlHTTP.responseText;
         // alert("xml: "+xmlHTTP.responseText)
         // document.getElementById(elementId).innerHTML=xmlHTTP.responseText;
      }

      //convert xml to json if need be
      function convertXmlToJson(filename){
        var x2js = new X2JS();
        var jsonStr = JSON.stringify(x2js.xml_str2json(filename) )
        alert(jsonStr)
      }


  
      //end initialize function
  };


  //call functions here
  return {
      init: function () {
        initialize();
      }
  }
}()


$(document).ready(function () {
  googleMaps.init()
})