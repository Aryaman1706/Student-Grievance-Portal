const express=require('express');
const mongoose=require('mongoose');

const {Issue,validate}=require('../model/issue');
const {User}=require('../model/user');

const router=express.Router();

router.get('/',async (req,res)=>{
    const issues= await Issue.find().sort('-date').limit(10);
    res.send(issues);
});

router.get('/:id',async (req,res)=>{
    const issue = await Issue.findById(req.params.id);
    if(!issue) return res.status(404).send('Not Found');
    res.send(issue);
});

router.post('/',async(req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user1=await User.findById(req.body.userId);
    if(!user1) return res.status(400).send('Invalid User');
    let issue=new Issue({
        category: req.body.category,
        subject: req.body.subject,
        statement: req.body.statement,
        user:{
            _id: user1._id,
            username: user1.username,
            email: user1.email,
            phone: user1.phone,
            password:user1.password
        }
    });

    issue=await issue.save();

    res.send(issue);
});

router.put('/:id', async (req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user1=await User.findById(req.body.userId);
    if(!user1) return res.status(400).send('Invalid User');

    const issue= await Issue.findByIdAndUpdate(req.params.id,{
        category: req.body.category,
        subject: req.body.subject,
        statement: req.body.statement,
        user:{
            _id: user1._id,
            username: user1.username,
            email: user1.email
        }
    },{new:true});

    if(!issue) return res.status(404).send('Not Found');

    res.send(issue);

});

router.delete('/:id',async (req,res)=>{
    const issue=await Issue.findByIdAndRemove(req.params.id);
    if(!issue) return res.status(404).send('Not Found');
    res.send(issue);
});

module.exports=router;