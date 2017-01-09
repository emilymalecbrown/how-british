app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('result', {
    url: '/result',
    templateUrl: './browser/result.html',
    params: {
      percentage: null,
      language: null,
      message: null,
      text: null,
      hitWords: null,
      americanWords: null,
      britishWords: null
    },
    controller: 'ResultsController'
  });
});

app.filter('highlight', function($sce) {
  return function(str, termsToHighlight) {
    // Sort terms by length
    termsToHighlight.sort(function(a, b) {
      return b.length - a.length;
    });
    // Regex to simultaneously replace terms
    var regex = new RegExp('(' + termsToHighlight.join('|') + ')', 'g');
    return $sce.trustAsHtml(str.replace(regex, '<span class="match">$&</span>'));
  };
});

app.controller('ResultsController', function($stateParams, $scope, AnalyzerFactory, $state){
  $scope.hitWords = $stateParams.hitWords;
  $scope.percentage = $stateParams.percentage;
  $scope.language = $stateParams.language;
  $scope.message = $stateParams.message;
  $scope.text = $stateParams.text;
  var britishWords = $stateParams.britishWords;
  var americanWords = $stateParams.americanWords;

  // Use levenshtein's algorithm to find closest word in opposed lang and replace

  // Copyright (c) 2011 Andrei Mackenzie
  // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  // The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  function levenshteinDistance (a, b) {
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
          Math.min(matrix[i][j-1] + 1, // insertion
          matrix[i-1][j] + 1)); // deletion
        }
      }
    }

    return matrix[b.length][a.length];
  }

  $scope.convertToUS = function() {
    var newText = $scope.text;
    // outer loop to loop through all british words that need replacing
    for (var i=0; i<$scope.hitWords.length; i++) {
      var index;
      var min = 100;
      //calculate levenshtein distance between hit words and american english words to find replacement
      for (var j=0; j<americanWords.length; j++) {
        if (levenshteinDistance($scope.hitWords[i], americanWords[j]) < min) {
          min = levenshteinDistance($scope.hitWords[i], americanWords[j]);
          index = j;
        }
      }
      newText = newText.replace($scope.hitWords[i], americanWords[index]);
    }
    $state.go('converted', {convertedText: newText});
  };


  $scope.convertToUK = function() {
    var newText = $scope.text;
    // outer loop to loop through all british words that need replacing
    for (var i=0; i<$scope.hitWords.length; i++) {
      var index;
      var min = 100;
      //calculate levenshtein distance between hit words and american english words to find replacement
      for (var j=0; j<britishWords.length; j++) {
        if (levenshteinDistance($scope.hitWords[i], britishWords[j]) < min) {
          min = levenshteinDistance($scope.hitWords[i], britishWords[j]);
          index = j;
        }
      }
      newText = newText.replace($scope.hitWords[i], britishWords[index]);
    }
    $state.go('converted', {convertedText: newText});
  };

});
