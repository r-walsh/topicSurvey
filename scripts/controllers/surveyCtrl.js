var app = angular.module('topicSurvey');

app.controller('surveyCtrl', function($scope, homeService, openSurveyService) {

	$scope.openSurveys = openSurveyService.findOpenSurveys();
	
	$scope.changeSelectedSurvey = function( survey ) {
		openSurveyService.changeSelectedSurvey( survey )
	}

	$scope.getSelectedSurvey = function() {
		return JSON.parse(localStorage.getItem('selectedSurvey'));
	}

	$scope.testFunc = function() {
		console.log($scope.surveyResponse);
		openSurveyService.postCompletedSurvey($scope.surveyResponse, $scope.selectedSurvey)
	}

	$scope.selectedSurvey = $scope.getSelectedSurvey();

	$scope.surveyResponse = {};
})