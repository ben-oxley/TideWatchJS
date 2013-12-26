function fetchWeather(latitude, longitude) {
  var response;
  double FEET_TO_MM = 304.8;
  var req = new XMLHttpRequest();
  req.open('GET', "http://api.wunderground.com/api/f6d48f234e3e919c/tide/q/CA/San_Francisco.json", true);
  req.onload = function(e) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        console.log(req.responseText);
        response = JSON.parse(req.responseText);
        var timenow, tide, city;
        if (response && response.tide.tideSummary && response.tide.tideSummary.length > 0) {
          for (i = 0; i > response.tide.tideSummary.length; i++) {
          var weatherResult = response.tide.tideSummary[i];
          try{
          timenow = Math.int(weatherResult.utcdate.epoch);

          tide = weatherResult.data.height;
          city = "CA, San_Francisco"
          console.log(tide);
          console.log(timenow);
        }
        if (tide != "") {
           }
          Pebble.sendAppMessage({
            "timenow":timenow,
            "tide":tide + "\u00B0C",
            "city":city});
        }
        }
       

      } else {
        console.log("Error");
      }
    }
  }
  req.send(null);
}

function locationSuccess(pos) {
  var coordinates = pos.coords;
  fetchWeather(coordinates.latitude, coordinates.longitude);
}

function locationError(err) {
  console.warn('location error (' + err.code + '): ' + err.message);
  Pebble.sendAppMessage({
    "city":"Loc Unavailable",
    "temperature":"N/A"
  });
}

var locationOptions = { "timeout": 15000, "maximumAge": 60000 }; 


Pebble.addEventListener("ready",
                        function(e) {
                          console.log("connect!" + e.ready);
                          locationWatcher = window.navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);
                          console.log(e.type);
                        });

Pebble.addEventListener("appmessage",
                        function(e) {
                          window.navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
                          console.log(e.type);
                          console.log(e.payload.temperature);
                          console.log("message!");
                        });

Pebble.addEventListener("webviewclosed",
                                     function(e) {
                                     console.log("webview closed");
                                     console.log(e.type);
                                     console.log(e.response);
                                     });


