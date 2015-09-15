var app = angular.module('topicSurvey');

app.service('adminService', function( $http ) {

	this.postSurveyTemplate = function( name, description, questions, varNames ) {

		var newSurvey = new SurveyTemplate( name, description, questions, varNames );

		$http.post('http://0.0.0.0:8000/api/surveyTemplates', newSurvey)
			.then(function(response) {
				console.log(response);
			})
	}

	this.parseSurvey = function( name, description, subject, questions, parseObject ) {

		function stringParser(match) {
			return parseObject[match];
		}

		for (var i = 0; i < questions.length; i++) {
			for (var key in questions[i]) {
				if ( Array.isArray(questions[i][key]) ) {
					for (var j = 0; j < questions[i][key].length; j++) {
						questions[i][key][j] = questions[i][key][j].replace(/\$\$.*?\$\$/g, stringParser)
					}
				} else {
					questions[i][key] = questions[i][key].replace(/\$\$.*?\$\$/g, stringParser)
				}
			}
		}

		description = description.replace(/\$\$.*?\$\$/g, stringParser);

		var newParsedSurvey = new ParsedSurveyTemplate(name, description, subject, questions);

		return newParsedSurvey;
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

ParsedSurveyTemplate = function( name, description, subject, questions ) {
	this.publicName = name;
	this.description = description;
	this.subject = subject;
	this.questions = questions;
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
		lectureMonth = lectureDate.getMonth(),
		lectureYear = lectureDate.getFullYear();

	sessionId += lectureMonth;
	sessionId += lectureDay;
	sessionId += lectureYear;

	return sessionId;
}




