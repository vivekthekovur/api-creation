const express = require('express')
const user = require('../models/users')
const auth = require('../middleware/auth')
const router = new express.Router()
const sharp = require('sharp')
const {sendWelcomeMail, sendCancellationMail} = require('../emails/account')

router.post('/users', async (req, res)=>{
    const me = new user(req.body)
    // me.save().then(()=>{
    //     res.status(201).send(me)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
    try{
        await me.save();
        sendWelcomeMail(me.email, me.name)
        const token = await me.generateAuthToken()
        res.status(201).send({me, token})
    }catch(error){
        res.status(400).send(error)
    }
    

})

router.post('/users/login', async (req, res)=>{
    try{
        const userValidation = await user.findByCredentials(req.body.email, req.body.password)
        const token = await userValidation.generateAuthToken()
        res.status(200).send({userValidation, token})

    }catch (error){
        console.log(error)
        res.status(400).send()
        
    }
    
})

router.post('/users/logout',auth, async (req, res)=>{
    try
    {
        req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !==req.token
    })
    await req.user.save()
    res.status(200).send()

    }
    catch (error){
        // console.log(error)
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth, async (req, res, next)=>{
    try{
        req.user.tokens=[];
        await req.user.save();
        res.status(200).send()

    }
    catch (e){
        res.status(500).send()

    }
})



router.get('/users/me', auth, async (req, res)=>{
    // user.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })


    // try{
    //     const users = await user.find({})
    //     res.send(users)
    // }catch(error){
    //     res.status(500).send(error)
    // }
    res.send(req.user)



})


// router.get('/users/:id', async (req, res)=>{
//     const _id = req.params.id;
//     // user.findById(_id).then((user)=>{
//     //     if(!user){
//     //         return res.status(404).send()
//     //     }
//     //     res.send(user)
//     // }).catch((error)=>{
//     //     res.status(500).send(error)
//     // })

//     try{
//         const oneUser = await user.findById(_id)
//         if(!oneUser){
//             return res.status(404).send()
//         }
//         res.send(oneUser)
//     }catch(error){
//         res.status(500).send(error)
//     }
// })

router.patch('/users/me', auth, async (req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age','password','email'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'invalid operation'})
    }
    try{
        // const userUpdate = await user.findById(req.user._id)
        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })

        await req.user.save()


        // const userUpdate = await user.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true}) 
        // if(!userUpdate){
        //     res.status(404).send()
        // }
        res.send(req.user)
    }catch(error){
        res.status(400).send(error)
    }
})


router.delete('/users/me', auth, async (req, res)=>{
    try{
        // const deleteUser = await user.findByIdAndDelete(req.params.id);
        // if(!deleteUser){
        //     return res.status(404).send()
        // }
        // res.send(deleteUser)
        await req.user.remove()
        sendCancellationMail(req.user.email, req.user.name)
        res.send(req.user)

    }catch(error){
        res.status(400).send(error)
    }
})

const multer = require('multer')
const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload images'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar',auth, upload.single('avatar'), async (req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({width: 250, height:250}).png().toBuffer()
    // req.user.avatar = req.file.buffer
    req.user.avatar= buffer
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send({
        error: error.message
    })
})

router.delete('/users/me/avatar', auth, async (req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}
)

router.get('/users/:id/avatar', async (req, res)=>{
    try{
        const User = await user.findById(req.params.id)
        if(!User||!User.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(User.avatar)
    }
    catch(e){
        res.status(400).send()
    }
})


module.exports = router;



















