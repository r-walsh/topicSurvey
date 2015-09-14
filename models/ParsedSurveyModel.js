var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Topic = require('./TopicModel.js');

var ParsedSurveySchema = new Schema({
	publicName: String,
	description: String,
	subject: Object,
	questions: [{
		questionText: String,
		helpText: String,
		questionType: String,
		Answers: Array
	}]
});

module.exports = mongoose.model('ParsedSurvey', ParsedSurveySchema);