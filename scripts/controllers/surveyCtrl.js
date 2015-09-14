var app = angular.module('topicSurvey');

app.controller('surveyCtrl', function($scope, homeService) {

	$scope.getSurveys = function( user ) {
		homeService.getSurveyTemplates()
			.then(function( res ) {
				$scope.surveys = res.data;
			})
	}()
	
})