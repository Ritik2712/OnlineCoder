const router = require('express').Router();
let User = require('../Modals/user.modal');

router.route('/add').post((req, res) => {
  const username ={"username":req.body.username,"password":req.body.password};
console.log(req.body);
  const newUser = new User(username);
  console.log(username);
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signup').get(async (req,res)=>{
  console.log(req.body);
  try{
    const x= await User.findOne({"username":req.body.username})
    if(x===null){
      return res.json("user not found")
    }else{
      console.log(x.password,req.body.password);
      if(x.password===req.body.password){
        res.json("user verifired")
      }else{
        return(res.json("wrong password"))
      }
    }
  }
  catch(e){
    return res.json("user not belong")
  }
  

})

module.exports = router;