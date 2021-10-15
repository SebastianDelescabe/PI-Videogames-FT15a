const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db');

const router = Router();

router.get("/", async function (req, res) {
    // const genre = await Genre.findAll()
    Genre.findAll().then((response) => {
        if(response){
            res.send(response)
        }else{
            res.status(404)
        }
    })
})

module.exports = router;

//------------------------POR SI CRASHEA BASE DE DATOS-------------------------

// const apiGenre = async function () {
//     const info = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)
//     const apiGenre = info.data.results.map(e => {
//         return {
//             name: e.name,
//         }
//     })
//     return apiGenre
// }
//-----------------------------RUTA-----------------------
// router.get("/genre", async function (req, res) {  

//     const genre = await apiGenre()

//     if(genre){
//         genre.map(e => Genre.findOrCreate({
//             where:{
//                 name:e.name
//             }
//         }))
//     }
//     res.send(genre)
// })