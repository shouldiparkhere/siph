$( function() {
  //style for the dialog box
    $( "#dialog-3" ).dialog({
               autoOpen: true, 
               hide: "explode",
               height: 80
            });

            //here is where the dialog box is positioned on the page when it is opened
            $("#dialog-3").dialog("option", "position", {
              my:"bottom center",
              at: "left-320 bottom-80",
              of: "#dialog-3"
            })
         });

// Initialize Firebase
var config = {
 apiKey: "AIzaSyDSqVrrCzIDY3FydRzWwBVrTwFAXHo0imU",
 authDomain: "siph-1494544739001.firebaseapp.com",
 databaseURL: "https://siph-1494544739001.firebaseio.com",
 projectId: "siph-1494544739001",
 storageBucket: "siph-1494544739001.appspot.com",
 messagingSenderId: "524514555118"
};
firebase.initializeApp(config);

var baseUrl = "https://api.spotcrime.com/crimes.json?lat=39.9525838&lon=-75.165222&radius=0.08&callback=jQuery21306930704791620661_1494546905160&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&_=1494546905164"
// this variable is used by renderCrimeList
var crimes = [];

function getCrimes (lat, lng){
  var baseUrl = "https://api.spotcrime.com/crimes.json?lat=" + lat + "&lon="+ lng +"&radius=0.08&callback=jQuery21306930704791620661_1494546905160&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&_=1494546905164"
  $.ajax({
    url: baseUrl,
    method: "GET",
    dataType:'jsonp'
  }).done(function(crimeStats) {
	  // renderCrimeList will be clicked later
	  // so we need the list of crimes available
	  // when it's clicked
      crimes = crimeStats.crimes;
      calculateScore(crimeStats.crimes)
	  
      addCrimesToMap(crimeStats.crimes);
  });
}
// ========================================= //

function calculateScore(crimes) {

  // incase there are no crimes
  if (!(crimes && crimes.length)) {
      return console.log('No crimes.');
  }

  var points = 0;

  // a rudemantary point system based on type of crime
  crimes.forEach(function(crime, index){
    console.log("Crime " + index, crime, "points " + points);
    switch(crime.type.toLowerCase()) {
      case "other":
        points += 1
        break;
      case "vandalism":
        points += 2;
        break;
      case "theft":
        points += 4;
        break;
      case "robbery":
        points += 6;
        break;
      case "burglary":
        points += 9;
        break;
      case "assault":
        points+= 12;  
        break;
      default:
        break;  
    }
  });   

  // to generate word
  if(points < 15) {
    $("#scoreRating").text("SAFE")
  } else if (points > 15 && points < 30) {
    $("#scoreRating").text("PRETTY SAFE")
    } else if (points > 30 && points < 45) {
    $("#scoreRating").text("MODERATE")
  } else if (points > 45 && points < 60) {
    $("#scoreRating").text("SOMEWHAT RISKY")
  } else {
    $("#scoreRating").text("RISKY")
  };

  // input value into the html
  $("#scoreValue").text(points);
  // console.log("points " + points);
}


// ========================================= //


function renderCrimeList(crimes) {
    $("#map-content").css('height', '0px');
    $("#map-content").css('visibility', 'hidden');
    $("#map-content").css('overflow', 'hidden');
    $("#crime-content").html('<h2 class="lrg-center-text">Top Crimes in Area</h2>');
    //Loop through type of crimes so the first five are displayed in Lightbox div after Submit button clicked
    for(var i=0; i<5;i++){
		var crime = crimes[i];
  		if (crime) {
  			var crimeType = crime.type;
  			var crimeAddress = crime.address;
  			console.log("Crime Type: " + crimes.type + " " + "Crime Address: " + crimeAddress);
  			$("#crime-content").append('<p class="crime-type"> Crime: ' + crimeType + '; ' + 'Crime Address: ' + crimeAddress + '<br></br>' + '</p>');
  		}
    }

    $("#crime-container").css('visibility', 'visible');
    $("#crime-container").css('height', '100%');
}

//Give New Location button a function so user can start over
$(".newlocation-btn").click(function() {
  $("#map-content").css('height', '100%');
  $("#map-content").css('visibility', 'visible');
  $("#crime-content").empty();
  $("#crime-container").css('visibility', 'hidden');
  $("#crime-container").css('height', '0px');
});

function closeLightbox(){
	$(".lightbox").css('visibility', 'hidden');
	$(".lightbox-content").css('visibility', 'hidden');
}


$(".lightbox").delay(200).fadeIn(1000);
$( ".lightbox-btn" ).click(function() {
	closeLightbox();
});

$(".locate-btn" ).click(function() {
  // crimes array shouldbe full from calling getCrimes
	renderCrimeList(crimes);

});

function addCrimesToMap(crimes) {
  // get reference to map
  crimes.forEach(function(crime, index){
    console.log("Crime " + index, crime);
    // add a marker to map
    var latLng = {lat: crime.lat, lng: crime.lon};

    var infowindow = new google.maps.InfoWindow({
      content: "<h1>" + crime.type + "</h1>"
    });

    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      //label: crime.type,
    });

    //this allows the pins to display the crime when hovered over with the mouse
    marker.addListener('mouseover',function(){
        infowindow.open(map, marker);
    });
    // once the mouse leaves the marker the crime will no longer display
    marker.addListener('mouseout', function(){
        infowindow.close(map, marker);
    });
   
  });
}
var map, marker;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 11
      });
        
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            //the users location found marker will now show up as the desired image 
            marker = new google.maps.Marker({
              position:pos,
              map:map,
              title:"Location Found",
              icon:"assets/images/pin2.png",
              zIndex:1,

            });
            /*marker.setPosition(pos);
            marker.setContent('Location found.');
            marker.open(map);*/
            map.setCenter(pos);
            getCrimes(pos.lat, pos.lng);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }


      