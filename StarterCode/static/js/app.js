function SampleNames(){
  var selector = document.getElementById('selDataset');
      var url = "/names";
      Plotly.d3.json(url, function(error, response) {
          if (error) return console.warn(error);
          var data = response;
          data.map(function(sample){
              var option = document.createElement('option')
              option.text = sample
              option.value = sample
              selector.appendChild(option)
          });
      });
  };

SampleNames();

function ChangedOptions(sample){
  updateBar(sample);
  updateBubbleChart(sample);
  updatedMetadata(sample);
};

function updateBar(sample){
  var sampleURL = '/samples/${sample}'
  Plotly.d3.json(sampleURL)
  if (error) return console.log(error);
        var labels = []
        var values = []
        var hovers = []
        for(i=0; i<10; i++){
            var label = response[0].otu_ids[i];
            labels.push(label);
            var value = response[1].sample_values[i];
            values.push(value);
            var hover = response[2][label - 1];
            hovers.push(hover);
        };
}


optionChanged("970");
