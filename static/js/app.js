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
  var data = [trace1];
  })
}
