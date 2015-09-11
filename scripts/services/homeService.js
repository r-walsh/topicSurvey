var app = angular.module('topicSurvey');

app.service('homeService', function($http) {

	
	this.postSurveyTemplate = function(name, description, questions, varNames) {

		var newSurvey = new SurveyTemplate(name, description, questions, varNames);

		$http.post('http://0.0.0.0:8000/api/surveyTemplates', newSurvey)
			.then(function(response) {
				console.log(response);
			})
	}

	this.postNewGroup = function(group) {
		group.users.splice(group.users.length - 1, 1)

		$http.post('http://0.0.0.0:8000/api/recipientGroups', group)
			.then(function(response) {
				console.log(response);
			})
	}

});

SurveyTemplate = function(name, description, questions, varNames) {
	this.name = name;
	this.description = description;
	this.questions = questions;
	this.varNames = varNames;
}