const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../model/userModel");

cloudinary.config({
	cloud_name: "dv4dlmp4e",
	api_key: "464513458841612",
	api_secret: "VxFfeGaNMPPudxcq0GWcsh6zfRk",
});

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage }).single("avatar");

router.post("/create", upload, async (req, res) => {
	try {
		const { email, name, password, description } = req.body;

		const salt = await bcrypt.genSalt(10);
		const halt = await bcrypt.hash(password, salt);

		const image = await cloudinary.uploader.upload(req.file.path);
		const getUsers = await userModel.create({
			description,
			name,
			email,
			password: halt,
			avatar: image.secure_url,
			avatarID: image.public_id,
		});
		res.status(200).json({
			message: "all users found",
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({
			message: "Error found",
			data: err.message,
		});
	}
});
router.post("/signin", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });
		if (user) {
			const myPassword = await bcrypt.compare(password, user.password);

			if (myPassword) {
				const { password, ...info } = user._doc;

				const token = jwt.sign(
					{
						_id: user._id,
						name: user.name,
						email: user.email,
						isAdmin: user.isAdmin,
					},
					"GEttiNGPassDATANow.",
					{ expiresIn: "3d" }
				);

				res.status(200).json({
					message: "all users found",
					data: { ...info, token },
				});
			} else {
				const getUsers = await userModel.find();
				res.status(200).json({
					message: "all users found",
					data: getUsers,
				});
			}
		} else {
			res.status(400).json({
				message: "Error found with Email",
				data: err.message,
			});
		}
	} catch (err) {
		res.status(400).json({
			message: "Error found",
			data: err.message,
		});
	}
});

router.get("/", async (req, res) => {
	try {
		const getUsers = await userModel.find();
		res.status(200).json({
			message: "all users found",
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({
			message: "Error found user",
			data: err.message,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const getUsers = await userModel.findById(req.params.id);
		res.status(200).json({
			message: "individual user found",
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({
			message: "Error found",
			data: err.message,
		});
	}
});

router.patch("/update/:id", upload, async (req, res) => {
	try {
		const { email, name, description } = req.body;

		const getUser = await userModel.findOne({ email });
		if (getUser) {
			await cloudinary.uploader.destroy(getUser.avatarID);
		}

		const image = await cloudinary.uploader.upload(req.file.path);

		const getUsers = await userModel.findByIdAndUpdate(
			req.params.id,
			{
				name,
				description,
				avatar: image.secure_url,
				avatarID: image.public_id,
			},
			{ new: true }
		);
		res.status(200).json({
			message: "individual user found",
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({
			message: "Error found",
			data: err.message,
		});
	}
});


router.post("/report/:id", async (req, res) => {
	try {
		const report = {
			month: req.body.month,
			week: req.body.week,
			topic: req.body.topic,
			note: req.body.note,
			codeSample: req.body.codeSample,
			rate: req.body.rate,
			course: req.body.course,
		};

		const getUsers = await userModel.findByIdAndUpdate(
			req.params.id,
			{
				$push: { report },
			},
			{ new: true }
		);
		res.status(200).json({
			message: "all users found",
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({
			message: "Error found",
			data: err.message,
		});
	}
});

router.post("/note/:id", async (req, res) => {
	try {
		const note = {
			rate: req.body.rate,
			topic: req.body.topic,
			note: req.body.note,
		};

		const getUsers = await userModel.findByIdAndUpdate(
			req.params.id,
			{
				$push: { note },
			},
			{ new: true }
		);
		res.status(200).json({
			message: "all users found",
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({
			message: "Error found",
			data: err.message,
		});
	}
});

router.post("/report/:id/:reportID", async (req, res) => {
	try {
		const point = {
			topic: req.body.topic,
			note: req.body.note,
			example: req.body.example,
		};

		const report = {
			month: req.body.month,
			week: req.body.week,
			topic: req.body.topic,
			note: req.body.note,
			example: req.body.example,
		};

		const getUsers = await userModel.findByIdAndUpdate(
			req.params.id,
			{
				$push: { report: { _id: req.params.reportID, point } },
			},
			{ new: true }
		);
		res.status(200).json({
			message: "all users found",
			data: getUsers,
		});
	} catch (err) {
		res.status(400).json({
			message: "Error found",
			data: err.message,
		});
	}
});

module.exports = router;
