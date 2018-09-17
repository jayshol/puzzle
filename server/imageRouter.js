const express = require('express');
const bodyParser = require('body-parser');

const {Image} = require('./models/imageModel');

const router = express.Router();

router.get('/images', (req, res) => {
	Image
	.find()
	.then(images => res.json(images))
	.catch(err => {
		console.log(err);
		res.status(500).json({'error':'Something went wrong.'});
	});
});

module.exports = {router};
