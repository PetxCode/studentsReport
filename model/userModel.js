const mongoose = require("mongoose");

const noteModel = mongoose.Schema(
	{
		topic: {
			type: String,
		},
		rate: {
			type: String,
		},
		note: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const reportModel = mongoose.Schema(
	{
		month: {
			type: String,
		},
		week: {
			type: String,
		},
		topic: {
			type: String,
		},
		note: {
			type: String,
		},
		codeSample: {
			type: String,
		},
		course: {
			type: String,
		},
		rate: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const userModel = mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
		description: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		avatar: {
			type: String,
		},
		avatarID: {
			type: String,
		},
		report: [reportModel],
		note: [noteModel],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("users", userModel);
