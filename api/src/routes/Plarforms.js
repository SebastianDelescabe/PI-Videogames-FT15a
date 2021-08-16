const { Router } = require('express');
const axios = require('axios');
const { Platforms } = require('../db');


const router = Router();


router.get("/platforms", async function (req, res) {  
    const platforms = await Platforms.findAll()
    try{
        if(platforms){
            res.status(200).send(platforms)
        }else{
            res.status(404)
        }

    }catch(error){
        console.log(error)
    }
})

module.exports = router;