
const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required: true

    }, 
    status : {
        type : Boolean,
        default: false
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref : 'user'
    }
}, {
    timestamps: true
})

taskSchema.pre('save', async function(next){
    const task = this;
    next()
})


const tasks = mongoose.model('tasks', taskSchema )

module.exports = tasks;