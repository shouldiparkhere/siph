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

// going to have to create some type of if then statement
// that will filter wether the user is trying to search or 
// if its getting their current location

function initMap() {

        var uluru = {lat: 40.7128, lng: -74.0059};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
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



