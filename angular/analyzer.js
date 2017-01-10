app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('', '/');
  $stateProvider.state('main', {
    url: '/',
    templateUrl: './browser/main.html',
    controller: 'AnalyzerController'
  });
});

app.factory('AnalyzerFactory', function($http){
  var AnalyzerFactory = {};

  AnalyzerFactory.getBritishWords = function() {
    return $http.get('/api/words/british')
    .then(function(response) {
      return response.data;
    });
  };

  AnalyzerFactory.getAmericanWords = function() {
    return $http.get('/api/words/american')
    .then(function(response) {
      return response.data;
    });
  };

  return AnalyzerFactory;
});

app.controller('AnalyzerController', function($scope, $state, $stateParams, AnalyzerFactory) {
  var britishWords, americanWords;
  var languageSpecificWords = [];

  AnalyzerFactory.getBritishWords()
  .then(function(response) {
    britishWords = response.words;
  });

  AnalyzerFactory.getAmericanWords()
  .then(function(response) {
    americanWords = response.words;
  });

  $scope.analyzeText = function() {
    var britCount = 0;
    var americanCount = 0;
    var words = $scope.text.split(/\W+/);

    for (var i=0; i<words.length; i++) {
      if (britishWords.indexOf(words[i].toLowerCase()) > -1 && words[i] !== "") {
        languageSpecificWords.push(words[i]);
        britCount++;
      } else if (americanWords.indexOf(words[i].toLowerCase()) > -1 && words[i] !== "") {
        languageSpecificWords.push(words[i]);
        americanCount++;
      }
    }

    $scope.language = britCount > americanCount ? 'British' : 'American';
    if (britCount > americanCount && americanCount > 0) {
      $scope.percentage = britCount/(americanCount+britCount)*100 + '%';
    } else if (britCount < americanCount && britCount > 0) {
      $scope.percentage = britCount/(americanCount+britCount)*100 + '%';
    } else if (britCount > 0 && americanCount === 0 || americanCount > 0 && britCount === 0) {
      $scope.percentage = '100%';
    } else {
      $scope.ambiguous = "This text is confusing! It's either British or American. Maybe Canadian?";
    }

    // go to results page with variables we need
    $state.go('result', {
      text: $scope.text,
      percentage: $scope.percentage,
      language: $scope.language,
      message: $scope.ambiguous,
      americanWords: americanWords,
      britishWords: britishWords,
      hitWords: languageSpecificWords,
    });
  };

});
