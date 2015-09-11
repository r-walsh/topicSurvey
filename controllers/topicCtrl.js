var Topic = require('../models/TopicModel.js');



module.exports = {

	getTopic: function(req, res) {
		console.log('gotit');
		Topic.find()
		.populate('subjects.recipientGroup')
		.exec().then(function(data, err) {
			if (err) {
				res.error(500).send(err);
			} else {
				res.send(data);
			}
		})
	},

	addTopic: function(req, res) {
		new Topic(req.body).save(function(err, data) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.send(data);
			}
		})
	},

	updateTopic: function(req, res) {
		Topic.findByIdAndUpdate(req.query.id, req.body, function(err, data) {
			if (err) {
				res.error(500).send('broken');
			} else {
				res.send(data)
			}
		})
	},

	// updateResults:
	//     Topic.findByIdAndUpate(results.push {username, email, [q&a]})

	deleteTopic: function(req, res) {
		Topic.findByIdAndRemove(req.query.id).then(function(err, data) {
			if (err) {
				res.error(500).send('broken');
			} else {
				res.send(data);
			}
		})

	}

}