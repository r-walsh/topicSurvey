var app = angular.module('topicSurvey');

app.service('adminService', function( $http, topicService, surveyService, subjectService ) {

	////////SURVEYS

	this.postSurveyTemplate = function( name, description, questions, varNames ) {

		var newSurvey = new surveyService.SurveyTemplate( name, description, questions, varNames );

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

		var newParsedSurvey = new surveyService.ParsedSurveyTemplate(name, description, subject, questions);

		return newParsedSurvey;
	}

	/////////GROUPS

	this.postNewGroup = function( group ) {

		$http.post('http://0.0.0.0:8000/api/recipientGroups', group)
			.then(function(response) {
				console.log(response);
			})
	}

	//////////TOPICS

	this.postNewTopic = function( topicName, subjectName, date, recipientGroup ) {

		var newTopic = new topicService.TopicTemplate(topicName, subjectName, date, recipientGroup);

		$http.post('http://0.0.0.0:8000/api/topic', newTopic)
			.then(function(response) {
				console.log(response);
			})
	}

	this.addToExistingTopic = function( topic, subjectName, date, recipientGroup ) {

		var updatedTopic = new subjectService.SubjectTemplate(topic, subjectName, date, recipientGroup);

		console.log(updatedTopic);

		$http.put('http://0.0.0.0:8000/api/topic?id=' + topic._id, updatedTopic)
			.then(function(response) {
				console.log(response);
			})
	}

	///////GENERAL

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




