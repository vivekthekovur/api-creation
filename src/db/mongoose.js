const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true
})

// const users = mongoose.model('users', {
//     name : {
//         type : String
//     }, 
//     age: {
//         type : Number
//     }
// })

// const me = new users({
//     name : 'vivek',
//     age: 23
// })

// me.save().then(()=>{
//                 console.log(me)
// }).catch((error)=>{
//                 console.log(error)
// })


// const tasks = mongoose.model('tasks', {
//     description : {
//         type : String

//     }, 
//     status : {
//         type : Boolean
//     }
// })


// const myStatus = new tasks({
//     description:'Complete half of the section 2 in task manager application',
//     status : true
// })

// myStatus.save().then(()=>{
//     console.log(myStatus)

// }).catch((error)=>{
//     console.log(error)
// })


// const user = mongoose.model('user', {
//     name: {
//         type : String,
//         required : true,
//         trim:true,
//         uppercase : true
//     },
//     email:{
//         type : String,
//         required : true,
//         trim:true,
//         lowercase :true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Invalid email');
//             }
//         }
//     },
//     age:{
//         type : Number,
//         default : 0,
//         validate(value){
//             if(value<0){
//                 throw new Error('Enter positive value')
//             }
//         }
//     }
// })

// const me = new user({
//     name : '   vivek  ',
//     email: '   vivek.kovur@gmail.com'
   
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })



// const user = mongoose.model('user', {
//     name : {
//         type : String,
//         required : true,
//         trim : true,
//         uppercase : true,
//     }, 
//     email : {
//         type : String,
//         required : true,
//         trim : true,
//         lowercase : true,
//         validate(value){
//             if (!validator.isEmail(value)){
//                 throw new Error('Invalid Email')
//             }
//         }

//     },
//     age : {
//         type : Number,
//         default: 0,
//         validate(value){
//             if(value<0){
//                 throw new Error('please enter positive value')
//             }
//         }

//     },
//     password:{
//         type : String,
//         trim: true,
//         validate(value){
//             if(value.length<6){
//                 throw new Error('password must contain 6 or more characters')
//             }
//             if (validator.equals('password', value)){
//                 throw new Error('password cannot be "password"')
//             }
//         }
//     }
// })

// const me = new user({
//     name : 'vivek',
//     email : '  Vivek.KOVUR@gmail.com',
//     password: 'Vivek@123'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })


// const tasks = mongoose.model('tasks', {
//     description : {
//         type : String,
//         required: true

//     }, 
//     status : {
//         type : Boolean,
//         default: false
//     }
// })


// const myStatus = new tasks({
//     description:'Complete half of the section 2 in task manager application'
// })

// myStatus.save().then(()=>{
//     console.log(myStatus)

// }).catch((error)=>{
//     console.log(error)
// })