var app = angular.module('topicSurvey', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '../templates/landingPageTmpl.html',
		controller: 'homeCtrl'
	})
	.when('/open-surveys', {
		templateUrl: '../templates/openSurveysTmpl.html',
		controller: 'surveyCtrl'
	})
	.when('/admin', {
		templateUrl: '../templates/adminTmpl.html',
		controller: 'adminCtrl'
	})
	.when('/admin/create-template', {
		templateUrl: '../templates/createSurveyTmpl.html',
		controller: 'adminCtrl'
	})
})