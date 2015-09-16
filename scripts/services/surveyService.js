var app = angular.module('topicSurvey');

app.factory('surveyService', function() {

	return {
		
		SurveyTemplate: function( name, description, questions, varNames ) {
			this.name = name;
			this.description = description;
			this.questions = questions;
			this.varNames = varNames;
		},

		ParsedSurveyTemplate: function( topicName, name, description, subject, questions ) {
			this.publicName = name;
			this.topicName = topicName;
			this.description = description;
			this.subject = subject;
			this.questions = questions;
		}
	}

});