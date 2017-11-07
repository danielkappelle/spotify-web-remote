app.controller('playCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.control = function(control) {
        $http.get('/api/' + control)
        .then(function(response) {
          console.log('yes');
        }, function(err) {
          console.log(err);
        });
    };
}]);