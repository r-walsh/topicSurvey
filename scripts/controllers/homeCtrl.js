var app = angular.module('topicSurvey');

app.controller('homeCtrl', function($scope, $location, $http, homeService, fakeAuthService) {

	$scope.login = function(email, password) {
		if (email === 'ryan@test.com' && password === 'guest') {
			$location.url('/admin');
		} else {
			fakeAuthService.setCurrentUser(email);
			$location.url('/open-surveys')
		}
	}

});