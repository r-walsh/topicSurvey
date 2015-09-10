var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	RecipientGroups = require('./RecipientGroupsModel.js');

var TopicSchema = new Schema({

	topicName: String,
	subjects: [{
		subjectName: String,
		date: Date,
		id: String,
		recipientGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'RecipientGroup' },
		results: [{
			// username: recipientGroup.users.name, //copied from recipient groups
			// userEmail: recipientGroup.users.email, //copied from recipient groups
			answers: [{
				question: String,
				answer: String
			}]
		}]
	}]

});

module.exports = mongoose.model('Topic', TopicSchema);


