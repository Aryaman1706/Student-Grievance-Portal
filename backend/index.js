const helmet = require('helmet');
const express=require('express');
const mongoose=require('mongoose');

const app=express();

const issues=require('./routes/issues');
const users=require('./routes/users');

mongoose.connect('mongodb://localhost/proto')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err=> console.error('Not Connected...'));

app.use(express.json());
app.use(helmet());

app.use('/api/users',users);
app.use('/api/issues',issues);

const port=process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on Port ${port}...`));
