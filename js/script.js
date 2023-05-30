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

    d3.csv("data/sensor_data_with_loc.csv").then(function(sensors) {
        // Get the data
        d3.csv("data/meta_data.csv").then(function(data) {
            data.forEach(function(d) {
                d.lat = +d.lat;
                d.lon = +d.lon;

                // add marker to map
                L.circle([d.lat, d.lon], {radius: 50}).addTo(map)
                .bindTooltip('Sensor: ' + d.LCLid, {sticky: true})
                .addEventListener('mouseover', drawLinechart.bind(null, sensors.filter(s => s.LCLid == d.LCLid)), false)
                .addEventListener('click', openModal.bind(null, d.LCLid, d.tags), false);
            });
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
    });
    document.getElementById("lightMapButton").addEventListener("click", function() { 
        // add leaflet map tiles
        map.removeLayer(mapTilesDark);
        map.removeLayer(mapTilesTerrain);
        map.addLayer(mapTilesLight);
    });
    document.getElementById("darkMapButton").addEventListener("click", function() { 
        // add leaflet map tiles
        map.removeLayer(mapTilesLight);
        map.removeLayer(mapTilesTerrain);
        map.addLayer(mapTilesDark);
    });
    document.getElementById("terrainMapButton").addEventListener("click", function() { 
        // add leaflet map tiles
        map.removeLayer(mapTilesLight);
        map.removeLayer(mapTilesDark);
        map.addLayer(mapTilesTerrain);
    });
}

function drawLinechart(data, event) {
    document.getElementById("lineChart").style.display = 'block';
    d3.select("#lineChart").select("svg").remove();

    // set the dimensions and margins of the graph
    let box = document.getElementById('lineChart');
    let width = box.offsetWidth;

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 20, bottom: 30, left: 40};
    width = width - margin.left - margin.right;
    var height = screen.height * .25 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%Y-%m-%d");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.energy_median); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#lineChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    data.forEach(function(d) {
        // format the data
        d.date = parseTime(d.day);
        d.energy_median = +d.energy_median;
    })

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.energy_median; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y).ticks(5));
}

function openModal(id, tags) {
    document.getElementById('updateModal').style.display='block';
    document.getElementById("updateModalHeader").innerHTML = 'Update tags for sensor ' + id;
    document.getElementById("updateModalText").innerHTML = tags;
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

document.getElementById("printModal").addEventListener("click", function() {
    document.getElementById("printModal").style.display = 'none';
});
// normal or high resolution - normal will be faster and smaller file size, but lower quality
document.getElementById("normalResolutionButton").addEventListener("mouseenter", function() {
    document.getElementById("downloadButton1").classList.toggle('rotated');
});
document.getElementById("highResolutionButton").addEventListener("mouseenter", function() {
    document.getElementById("downloadButton2").classList.toggle('rotated');
});

drawHeatmap();