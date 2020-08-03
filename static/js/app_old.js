function renderPlots(id) {
    d3.json("samples.json").then (sampledata =>{
      console.log(sampledata)
      var ids = sampledata.samples[0].OTU_id;
      console.log(ids)
      var datasamples = sampledata.samples[0].sample_values.slice(0,10).reverse();
      console.log(datasamples)
      var datalabels =  sampledata.samples[0].otu_labels.slice(0,10);
      console.log (datalabels)
      var OTU_top = ( sampledata.samples[0].OTU_id.slice(0, 10)).reverse();
      var OTU_id = OTU_top.map(d => "OTU " + d);
      console.log(`OTU IDS: ${OTU_id}`)
      var datalabels =  sampledata.samples[0].otu_labels.slice(0,10);
      console.log(`OTU_labels: ${datalabels}`)
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
          x: sampledata.samples[0].OTU_id,
          y: sampledata.samples[0].sample_values,
          mode: "markers",
          marker: {
              size: sampledata.samples[0].sample_values,
              color: sampledata.samples[0].OTU_id
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

    });
}

function displayData(id) {
    d3.json("samples.json").then((data1)=> {
        var metadata = data.metadata;
        console.log(metadata)
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        demographicInfo.html("");

          Object.entries(result).forEach((key) => {
              demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
          });
    });
}
function optionChanged(id) {
    renderPlots(id);
    displayData(id);
}

function init() {
    var dropdownMenu = d3.select("#selDataset");
    d3.json("samples.json").then((data1)=> {
        console.log(data)

      data.names.forEach(function(name) {
          dropdownMenu.append("option").text(name).property("value");
      });

      renderPlots(data1.names[0]);
      displayData(data1.names[0]);
  });
}

init();
