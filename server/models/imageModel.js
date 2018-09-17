'use strict';

const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
	name:{type:String, required:true},
	url:{type:String, required:true}
});

const Image = mongoose.model("Image", imageSchema);
module.exports = {Image};
