const express=require('express');
const mongoose=require('mongoose');
const path =require('path');


const app=express();

const issues=require('./routes/issues');
const users=require('./routes/users');
const auth = require('./routes/auth');
var cors = require('cors')

app.use(cors()) 

mongoose.connect('mongodb+srv://aryaman:aryaman@cluster0-4rsvl.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Not Connected...'));
mongoose.set('useFindAndModify', false);

app.use(express.json());

app.use('/api/users',users);
app.use('/api/issues',issues);
app.use('/api/auth', auth);

//Serve Static assets in production
if(process.env.NODE_ENV==='production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const port=process.env.PORT || 4000;
app.listen(port,()=> console.log(`Listening on Port ${port}...`));
