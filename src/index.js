const express = require('express')
require('./db/mongoose')
const user = require('./models/users')
const tasks = require('./models/tasks')
const userRouter = require('./routers/users')
const tasksRouter = require('./routers/tasks')
const app = express();

const port = process.env.PORT;


// app.use((req, res, next)=>{
//     if(req.method === 'GET'){
//         res.send('Read operation is disabled for you'); 
//     }else{
//         next()
//     }
// })

// app.use((req, res, next)=>{
//     res.status(503).send('server is under maintainence')
// })




app.use(express.json())

app.use(userRouter)
app.use(tasksRouter)

// const bcrypt = require('bcryptjs');

// const myFUnction = async () =>{
//     const password = 'Red@123';
//     const hashedPassword = await bcrypt.hash(password, 8);
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare(password, hashedPassword)
//     console.log(isMatch)
    
// }

// myFUnction()

// const jwt = require('jsonwebtoken')

// const myFunction = async () =>{
//     const token = jwt.sign({id:'Vivek123'}, 'thisismysecret')
//     console.log(token)
//     const data = jwt.verify(token, 'thisismysecret')
//     console.log(data)
// } 

// myFunction()


app.listen(port, ()=>{
    console.log('server is up and running on port '+port)
})


// const pet = {
//     name : 'cat'
// }

// pet.toJSON = function (){
//     console.log(this)   
//     return this
// }

// console.log(JSON.stringify(pet))


// const main = async ()=>{
//     // const task = await tasks.findById('62ecb9a16d4bc5ef4b9dfd89')
//     // await task.populate('owner')
//     // // await task.populate('owner').execPopulate()-->execpopulate is removed from the mongoose.
//     // console.log(task.owner)

//     const User = await user.findById('62ef70ce87dbb7726f4f3a58')
//     await User.populate('tasks')
//     console.log(User.tasks)
// }


// main()


// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload Word document'))
//         }
//         cb(undefined, true)
//     }
// })


// const errorMiddleware = (req, res, next)=>{
//     throw new Error('From middleware')
// }

// app.post('/upload',upload.single('upload'), (req, res)=>{
//     res.send()
// }, (error, req, res, next)=>{
//     res.status(400).send({error: error.message})
// })


