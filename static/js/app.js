function renderPlots(id) {
    d3.json("samples.json").then (sampledata =>{
        var ids = sampledata.samples[0].otu_ids;
        var datasamples =  sampledata.samples[0].sample_values.slice(0,10).reverse();
        var datalabels =  sampledata.samples[0].otu_labels.slice(0,10);
        var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        var OTU_id = OTU_top.map(d => "OTU " + d);
        var datalabels =  sampledata.samples[0].otu_labels.slice(0,10);
        var trace1 = {
            x: datasamples,
            y: OTU_id,
            text: datalabels,
            marker: {
            color: 'blue'},
            type:"bar",
            orientation: "h",
        };
        var data1 = [trace1];

        var bar_layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

    Plotly.newPlot("bar", data1, bar_layout);
        var trace2 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text:  sampledata.samples[0].otu_labels

        };

        var bubble_layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        var data2 = [trace2];

    Plotly.newPlot("bubble", data2, bubble_layout);
    // var gauge_data = [
    //     {
    //         domain: { x: [0, 1], y: [0, 1] },
    //         value: 270,
    //         title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
    //         type: "indicator",
    //         mode: "gauge+number",
    //         gauge: {
    //             axis: { range: [null, 9] } ,
    //             steps: [
    //                 { range: [0, 1], color: "#ebeedc" },
    //                 { range: [1, 2], color: "#d7ebb9"},
    //                 { range: [2, 3], color: "#b6dfa8" },
    //                 { range: [3, 4], color:  "#a1db9a" },
    //                 { range: [4, 5], color: "#8dd59f" },
    //                 { range: [5, 6], color:  "#7ecdae" },
    //                 { range: [6, 7], color:  "#62c19a" },
    //                 { range: [7, 8], color:  "#3dbd88" },
    //                 { range: [8, 9], color:  "#25a16e" },
    //             ]}
    //     }
    // ];
    //
    // var gauge_layout = {
    //     width: 600, height: 300, margin: { t: 0, b: 0 },
    //  };
    // Plotly.newPlot("gauge", gauge_data, gauge_layout);

    });
}



function getData(id) {
    d3.json("samples.json").then((data1)=> {
        var metadata = data1.metadata;
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");
        Object.entries(result).forEach((key) => {
          demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function eventChange(id) {
    renderPlots(id);
    getData(id);
}

function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((data1)=> {
        console.log(data1)
        data1.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        renderPlots(data1.names[0]);
        getData(data1.names[0]);
    });
}

init();
