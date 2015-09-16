var app = angular.module('topicSurvey');

app.directive('navDir', function($location) {
	return {
		restrict: 'E',

		templateUrl: '../../templates/navTmpl.html',
	}
})