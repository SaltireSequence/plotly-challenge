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
  updatePie(sample);
  updateBubbleChart(sample);
  updatedMetadata(sample);
};


optionChanged("970");
