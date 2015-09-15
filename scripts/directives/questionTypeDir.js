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

// link: function(scope, elem, attrs) {
// 	if (scope.question.questionType === 'multiple-choice') {
// 		return '<input ng-repeat="answer in question.answers" type="radio">';
// 	} else if (scope.question.questionType === 'select-many') {
// 		return '<input ng-repeat="answer in question.answers" type="checkbox">';
// 	} else if (scope.question.questionType === 'text') {
// 		return '<input ng-repeat="answer in question.answers" type="text">';
// 	}
// }