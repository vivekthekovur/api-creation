const express = require('express')
const tasks = require('../models/tasks')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks', auth, async (req, res)=>{
    // const task = new tasks(req.body)
    const task = new tasks({
        ...req.body,
        owner : req.user._id
    })
    
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send(error)
    }
})



router.get('/tasks',auth, async (req, res)=>{
    // tasks.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
    try{
        // const tasksList = await tasks.find({})
        // const tasksList = await tasks.find({owner:req.user._id})
        // res.send(tasksList)
        const match = {}
        const sort={}
        if(req.query.status){
            match.status = req.query.status==='true'
        }
        if(req.query.sortBy){
            const parts = req.query.sortBy.split('_')
            sort[parts[0]]=parts[1]=== 'desc' ?-1:1
        }
        await req.user.populate({
            path: 'tasks',
            match,
            options :{
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    }catch(error){
        res.status(500).send(error)
    }
})

router.get('/tasks/:id',auth, async (req, res)=>{
    const _id = req.params.id;
    // tasks.findById(_id).then((task)=>{
    //     if(!task){
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
    try{
        // const oneTask = await tasks.findById(_id);
        const oneTask = await tasks.findOne({_id, owner: req.user._id})
        if(!oneTask){
            return res.status(404).send()
        }
        res.send(oneTask)
    }catch(error){
        res.status(500).send(error)
    }
})



router.patch('/tasks/:id',auth, async (req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'status'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'invalid operation'})
    }

    try{

        // const updateTask = await tasks.findById(req.params.id)
        const updateTask = await tasks.findOne({_id:req.params.id, owner: req.user._id})
        if(!updateTask){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            updateTask[update]=req.body[update]
        })
        await updateTask.save()


        // const updateTask = await tasks.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        
        res.send(updateTask)
    }catch(error){
        res.status(400).send(error)

    }
})

router.delete('/tasks/:id',auth, async (req, res)=>{
    try{
        // const deleteTask = await tasks.findByIdAndDelete(req.params.id);
        const deleteTask = await tasks.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!deleteTask){
            return res.status(404).send()
        }
        res.send(deleteTask)

    }catch(error){
        res.status(400).send(error)
    }
})


module.exports = router;