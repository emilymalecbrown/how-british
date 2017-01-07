app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/');
  $stateProvider.state('main', {
    url: '/',
    templateUrl: './browser/main.html',
    controller: 'AnalyzerController'
  });
});

app.controller('AnalyzerController', function($scope, $state, $stateParams, AnalyzerFactory) {
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
    for (var i=0; i<words.length; i++) {
      if ($scope.britishWords.indexOf(words[i]) > -1) {
        britCount++;
      } else if ($scope.americanWords.indexOf(words[i]) > -1) {
        americanCount++;
      }
    }
    $scope.language = britCount > americanCount ? 'British' : 'American';

    if (britCount > americanCount && americanCount > 0) {
      $scope.percentage = britCount/americanCount * 100 + "%";
    } else if (britCount < americanCount && britCount > 0) {
      $scope.percentage = britCount/americanCount * 100 + "%";
    } else if (britCount > 0 && americanCount === 0 || americanCount > 0 && britCount === 0) {
      $scope.percentage = '100%';
    } else {
      $scope.percentage = '50%';
    }
    $state.go('result', {percentage: $scope.percentage, language: $scope.language});
  };

});
