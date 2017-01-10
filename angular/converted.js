app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('converted', {
    url: '/converted',
    params: {
      convertedText: null
    },
    templateUrl: './browser/convert.html',
    controller: 'ConvertedTextController'
  });
});

app.controller('ConvertedTextController', function($scope, $state, $stateParams) {

  $scope.convertedText = $stateParams.convertedText;
  $scope.goHome = function() {
    $state.go('main', {}, { reload: true });
  };

});
