app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('result', {
    url: '/result',
    templateUrl: './browser/result.html',
    params: {
      percentage: null,
      language: null,
      message: null
    },
    controller: 'ResultsController'
  });
});

app.controller('ResultsController', function($stateParams, $scope){
  $scope.percentage = $stateParams.percentage;
  $scope.language = $stateParams.language;
  $scope.message = $stateParams.message;
});