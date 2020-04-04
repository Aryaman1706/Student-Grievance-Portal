const express=require('express');
const mongoose=require('mongoose');

const app=express();

const issues=require('./routes/issues');
const users=require('./routes/users');
const auth = require('./routes/auth');

mongoose.connect('mongodb://localhost/proto')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Not Connected...'));

app.use(express.json());

app.use('/api/users',users);
app.use('/api/issues',issues);
app.use('/api/auth', auth);

const port=process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on Port ${port}...`));
