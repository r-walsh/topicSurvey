var app = angular.module('topicSurvey');

app.service('adminService', function( $http ) {

	this.postSurveyTemplate = function( name, description, questions, varNames ) {

		var newSurvey = new SurveyTemplate( name, description, questions, varNames );

		$http.post('http://0.0.0.0:8000/api/surveyTemplates', newSurvey)
			.then(function(response) {
				console.log(response);
			})
	}

	this.postNewGroup = function( group ) {

		$http.post('http://0.0.0.0:8000/api/recipientGroups', group)
			.then(function(response) {
				console.log(response);
			})
	}

	this.postNewTopic = function( topicName, subjectName, date, recipientGroup ) {

		var newTopic = new TopicTemplate(topicName, subjectName, date, recipientGroup);

		$http.post('http://0.0.0.0:8000/api/topic', newTopic)
			.then(function(response) {
				console.log(response);
			})
	}

	this.addToExistingTopic = function( topic, subjectName, date, recipientGroup ) {

		var updatedTopic = new SubjectTemplate(topic, subjectName, date, recipientGroup);

		console.log(updatedTopic);

		$http.put('http://0.0.0.0:8000/api/topic?id=' + topic._id, updatedTopic)
			.then(function(response) {
				console.log(response);
			})
	}

	this.addNewInput = function( array ) {
        array.push("");
	}

	this.removeInput = function( index, array ) {
		array.splice(index, 1);
	}

	this.addQuestion = function( array ) {
		array.push({
			titleText: '',
			helpText: '',
			answers: [''],
			questionType: ''
		})
	}

});

SurveyTemplate = function( name, description, questions, varNames ) {
	this.name = name;
	this.description = description;
	this.questions = questions;
	this.varNames = varNames;
}

TopicTemplate = function( topicName, subjectName, date, recipientGroup ) {
	this.topicName = topicName;
	this.subjects = new SubjectTemplate(this, subjectName, date, recipientGroup);
}

SubjectTemplate = function( topic, subjectName, date, recipientGroup ) {
	this.subjectName = subjectName;
	this.date = new Date(date);
	this.recipientGroup = recipientGroup;
	this.sessionId = generateSessionId(topic, this.subjectName, date);
	this.results = [];
}

function generateSessionId( topic, subjectName, date ) {
	var sessionId = '',
		nameSplit = topic.topicName.split(' ');

	for (var i = 0; i < nameSplit.length; i++) {
		nameSplit[i].split('');

		sessionId += nameSplit[i][0];
	}

	var lectureDate = new Date(date),
		lectureDay = lectureDate.getDate(),
		lectureMonth = lectureDate.getMonth();

	sessionId += lectureMonth;
	sessionId += lectureDay;

	return sessionId;
}
