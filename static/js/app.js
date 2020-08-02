function renderPlots(id){
    d3.json("samples.json").then (sampledata =>{
      var ids = sampledata.samples[0].otu_ids;
      var datasamples = sampledata.samples[0].sample_values.slice(0,10).reverse();
      var datalabels =  sampledata.samples[0].otu_labels.slice(0,10);
      var otu_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
      var otu_ids = otu_top.map(d => "OTU " + d);
      // var datalabels =  sampledata.samples[0].otu_labels.slice(0,10);
      var trace1 = {
        x: datasamples,
        y: OTU_id,
        marker: {
        color: 'blue'},
        type:"bar",
        orientation: "h",
        text: datalabels,
      };
      var data1 = [trace1];

      var plotLayout1 = {
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

    Plotly.newPlot("bar", data1, plotLayout1);
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
      var plotLayout2 = {
          xaxis:{title: "OTU ID"},
          height: 600,
          width: 1000
      };

      var data1 = [trace2];
