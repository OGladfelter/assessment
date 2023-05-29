# PingThings Assessment

## Data

Sensor data is <a href="https://www.kaggle.com/datasets/jeanmidev/smart-meters-in-london?select=darksky_parameters_documentation.html">smart meter data</a> from the London area downloaded from Kaggle.

GPS coordinates are borrowed from <a href="https://www.kaggle.com/datasets/chicago/chicago-energy-usage-2010">Chicago Energy Usage 2010</a>, also downloaded from Kaggle. The Chicago Energy Usage data has no relation to the London area smart meter data and was used only to collect a list of valid GPS coordinates in the Chicago area.

## Javascript

`script.js` contains all Leaflet and D3 code to power the map and visualizations. 

`BigImage.js` powers the screenshot feature and is authored by Vasyl Pasichnyk.

## Next steps

1. The sensor dataset contains thousands of smart meters, yet I only used a fraction of the dataset. The Chicago library dataset from which I was borrowing GPS coordinates only included 81 libraries, so I associated the GPS coordinates from this dataset with 81 of the sensors in the London smart meter dataset, and discarded the rest. A future iteration of this project could iterate on GPS coordinate generation and utilize a greater portion of the London smart meter dataset. 

2. I took plenty of shortcuts on design choices. For example, the circles - which represent sensors - have a fixed radius. I chose a number which is reasonably-sized both when the map is zoomed far out and far in, however a better solution would be to dynamically resize circles: when the map is zoomed far in, they should be small and precise; when the map iz zoomed far out, they should be large enough to still stand out.
