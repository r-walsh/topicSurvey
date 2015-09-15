var app = angular.module('topicSurvey');

app.directive('questionType', function() {
	return {
		restrict: 'E',
		scope: {
			question: '='
		},

		template: '<input name="question.titleText" ng-repeat="answer in question.answers" ng-if="question.questionType === \'multiple-choice\'" type="radio"><input name="question.titleText" ng-if="question.questionType === \'select-many\'" ng-repeat="answer in question.answers" type="checkbox"><input name="titleText" ng-if="question.questionType === \'text\'" ng-repeat="answer in question.answers" type="text">'
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