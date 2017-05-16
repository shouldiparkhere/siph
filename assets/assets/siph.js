//Should I Park Here

/*
Syncing with the Master Branch

0) COMMIT ALL OF THE CHANGES ON YOUR LOCAL BRANCH
1) git checkout master
2) git pull origin master
3) git checkout MY_BRANCH
4) git merge master

Put Your Changes Into Master Branch

0) COMMIT ALL OF THE CHANGES ON YOUR LOCAL BRANCH
1) git checkout master
2) git merge bryan
3) git thanks bryan for keeping your personal notes in
*/

function closeLightbox(){
  $(".lightbox").css('visibility', 'hidden');
  $(".lightbox-content").css('visibility', 'hidden');
}

//Rebecca JS Code
$(".lightbox").delay(200).fadeIn(1000);

$( ".lightbox-btn" ).click(function() {
  closeLightbox();
});

$(".locate-btn" ).click(function() {
  $(".lightbox").css('visibility', 'visible');
  $(".lightbox-content").css('visibility', 'visible');
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

//define var for 1st auth key for first API

var authKey1 = "privatekeyforspotcrimepublicusers-commercialuse-877.410.1607";
var baseUrl = "https://api.spotcrime.com/crimes.json?"+
              "lat="+document.getElementById('startLat').innerHTML+
              "&lon="+document.getElementById('startLon').innerHTML+
              "&radius=0.08&callback=jQuery21306930704791620661_1494546905160&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&_=1494546905164"


function runQuery() {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"

  $.ajax({
    url: baseUrl,
    method: "GET",
    dataType:'jsonp'
  }).done(function(crimeStats) {
  	console.log(crimeStats.crimes);

    $(".lightbox-content").empty();
     $(".lightbox-content").html('Top Five Crimes in Area');
    //Loop through type of crimes so the first five are displayed in Lightbox div after Submit button clicked
    for(var i=0; i<5;i++){
        var crimeType = crimeStats.crimes[i].type;
        var crimeAddress = crimeStats.crimes[i].address;
        console.log("Crime Type: " + crimeType + " " + "Crime Address: " + crimeAddress);
        $(".lightbox-content").append('<p> Crime: ' + crimeType + "; " + 'Crime Address: ' + crimeAddress + '<br></br>' + '</p>');
    }
    //Create button so user can start over
    var newButton = $('<button class="lightbox-btn">New Location</button>');
    newButton.click(function() {
      closeLightbox();
    });
    $(".lightbox-content").append(newButton);

  });
};




// going to have to create some type of if then statement
// that will filter wether the user is trying to search or 
// if its getting their current location

function initMap() {

        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
};

$(".locate-btn").click(function() {
  var startPos;
  var nudge = document.getElementById("nudge");

  var showNudgeBanner = function() {
    nudge.style.display = "block";
  };

  var hideNudgeBanner = function() {
    nudge.style.display = "none";
  };

  var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

  var geoSuccess = function(position) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId);

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        showNudgeBanner();
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  runQuery();
});

window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};






//define var for 2nd auth key

var authKey2 = "";

//global vars 


/* UPDATE - maybe create a lightbox that has the user enter, then
opens up to the initial page with just the map and the search field
and the button to track location. then have another lightbox display
the score and the recent crimes in the area */


//load up function 
//want map to be zoomed out to a world view when page opens up 
//want our rating to be cleared out on load 

//locate me button onclick loads up to google map api location finder



