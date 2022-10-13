const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tasks = require('./tasks')
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        uppercase : true,
    }, 
    email : {
        type : String,
        required : true,
        unique:true,
        trim : true,
        lowercase : true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }

    },
    age : {
        type : Number,
        default: 0,
        validate(value){
            if(value<0){
                throw new Error('please enter positive value')
            }
        }

    },
    password:{
        type : String,
        trim: true,
        required:true,
        validate(value){
            if(value.length<6){
                throw new Error('password must contain 6 or more characters')
            }
            if (validator.equals('password', value)){
                throw new Error('password cannot be "password"')
            }
        }
    },
    avatar:{
        type: Buffer

    },
    tokens: [{
        token:{
            type:String,
            required:true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'tasks',
    localField: '_id',
    foreignField:'owner'
})


userSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject()

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password)=>{
    const findUserByEmail = await user.findOne({email})

    if(!findUserByEmail){
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, findUserByEmail.password)
    if(!isMatch){
        throw new Error('unable to login')
    }

    return findUserByEmail;
}


userSchema.pre('save', async function (next){
    const user=this;
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)

    }
    next()
})


userSchema.pre('remove', async function (next){
    const user=this;
    await tasks.deleteMany({owner : user._id})
    next()
})


const user = mongoose.model('user', userSchema)



module.exports = user;