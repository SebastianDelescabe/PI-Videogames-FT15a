const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db');
const router = Router();


const apiGenre = async function() { 
    const info = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)
    const apiGenre = info.data.results.map(e => {
        return {
            name: e.name,
        }
    })
    return apiGenre
}

router.get("/genre", async function (req, res) {  
    const genre = await apiGenre()
    if(genre){
        genre.map(e => Genre.findOrCreate({
            where:{
                name:e.name
            }
        }))
        res.status(202).send(genre)
    }
})

module.exports = router;