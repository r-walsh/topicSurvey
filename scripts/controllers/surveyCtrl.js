var app = angular.module('topicSurvey');

app.controller('surveyCtrl', function($scope, homeService, openSurveyService, $location) {

	$scope.openSurveys = openSurveyService.findOpenSurveys();
	
	$scope.changeSelectedSurvey = function( survey ) {
		openSurveyService.changeSelectedSurvey( survey )
	}

	$scope.getSelectedSurvey = function() {
		return JSON.parse(localStorage.getItem('selectedSurvey'));
	}

	$scope.postResponse = function() {
		openSurveyService.postCompletedSurvey( $scope.response, $scope.selectedSurvey );

		$location.url('/open-surveys');
	}

	$scope.selectedSurvey = $scope.getSelectedSurvey();


	$scope.formlyData = openSurveyService.parseToFormlyData( $scope.selectedSurvey )

	$scope.response = {};

})