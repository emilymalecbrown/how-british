app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('result', {
    url: '/result',
    templateUrl: './browser/result.html',
    params: {
      percentage: null,
      language: null,
      message: null,
      text: null,
      hitWords: null
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

app.controller('ResultsController', function($stateParams, $scope){
  console.log($stateParams)
  $scope.hitWords = $stateParams.hitWords;
  $scope.percentage = $stateParams.percentage;
  $scope.language = $stateParams.language;
  $scope.message = $stateParams.message;
  $scope.text = $stateParams.text;
});
