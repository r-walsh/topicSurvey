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
	
	this.postSurveyTemplate = function(name, description, questions, varNames) {

		var newSurvey = new SurveyTemplate(name, description, questions, varNames);

		$http.post('http://0.0.0.0:8000/api/surveyTemplates', newSurvey)
			.then(function(response) {
				console.log(response);
			})
	}

	this.postNewGroup = function(group) {

		$http.post('http://0.0.0.0:8000/api/recipientGroups', group)
			.then(function(response) {
				console.log(response);
			})
	}

	this.postNewTopic = function(topicName, subjectName, date, recipientGroup) {

		var newTopic = new TopicTemplate(topicName, subjectName, date, recipientGroup);

		console.log(newTopic);

		$http.post('http://0.0.0.0:8000/api/topic', newTopic)
			.then(function(response) {
				console.log(response);
			})
	}

	this.addToExistingTopic = function(topicId, subjectName, date, recipientGroup) {

		var updatedTopic = new SubjectTemplate(subjectName, date, recipientGroup);

		$http.put('http://0.0.0.0:8000/api/topic?id=' + topicId, updatedTopic)
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

TopicTemplate = function(topicName, subjectName, date, recipientGroup) {
	this.topicName = topicName;
	this.subjects = [{
		subjectName: subjectName,
		date: new Date(date),
		recipientGroup: recipientGroup,
		results: []
	}]
}

SubjectTemplate = function(subjectName, date, recipientGroup) {
	this.subjectName = subjectName;
	this.date = new Date(date);
	this.recipientGroup = recipientGroup;
	this.results = [];
}