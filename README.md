# PingThings Assessment

## Data

`libraries.csv` is provided by the city of Chicago and available on <a target="_blank" href="https://www.kaggle.com/datasets/onlyrohit/chicago-public-libraries">Kaggle</a>. Used for a list of valid GPS coordinates in the Chicago area.

`meta_data.csv` and `sensor_data_with_loc.csv` are the output of `data-exploration-and-generation.ipynb`, which subsets `daily_dataset.csv` and adds GPS coordinates sourced from `libraries.csv`.  

Note: `daily_dataset.csv` is not included in this repo due to its large size, but can be downloaded on <a target="_blank" href="https://www.kaggle.com/datasets/jeanmidev/smart-meters-in-london?select=darksky_parameters_documentation.html">Kaggle</a>. The sensor data is smart meter data from the London area.

## Javascript

`script.js` contains all Leaflet and D3 code to power the map and visualizations. 

`BigImage.js` powers the screenshot feature and is authored by Vasyl Pasichnyk.

## Next steps

1. The sensor dataset contains thousands of smart meters, yet I only used a fraction of the dataset. The Chicago library dataset from which I was borrowing GPS coordinates only included 81 libraries, so I associated the GPS coordinates from this dataset with 81 of the sensors in the London smart meter dataset, and discarded the rest. A future iteration of this project could iterate on GPS coordinate generation and utilize a greater portion of the London smart meter dataset. 

2. I took plenty of shortcuts on design choices. For example, the circles - which represent sensors - have a fixed radius. I chose a number which is reasonably-sized both when the map is zoomed far out and far in, however a better solution would be to dynamically resize circles: when the map is zoomed far in, they should be small and precise; when the map iz zoomed far out, they should be large enough to still stand out.

3. Add unit tests!

4. When a user mouses from one sensor on the map to another, the corresponding line chart should update with a nice transition, rather than simply destroy the old line chart and recreate a new one. I use line chart transitions <a target="_blank" href="https://cultureplot.com/mileage-goal/">here</a> (increase the mileage goal to witness).

5. The Javascript logic for filtering the sensor objects on the map is a bit wonky. Would definitely need to be refactored, depending on how a client or user would want to filter by tags (and the combination of multiple tags, to be exact).