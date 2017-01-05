var analyzer = angular.module('analyzer', [])
  .controller('AnalyzerController', function($scope) {
    $scope.douglas = "I love douglas"
    var britishWords = ['analyse'];
    $scope.analyzeText = function(text) {
      console.log('here')
      if (britishWords.indexOf(text) > -1) {
        $scope.british = true;
      }
    };
});
