var app = angular.module('topicSurvey');

app.service('homeService', function($http) {

	this.getRecipientGroups = function() {
		return $http.get('http://0.0.0.0:8000/api/recipientGroups');
	}

	this.getSurveyTemplates = function() {
		return $http.get('http://0.0.0.0:8000/api/surveyTemplates');
	}

	this.getTopics = function() {
		return $http.get('http://0.0.0.0:8000/api/topic')
	}

});

