const express = require("express");
const userModel = require("../model/userModel");

const router = express.Router();

router.get("/report", (req, res) => {
	try {
        cons
	} catch (err) {
		res.status(400).json({
			message: "Error found",
			data: err.message,
		});
	}
});

module.exports = router;
