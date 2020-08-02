function renderPlots(id){
  d3.json("samples.json").then (sampledata =>{
    var ids = sampledata.samples[0].otu_ids;
    var datasamples = sampleData.samples[0].sample_values.slice(0,10).reverse();
    var datalabels =  sampledata.samples[0].otu_labels.slice(0,10);
    var OTUtop = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
    var OTU_id = OTU_top.map(d => "OTU " + d);
  })
}
