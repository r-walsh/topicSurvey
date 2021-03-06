var app = angular.module('topicSurvey', ['ngRoute', 'ui.bootstrap', 'formly', 'formlyBootstrap']);

app.constant('connectionInfo', {
	url: 'http://0.0.0.0:8000'
})

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
	.when('/open-surveys/:sessionId', {
		templateUrl: '../templates/takeSurveyTmpl.html',
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
	.when('/admin/create-group', {
		templateUrl: '../templates/createGroupTmpl.html',
		controller: 'adminCtrl'
	})
	.when('/admin/view-results', {
		templateUrl: '../templates/viewResultsTmpl.html',
		controller: 'adminCtrl'
	})
	.when('/admin/send-survey', {
		templateUrl: '../templates/sendSurveyTmpl.html',
		controller: 'adminCtrl'
	})
	.when('/admin/create-topic', {
		templateUrl: '../templates/createTopicTmpl.html',
		controller: 'adminCtrl'
	})
})