app.controller('playCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.playing = false;

    $scope.control = function(control) {
        $http.get('/api/' + control)
        .then(function(response) {
          console.log('yes');
          if(control == 'play' || control == 'pause') {
            $scope.playing = !$scope.playing;
          }
        }, function(err) {
          console.log(err);
        });
    };
}]);