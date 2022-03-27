const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const url = "mongodb://localhost/report";
const urlOnline =
	"mongodb+srv://PeterPan:PeterPan@codelab.eqkgv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const port = process.env.PORT || 2234;

mongoose.connect(urlOnline).then(() => {
	console.log("database connected...!");
});

app.use(cors({ origin: "*" }));
app.use(express.json());

 app.use("/", async (req, res) => {
 	res.status(200).json({ message: "server is running on fine" });
 });

app.use("/user", require("./routes/userRouter"));

app.listen(port, () => {
	console.log(`server is now listening to port on: ${port}`);
});
