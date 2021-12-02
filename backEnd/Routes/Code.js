const router = require("express").Router();
let Code = require("../Modals/code.modal");
const ObjectId = require("mongodb").ObjectId;
const { authUSer } = require("../middleWare/authUser");

router.post("/add", [authUSer], (req, res) => {
  const code = {
    creator: req.user.username,
    html: req.body.html,
    css: req.body.css,
    js: req.body.js,
  };
  console.log(req.body);
  const newCode = new Code(code);
  console.log(newCode);
  newCode
    .save()
    .then(() => res.json("Code added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/", [authUSer], async (req, res) => {
  console.log(req.params);
  try {
    const x = await Code.find({ creator: req.user.username });
    res.status(200).json(x);
  } catch (e) {
    return res.json(`Error: ${e}`);
  }
});

router.get("/getCode", [authUSer], async (req, res) => {
  console.log(req.body);
  try {
    const x = await Code.findOne({ _id: ObjectId("619a4eabd6520382b16c837c") });
    res.status(200).json(x);
  } catch (e) {
    return res.json(`Error: ${e}`);
  }
});

module.exports = router;
