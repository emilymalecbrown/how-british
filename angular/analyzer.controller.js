app.controller('AnalyzerController', function($scope, AnalyzerFactory) {

  $scope.britishWords;
  $scope.americanWords;

  AnalyzerFactory.getBritishWords()
  .then((response) => {
    $scope.britishWords = response.words;
  });

  AnalyzerFactory.getAmericanWords()
  .then((response) => {
    $scope.americanWords = response.words;
  });


  $scope.analyzeText = function() {
    var britCount = 0;
    var americanCount = 0;
    var words = $scope.text.split(" ");
    console.log(words)
    for (var i=0; i<words.length; i++) {
      if ($scope.britishWords.indexOf(words[i]) > -1) {
        britCount++;
      } else if ($scope.americanWords.indexOf(words[i]) > -1) {
        americanCount++;
      }
    }
    $scope.lean = Math.max(britCount, americanCount);
    console.log('american' + americanCount + 'british' + britCount)
  };

});
