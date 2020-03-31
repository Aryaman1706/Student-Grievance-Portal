const express=require('express');
const mongoose=require('mongoose');

const {User,validate}=require('../model/user');

const router=express.Router();

router.get('/',async (req,res)=>{
    const users= await User.find().sort('date').limit(10);
    res.send(users);
});

router.get('/:id',async (req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('Not Found');
    res.send(user);
});

router.post('/',async(req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user=new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    });

    user=await user.save();

    res.send(user);
});

router.put('/:id', async (req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    

    const user= await User.findByIdAndUpdate(req.params.id,{
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    },{new:true});

    if(!user) return res.status(404).send('Not Found');

    res.send(user);

});

router.delete('/:id',async (req,res)=>{
    const user=await User.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).send('Not Found');
    res.send(user);
});

module.exports=router;