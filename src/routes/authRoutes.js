const express = require('express');
const { model } = require('mongoose');
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = express.Router();


router.post("/signup", async (req, res)=>{
    const {email, password} = req.body
    const user = new User({email, password});
    try{
        await user.save();
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY');
        res.send({token});
    }catch(err){
        return res.status(422).send(err.message);
        
    }
    
});


router.post('/signin', async (req, res) =>{
    const {email, password} = req.body;

    if (!email || !password){
        return res.status(422).send({err: 'Must provide email and password'});
    }

    const user = await User.findOne({email});

    if (!user){
        return res.status(404).send({error: 'Email not found'});
    }

    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, "MY_SECRET_KEY");
        res.send({token});
    }catch(err){
        return res.status(422).send({error: 'Invalid password or email'});
    }
})

module.exports = router;