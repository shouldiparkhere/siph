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
*/

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
var baseUrl = "https://api.spotcrime.com/crimes.json?lat=39.9525838&lon=-75.165222&radius=0.08&callback=jQuery21306930704791620661_1494546905160&key=privatekeyforspotcrimepublicusers-commercialuse-877.410.1607&_=1494546905164"


function runQuery() {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"

  $.ajax({
    url: baseUrl,
    method: "GET",
    dataType:'jsonp'
  }).done(function(crimeStats) {
  	console.log(crimeStats.crimes)
  });
};

runQuery();


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
      }

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


//load up function 
//want map to be zoomed out to a world view when page opens up 
//want our rating to be cleared out on load 

//locate me button onclick loads up to google map api location finder



