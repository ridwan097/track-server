const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middleWares/requireAuth')

const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) =>{
    console.log('Hi there');
    try{
        const tracks = await Track.find({userId: req.user._id});

        res.send(tracks);
    }catch(err){
        console.log(err)
        return res.status(422).send({error: 'Invalid password or email'});
    }
  
});


router.post('/tracks', async (req, res) =>{
    const {name, locations} = req.body;

    if (!name || !locations){
        res.status(422).send({error: 'You must provide a name and location'});
    }

    const track = new Track({name, locations, userId: req.user._id});

    try{
        await track.save();
        res.send(track);
    }catch(err){
        res.status(422).send({error: err.message});
    }

});

module.exports = router;