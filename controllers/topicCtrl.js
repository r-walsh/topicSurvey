var Topic = require('../models/TopicModel.js');



module.exports = {

	getTopic: function(req, res) {
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
		// Topic.findByIdAndUpdate(req.query.id, req.body, function(err, data) {
		// 	if (err) {
		// 		res.error(500).send('broken');
		// 	} else {
		// 		res.send(data)
		// 	}
		// })
	
		Topic.update({ '_id': req.query.id }, { $push: {'subjects': req.body} }, function(err, data) {
			if ( err ) {
				res.status(500).send(err);
			} else {
				console.log('success');
				res.send(data);
			}
		})
	},

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