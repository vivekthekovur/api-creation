const jwt = require('jsonwebtoken')
const users = require('../models/users')

const auth = async (req, res, next)=>{
    try 
    {
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await users.findOne({_id:decode._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        // console.log(user)
        req.token = token
        req.user = user
        next()
    }catch (err){
        res.status(401).send({error:'Please authenticate'})
    }
}


module.exports = auth