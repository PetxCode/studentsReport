const mongoose = require("mongoose");

const pointsModel = mongoose.Schema(
	{
		topic: {
			type: String,
		},
		note: {
			type: String,
		},
		example: {
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
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("users", userModel);
