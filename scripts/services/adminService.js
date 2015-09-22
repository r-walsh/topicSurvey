var app = angular.module('topicSurvey');

app.service('adminService', function( $http, topicService, surveyService, subjectService, connectionInfo ) {

	////////SURVEYS

	this.postSurveyTemplate = function( name, description, questions, varNames ) {

		var newSurvey = new surveyService.SurveyTemplate( name, description, questions, varNames );

		return $http.post(connectionInfo.url + '/api/surveyTemplates', newSurvey)

	}

	this.postParsedSurvey = function( parsedSurvey ) {
		console.log(parsedSurvey)
		return $http.post(connectionInfo.url + '/api/parsedSurveys', parsedSurvey)
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
		
		for (var i = 0; i < surveys.length; i++) {

			if ( results !== undefined && results[0].surveyId === surveys[i]._id ) {

				var questions = surveys[i].questions;


				var resultMap = questions.reduce(function( map, question ) {
			        if( !map[ question._id ] ) {
			                map[ question._id ] = { question: question.titleText, answers: [] };
			        }
		        	return map;
				}, {});
			 
				results.forEach(function( result ) {
				        for( var questionId in result ) {
				        	if (questionId !== 'surveyId') {
				                resultMap[ questionId ].answers.push( result[ questionId ] );
				            }
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

		return $http.post(connectionInfo.url + '/api/recipientGroups', group)

	}

	//////////TOPICS

	this.postNewTopic = function( topicName, subjectName, date, recipientGroup ) {

		var newTopic = new topicService.TopicTemplate(topicName, subjectName, date, recipientGroup);

		return $http.post(connectionInfo.url + '/api/topic', newTopic)

	}

	this.addToExistingTopic = function( topic, subjectName, date, recipientGroup ) {

		var updatedTopic = new subjectService.SubjectTemplate(topic, subjectName, date, recipientGroup);

		return $http.put(connectionInfo.url + '/api/topic?id=' + topic._id, updatedTopic)

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




