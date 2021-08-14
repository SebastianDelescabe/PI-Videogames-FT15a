const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db');
const router = Router();


router.get("/genre", async function (req, res) {  
    const genre = await Genre.findAll()

    try{
        if(genre){
            res.status(200).send(genre)
        }else{
            res.status(404)
        }
        
    }catch(error){
        console.log(error)
    }

})

module.exports = router;