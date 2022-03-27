const jwt = require("jsonwebtoken");

const verified = (req, res, next) => {
	const authCheck = req.headers.authorization;

	if (authCheck) {
		const token = authCheck.split(" ")[1];

		jwt.verify(token, "GEttiNGPassDATANow.", (err, payload) => {
			if (err) {
				return err;
			} else {
				req.user = payload;
				next();
			}
		});
	}
};

module.exports = verified;
