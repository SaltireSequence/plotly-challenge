// function to select data from drop down
var selectDropdown = d3.select("#selDataset");
function addOptions() {
    d3.json("samples.json").then(function(data) {
        data.names.forEach((name, i) => {
            var appendOption = selectDropdown.append("option").text(name).attr('value', i);
        });
    });
}
addOptions();
// This function will present data and laterally optionChange
function show_data(value) {
    d3.json("samples.json").then((importedData) => {

        var data = importedData.samples[value];
        var dataset_samples =data.sample_values;
        var otu_ids = data.otu_ids;
        // top 10 OTU dataset values
        var top10_samples = dataset_samples.slice(0,10);
        var top10_otu_ids = otu_ids.slice(0,10);
        top10_otu_ids_str = top10_otu_ids.map(String)
        for (i = 0; i < 10; i++)
            top10_otu_ids_str[i] = "OTU: " + top10_otu_ids_str[i]


        var input_data = importedData.metadata[value];
        var meta  =  d3.select("#sample-metadata");
        meta.html("");
        meta.append("li").text( `id: ${input_data.id}`);
        meta.append("li").text( `ethinicity: ${input_data.ethnicity}`);
        meta.append("li").text( `gender: ${input_data.gender}`);
        meta.append("li").text( `age: ${input_data.age}`);
        meta.append("li").text( `location: ${input_data.location}`);
        meta.append("li").text( `bbtype: ${input_data.bbtype}`);
        meta.append("li").text( `wfreq: ${input_data.wfreq}`);

// trace for bar chart
        var bar_trace ={
        x: top10_samples,
        y: top10_otu_ids_str,
        text: top10_otu_ids_str,
        type:"bar",
        orientation: "h",
            transforms: [{
              type: 'sort',
              target: 'y',
              order: 'descending'
            }]
        };

        var plot_data = [bar_trace];

        Plotly.newPlot("bar", plot_data);

// trace for bubble_chart
        var bubble_trace = {
            x: otu_ids,
            y: dataset_samples,
            mode: 'markers',
            marker :{
                color: otu_ids,
                size : dataset_samples
            }
        };
        var bubble_data =[bubble_trace];
        Plotly.newPlot('bubble',bubble_data)
        //gauge chart
        var wfreq = input_data.wfreq
        var gauge_data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
                type: "indicator",
                mode: "gauge",
                gauge: {
                    axis: { range: [null, 9] } ,
                    steps: [
                        { range: [0, 1], color: "#f7f2eb" },
                        { range: [1, 2], color: "#f3f0e4"},
                        { range: [2, 3], color: "#e8e6c8" },
                        { range: [3, 4], color:  "#e4e8af" },
                        { range: [4, 5], color: "#d4e494" },
                        { range: [5, 6], color:  "#b6cc8a" },
                        { range: [6, 7], color:  "#86bf7f" },
                        { range: [7, 8], color:  "#84bb8a" },
                        { range: [8, 9], color:  "#7fb485" },
                    ]}
            }
        ];

        var gauge_layout = {
            width: 600, height: 500, margin: { t: 0, b: 0 },
         };
        Plotly.newPlot('gauge', gauge_data, gauge_layout);


    });
};

// present initial data
function init(){
    show_data(20);
}

//showing selected data
d3.selectAll("#selDataset").on("change",optionChanged);

function optionChanged(){
    var dropdownMenu = d3.select("#selDataset");
    var ds_index = dropdownMenu.property("value");
    console.log(ds_index);
        show_data(ds_index);

};

// after refreshing the website, initial data will be shown.
init();
