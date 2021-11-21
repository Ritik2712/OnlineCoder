const router = require('express').Router();
let Code = require('../Modals/code.modal');
const ObjectId = require("mongodb").ObjectId

router.route('/add').post((req, res) => {
  const code ={"creator":req.body.creator,"html":req.body.html,"css":req.body.css,"js":req.body.js};
console.log(req.body);
  const newCode = new Code(code);
  console.log(newCode);
  newCode.save()
    .then(() => res.json('Code added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get(async (req,res)=>{
 //   return res.json("hello world")
//   console.log(req.body);
  try{
    const x= await Code.find({"creator":req.body.creator})
    res.status(200).json(x)
  }
  catch(e){
    return res.json(`Error: ${e}`)
  }
})

router.route('/getCode').get(async (req,res)=>{
    console.log(req.body);
    try{
      const x= await Code.findOne({"_id":ObjectId(req.body.id)})
      res.status(200).json(x)
    }
    catch(e){
      return res.json(`Error: ${e}`)
    }
  })

module.exports = router;