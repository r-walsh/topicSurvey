var app = angular.module('topicSurvey');

app.controller('adminCtrl', function($scope, $location, homeService) {

	$scope.adminRedirect = function(location) {
		$location.url(location);
	}

	$scope.answerContainer = [''];
	$scope.varNameContainer = [''];

	$scope.addNewInput = function( array ) {
        array.push("");
	};

	$scope.removeInput = function(index, array) {
		array.splice(index, 1);
	}

	$scope.addQuestion = function() {
		$scope.questions.push({
			titleText: '',
			helpText: '',
			answers: [''],
			questionType: ''
		})
	}

	$scope.postSurveyTemplate = function(name, description, questions, varNames) {
		homeService.postSurveyTemplate(name, description, questions, varNames);
	}

	$scope.questions = [{
		titleText: '',
		helpText: '',
		answers: [''],
		questionType: ''
	}]

});