app.factory('AnalyzerFactory', function($http){
  var AnalyzerFactory = {};

  AnalyzerFactory.getBritishWords = function() {
    return $http.get('/api/words/british')
    .then((response) => {
      return response.data;
    });
  };

  AnalyzerFactory.getAmericanWords = function() {
    return $http.get('/api/words/american')
    .then((response) => {
      return response.data;
    });
  };

  return AnalyzerFactory;

});
