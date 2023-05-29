function drawHeatmap() {

    document.getElementById("menuContainer").style.display = 'block';

    // read map styles
    mapTilesTerrain = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 50,
            continuousWorld: false,
            noWrap: true
    });
    mapTilesLight = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        maxZoom: 28,
        continuousWorld: false,
        noWrap: true
    });
    mapTilesDark = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 28,
        continuousWorld: false,
        noWrap: true
    });

    var map = L.map('map', {minZoom:3, maxZoom:25, maxBoundsViscosity:1});
    map.setMaxBounds([[-90,-180], [90,180]]);
    map.addLayer(mapTilesLight);

    // icon allowing users to download screenshots
    L.control.bigImage().addTo(map);

    // Get the data
    d3.csv("data/meta_data.csv").then(function(data) {
        data.forEach(function(d) {
            d.lat = +d.lat;
            d.lon = +d.lon;

            // add marker to map
            L.circle([d.lat, d.lon], {radius: 50}).addTo(map);
        });
    });

    // center on Chicago
    map.setView([41.8608, -87.6257], 11);

    // customization menu item - click radio buttons to turn map tiles on/off
    document.getElementById("noMapButton").addEventListener("click", function() { 
        // remove leaflet map tiles
        map.removeLayer(mapTilesDark);
        map.removeLayer(mapTilesLight);
        map.removeLayer(mapTilesTerrain);
        document.getElementById("backgroundColorPicker").style.display = "table-row";
    });
    document.getElementById("lightMapButton").addEventListener("click", function() { 
        // add leaflet map tiles
        map.removeLayer(mapTilesDark);
        map.removeLayer(mapTilesTerrain);
        map.addLayer(mapTilesLight);
        document.getElementById("backgroundColorPicker").style.display = "none";
    });
    document.getElementById("darkMapButton").addEventListener("click", function() { 
        // add leaflet map tiles
        map.removeLayer(mapTilesLight);
        map.removeLayer(mapTilesTerrain);
        map.addLayer(mapTilesDark);
        document.getElementById("backgroundColorPicker").style.display = "none";
    });
    document.getElementById("terrainMapButton").addEventListener("click", function() { 
        // add leaflet map tiles
        map.removeLayer(mapTilesLight);
        map.removeLayer(mapTilesDark);
        map.addLayer(mapTilesTerrain);
        document.getElementById("backgroundColorPicker").style.display = "none";
    });
}

// click divs to show / hide menus
document.getElementById("menuHeaderContainer3").addEventListener("click", function() {
    if (document.getElementById("customizeMenuTable").style.display == "table"){
        document.getElementById("customizeMenuTable").style.display = "none";
        document.getElementById("menuButton3").innerHTML = "+";
    }
    else{
       document.getElementById("customizeMenuTable").style.display = "table";
       document.getElementById("menuButton3").innerHTML = "-";
    }
});


// customization menu item - background color
document.getElementById("backgroundColor").addEventListener("input", function() { 
    document.getElementById("map").style.background = this.value;
    document.getElementsByTagName("body")[0].style.backgroundColor = this.value;
});

document.getElementById("printModal").addEventListener("click", function(){
    document.getElementById("printModal").style.display = 'none';
});
// for some fun flair...
document.getElementById("normalResolutionButton").addEventListener("mouseenter", function(){
    document.getElementById("downloadButton1").classList.toggle('rotated');
});
document.getElementById("highResolutionButton").addEventListener("mouseenter", function(){
    document.getElementById("downloadButton2").classList.toggle('rotated');
});

drawHeatmap();