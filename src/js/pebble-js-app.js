 var req = new XMLHttpRequest();
  req.open('GET', 'http://api.wunderground.com/api/f6d48f234e3e919c/tide/q/CA/San_Francisco.json', true);
  req.onload = function(e) {
    if (req.readyState == 4 && req.status == 200) {
      if(req.status == 200) {
		var response = JSON.parse(req.responseText);
      	for (int i = 0; i < result.tide.tidesummary.size()) {
      		var temperature[]
      	}
        
        var temperature = result.list[0].main.temp;
        var icon = result.list[0].main.icon;
        Pebble.sendAppMessage({ "icon":icon, "temperature":temperature + "\u00B0C"});
      } else { console.log("Error"); }
    }
  }
  req.send(null);