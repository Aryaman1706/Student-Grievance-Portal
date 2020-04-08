const express=require('express');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const auth = require('../middleware/auth');
const config= require('config');

const {User,validate}=require('../model/user');

const router=express.Router();

// to get the currently logined user
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
     res.send(user);
   
});

// to get some other user
router.get('/:id',auth,async(req,res)=>{
    const user= await User.findById(req.params.id);
    if(!user) return res.status(404).send('Not Found');
    res.send(_.pick(user,['username','email']));
});

router.post('/',async(req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
//try{
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    // let user=new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     // password: req.body.password
    // });

    user = new User(_.pick(req.body, ['username', 'email', 'password','phone','isAdmin']));

    // bcrypt work
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user=await user.save();
//     const payload={
//         user:{
//             id: user.id
//         }
//     }
//     jwt.sign(payload, config.get('privateKey'),{
//         expiresIn: 360000
//     }, (err, token) =>{
//         if(err) throw err;
//         res.json({ token });

//     } )
//   } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//   }

    // jwt work
    const token = user.generateAuthToken();
    res
    // .header('x-auth-token', token)
    .send({body:_.pick(user, ['_id', 'username', 'email', 'isAdmin']),token});
    
   // // res.send(user);
});



// to edit the currently logged in user
router.put('/me',auth,async (req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    

    const user= await User.findByIdAndUpdate(req.user._id,{
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        // password: req.body.password
    },{new:true});

    // if(!user) return res.status(404).send('Not Found');

    // bcrypt work
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.user.password, salt);


    res.send(user);

});

// to delete account (currently logined)
router.delete('/me',auth,async (req,res)=>{
    const user=await User.findByIdAndRemove(req.user._id);
    if(!user) return res.status(404).send('Not Found');
    res.send(user);
});

module.exports=router;