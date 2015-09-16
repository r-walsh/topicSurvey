var app = angular.module('topicSurvey');

app.factory('topicService', function(subjectService) {

	return {
		TopicTemplate: function( topicName, subjectName, date, recipientGroup ) {
			this.topicName = topicName;
			this.subjects = new subjectService.SubjectTemplate(this, subjectName, date, recipientGroup);
		}
	}
})