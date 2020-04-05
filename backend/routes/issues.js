const express=require('express');
const mongoose=require('mongoose');

const {Issue,validate}=require('../model/issue');
const {User}=require('../model/user');

const auth = require('../middleware/auth');

const router=express.Router();

router.get('/',async (req,res)=>{
    const issues= await Issue.find().sort('-date').limit(10);
    res.send(issues);
});

router.get('/:id',auth,async (req,res)=>{
    const issue = await Issue.findById(req.params.id);
    if(!issue) return res.status(404).send('Not Found');
    res.send(issue);
});

router.post('/',auth, async(req,res)=>{
    const {error}= validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const user=await User.findById(req.user._id);
    if(!user) return res.status(400).send('Invalid User');
    let issue=new Issue({
        category: req.body.category,
        subject: req.body.subject,
        statement: req.body.statement,
        user:{
            // _id: user._id,
            username: user.username,
            email: user.email
        }
    });

    issue=await issue.save();

    res.send(issue);
});


// NOT FUNCTIONAL AS OF NOW

// Allowed to those who have posted the issue

// router.put('/myissue',auth,async (req,res)=>{
//     const {error}= validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);
    
//     const user=await User.findById(req.user._id);
//     if(!user) return res.status(400).send('Invalid User');

//     const issue= await Issue.findByIdAndUpdate(req.params.id,{
//         category: req.body.category,
//         subject: req.body.subject,
//         statement: req.body.statement,
//         user:{
//             username: user.username
//         }
//     },{new:true});

//     if(!issue) return res.status(404).send('Not Found');

//     res.send(issue);

// });

// router.delete('/myissue',auth,async (req,res)=>{
//     const issue=await Issue.findByIdAndRemove(req.params.id);
//     if(!issue) return res.status(404).send('Not Found');
//     res.send(issue);
// });

module.exports=router;