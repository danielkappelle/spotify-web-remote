app.controller('playCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.playing = false;
    $scope.song = {};
    refreshRate = 1000; // Milliseconds of refresh time

    /**
     * Control the playback, sends an API call
     * @param {String} control - The type of control (gets passed
     * directly to the API), play/pause/next/prev
     */
    $scope.control = function(control) {
        $http.get('/api/control/' + control)
        .then(function(response) {
          if(control == 'play' || control == 'pause') {
            $scope.playing = !$scope.playing;
          }
        }, function(err) {
          console.log(err);
        });
    };

    /**
     * Update the current playing info
     */
    $scope.updateInfo = function() {
      $http.get('/api/currentSong')
      .then(function(response) {
        $scope.playing = response.data.body.is_playing;
        $scope.song.artist = "";
        var artists = response.data.body.item.artists;
        for(i = 0; i < artists.length; i++) {
          $scope.song.artist += artists[i].name;
          if(artists.length - i == 2) {
            $scope.song.artist += " and ";
          } else if(artists.length - i > 2) {
            $scope.song.artist += ", ";
          }
        }
        $scope.song.title = response.data.body.item.name;
        $scope.song.image = response.data.body.item.album.images[0].url;
      }, function(err) {
        console.log(err);
      });
    };

    /**
     * Set the update interval (polling)
     */
    setInterval($scope.updateInfo, refreshRate);
}]);