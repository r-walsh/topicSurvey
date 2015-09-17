var app = angular.module('topicSurvey');

app.directive('questionType', function() {
	return {
		restrict: 'E',

		templateUrl: '../templates/questionTypeTmpl.html'
	}
});