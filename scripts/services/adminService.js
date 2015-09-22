var app = angular.module('topicSurvey');

app.service('adminService', function( $http, topicService, surveyService, subjectService, connectionInfo ) {

	////////SURVEYS

	this.postSurveyTemplate = function( name, description, questions, varNames ) {

		var newSurvey = new surveyService.SurveyTemplate( name, description, questions, varNames );

		$http.post(connectionInfo.url + '/api/surveyTemplates', newSurvey)
			.then(function(response) {
				console.log(response);
			})
	}

	this.postParsedSurvey = function( parsedSurvey ) {
		console.log(parsedSurvey)
		$http.post(connectionInfo.url + '/api/parsedSurveys', parsedSurvey)
			.then(function(response) {
				console.log(response);
			})
	}

	this.parseSurvey = function( topicId, topicName, name, description, subject, questions, parseObject ) {

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

		var newParsedSurvey = new surveyService.ParsedSurveyTemplate( topicId, topicName, name, description, subject, questions );

		return newParsedSurvey;
	}

	this.findQuestions = function( results, surveys ) {

		var resultIds = Object.keys(results[0]);
		
		for (var i = 0; i < surveys.length; i++) {

			if (resultIds.indexOf(surveys[i].questions[0]._id) !== -1) {

				var questions = surveys[i].questions;

				var resultMap = questions.reduce(function( map, question ) {
			        if( !map[ question._id ] ) {
			                map[ question._id ] = { question: question.titleText, answers: [] };
			        }
		 
		        return map;
				}, {});
			 
				results.forEach(function( result ) {
				        for( var questionId in result ) {
			                resultMap[ questionId ].answers.push( result[ questionId ] );
				        }
				});
				 
				var grouped = Object.keys( resultMap ).map(function( key ) {
				        return resultMap[ key ];
				});
			}

		}
		return grouped;
	}

	/////////GROUPS

	this.postNewGroup = function( group ) {

		$http.post(connectionInfo.url + '/api/recipientGroups', group)
			.then(function(response) {
				console.log(response);
			})
	}

	//////////TOPICS

	this.postNewTopic = function( topicName, subjectName, date, recipientGroup ) {

		var newTopic = new topicService.TopicTemplate(topicName, subjectName, date, recipientGroup);

		$http.post(connectionInfo.url + '/api/topic', newTopic)
			.then(function(response) {
				console.log(response);
			})
	}

	this.addToExistingTopic = function( topic, subjectName, date, recipientGroup ) {

		var updatedTopic = new subjectService.SubjectTemplate(topic, subjectName, date, recipientGroup);

		console.log(updatedTopic);

		$http.put(connectionInfo.url + '/api/topic?id=' + topic._id, updatedTopic)
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




