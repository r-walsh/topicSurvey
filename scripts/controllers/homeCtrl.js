var app = angular.module('topicSurvey');

app.controller('homeCtrl', function($scope, $location, $http, homeService) {

	$scope.login = function(email, password) {
		if (email === 'ryan@test.com' && password === 'guest') {
			$location.url('/admin');
		} else {
			$location.url('/open-surveys')
		}
	}

	$scope.testGet = function() {
		$http.get('http://0.0.0.0:8000/api/topic').then(function(res) {
			console.log(res.data);
		})
	}

});