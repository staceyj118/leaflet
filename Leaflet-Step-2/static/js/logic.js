//url json file
var query = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'

//read url
d3.json(query, function(data){
    earthquakes(data.features);
})

//reading, arranging, analyzing
function earthquakes(data) {
    var markers = []; 
        for (var i=0; i < data.length; i++){
        var lat = data[i].geometry.coordinates[0]
        var lng = data[i].geometry.coordinates[1]
        var latlng= [lat,lng]
        var mag = data[i].properties.mag
        var depth = data[i].geometry.coordinates[2]

        var color = '';
            if (depth <10, color = 'green');
                else if (depth <25 , color = 'yellow');
                else if (depth < 50, color = 'orange');
                else if (depth < 75, color = 'dark orange');
                else if (depth <75.1, color = 'red');
        
        markers.push(
            L.circle(latlng, {
                stroke:false,
                fillOpacity: .5, 
                color: 'white', 
                fillColor: color,
                radius: mag*100
            }).bindPopup('<h3>'+data[i].properties.title + '</h3<hr><p>' + new Date(data[i].properties.time) + '</p>')
        )
    }
var earth = L.marker(markers).addTo('map')

createMap(earth); 

}

function createMap(earth){
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "&<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> & <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 10,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

    var myMap = L.map('map', {
        center: [37.09, -95.71], 
        zoom:4, 
        layers: [streetsmap, earth]
    });

streetmap.addTo(myMap);

}