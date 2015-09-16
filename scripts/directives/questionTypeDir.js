var app = angular.module('topicSurvey');

app.directive('questionType', function() {
	return {
		restrict: 'E',
		scope: {
			question: '='
		},

		templateUrl: '../templates/questionTypeTmpl.html'
	}
});