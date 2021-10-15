const { Router } = require('express');
const axios = require('axios');
const { Platforms } = require('../db');


const router = Router();


router.get("/", async function (req, res) {  
    try{
        Platforms.findAll().then((response) => {
            if(response){
                res.send(response)
            }else{
                res.status(404).send("error")
            }
        })

    }catch(error){
        console.log(error)
    }
})

module.exports = router;