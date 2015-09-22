var app = angular.module('topicSurvey');

app.service('homeService', function( $http, connectionInfo ) {

	this.getRecipientGroups = function() {
		return $http.get(connectionInfo.url + '/api/recipientGroups');
	}

	this.getSurveyTemplates = function() {
		return $http.get(connectionInfo.url + '/api/surveyTemplates');
	}

	this.getTopics = function() {
		return $http.get(connectionInfo.url + '/api/topic')
	}

	this.getParsedSurveys = function() {
		return $http.get(connectionInfo.url + '/api/parsedSurveys')
	}

});

