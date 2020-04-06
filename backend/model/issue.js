const Joi=require('joi');
const mongoose=require('mongoose');

const {userSchema}=require('./user')

const issueSchema= new mongoose.Schema({
    category:{
        required: true,
        type: String,
        enum:['Academics','Infrastructure','Services', 'Others']
    },
    subject:{
        type: String,
        required:true
    },
    statement:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
    user_id:{
        type:String,
        required:true
    },
    user:{
        type: new mongoose.Schema({
            username:{
                type: String,
                required:true
            },
            _id:{
                type: String
            },

            email:{
                type: String,
                required:true
            }
        }),
        required:true
    }
});

const Issue=mongoose.model('Issue',issueSchema);

function validateIssue(issue){
    const schema={
        category: Joi.string().min(6).required(),
        // userId: Joi.string().required(),
        statement: Joi.string().required(),
        subject: Joi.string().required()

    };

    return Joi.validate(issue,schema);
}

exports.Issue=Issue;
exports.validate=validateIssue;


