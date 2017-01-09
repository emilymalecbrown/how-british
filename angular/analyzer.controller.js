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
    $scope.languageSpecificWords = [];

    for (var i=0; i<words.length; i++) {
      if ($scope.britishWords.indexOf(words[i]) > -1) {
        $scope.languageSpecificWords.push(words[i]);
        britCount++;
      } else if ($scope.americanWords.indexOf(words[i]) > -1) {
        $scope.languageSpecificWords.push(words[i]);
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
      $scope.ambiguous = "This text is confusing! It's either British or American. Maybe Canadian?";
    }
    $state.go('result', {text: $scope.text, hitWords: $scope.languageSpecificWords, percentage: $scope.percentage, language: $scope.language, message: $scope.ambiguous});
  };

});
