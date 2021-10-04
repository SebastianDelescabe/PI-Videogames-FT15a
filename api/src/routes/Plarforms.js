const { Router } = require('express');
const axios = require('axios');
const { Platforms } = require('../db');

const router = Router();

const apiInfo = async function () {
    let allGames = []
    let promises = []

    try {
        for (let i = 1; i <= 5; i++) {
            promises.push(axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}`)
                .then(response => {
                    return response
                }))

        }
        await Promise.all(promises)
            .then((response) => {
                for (let i = 0; i < promises.length; i++) {
                    allGames = allGames.concat(response[i].data.results.map(e => {
                        return {
                            platforms: e.platforms.map(e => {
                                return {
                                    name: e.platform.name
                                }
                            }),
                        }
                    }))
                }
            })
        return allGames

    } catch (error) {
        console.log(error)
    }
}
router.get("/platforms", async function (req, res) {  
    const plat = await apiInfo()
    const plat2 = plat.map(e => e.platforms).flat()
    const plat3 = plat2.map(e => e.name)
    const trim = plat3.map(e => e.trim())
    const noRepeatedTemp = [...new Set(trim)]

    noRepeatedTemp.map((e) => {
        Platforms.findOrCreate({
            where:{
                name:e
            }
        })
    })
    const hola =  await Platforms.findAll()
    res.send(hola) 
})

// router.get("/platforms",function (req, res) {  
//     Platforms.findAll().then((response) => {
//         if(response){
//             res.send(response)
//         }else{
//             res.status(404)
//         }
//     })
// })


module.exports = router;

//------------------------POR SI CRASHEA BASE DE DATOS-------------------------
// const apiInfo = async function () {
//     let allGames = []
//     let promises = []

//     try {
//         for (let i = 1; i <= 5; i++) {
//             promises.push(axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}`)
//                 .then(response => {
//                     return response
//                 }))

//         }
//         await Promise.all(promises)
//             .then((response) => {
//                 for (let i = 0; i < promises.length; i++) {
//                     allGames = allGames.concat(response[i].data.results.map(e => {
//                         return {
//                             platforms: e.platforms.map(e => {
//                                 return {
//                                     name: e.platform.name
//                                 }
//                             }),
//                         }
//                     }))
//                 }
//             })
//         return allGames

//     } catch (error) {
//         console.log(error)
//     }
// }
//-----------------------------RUTA-----------------------
//router.get("/platforms", async function (req, res) {  
    // const plat = await apiInfo()
    // const plat2 = plat.map(e => e.platforms).flat()
    // const plat3 = plat2.map(e => e.name)
    // const trim = plat3.map(e => e.trim())
    // const noRepeatedTemp = [...new Set(trim)]

    // noRepeatedTemp.map((e) => {
    //     Platforms.findOrCreate({
    //         where:{
    //             name:e
    //         }
    //     })
    // })
    // const hola =  await Platforms.findAll()
    // res.send(hola) 
//})