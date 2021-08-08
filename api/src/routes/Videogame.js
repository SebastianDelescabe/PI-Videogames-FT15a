const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db');

const router = Router();


const apiInfo = async function () { //TRAE INFO DE API
    let allGames = []

    for (let i = 1; i <= 5; i++) {
        var info = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}`)
        allGames = allGames.concat(info.data.results.map(e => {
            return {
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                genres: e.genres.map(e => {
                    return{
                        name : e.name
                    }
                }),
                rating:e.rating
 
            }
        }))
    }
    return allGames

}


const bdInfo = async function () {  //TRAE INFO DE BD
    const dataBd = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    })
    return dataBd
}

const allData = async function () {  //JUNTA LAS DOS INFO
    const apiData = await apiInfo()
    const bdData = await bdInfo()
    const allData = apiData.concat(bdData)
    return allData
}



router.get("/games", async function (req, res) { //MUESTRA TODOS LOS JUEGOS SI NO LE PASAN QUERY , SI LE PASAN QUERY LO BUSCA EN TODA LA INFO
    const { name } = req.query

    try {
        const allVideogames = await allData()

        if (name !== undefined && name !== "") {
            const searchName = allVideogames.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase())).slice(0,15)
            if (searchName.length > 0) {
                res.status(200).send(searchName)
            } else {
                res.status(404).send("No se encontro video juego")
            }
        } else {
            res.status(200).send(allVideogames)
        }
    } catch (error) {
        console.log(error.message)
    }
})



router.get("/games/:id", async function (req, res) {  //RUTA PARA BUSCAR POR ID
    const { id } = req.params
    const arrDbInfo = []
    const arrApiInfo = []

    try{
        if (!id) {
            return res.status(404).send("Ingresar ID valido")
        }
    
        if (!id.includes("-")) {
            const info = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`)
            arrApiInfo.push(info.data)
            const apiData = arrApiInfo.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    background_image: e.background_image,
                    description: e.description,
                    released: e.released,
                    rating: e.rating,
                    platforms: e.platforms.map(e => e.platform.name)
                }
            })
            const videoGameApiId = apiData.filter(e => e.id == id)

            if (videoGameApiId.length > 0) {
                return res.status(200).send(videoGameApiId)
            } else {
                return res.status(404).send("No se encontro Videojuego con ese ID")
            }
        } else {
            const videoGameBdId = await Videogame.findByPk(id)
            arrDbInfo.push(videoGameBdId)
            const filtro = arrDbInfo.filter(e => e.id == id)
            
            if (filtro.length > 0) {
                return res.status(200).send(filtro)
            } else {
                return res.status(404).send("No se encontro Videojuego con ese ID")
            }
        }
    }catch(error){
        console.log(error)
    }


})


router.post("/games", async function (req, res) {   //POST GAMES
    const { name, description, released, rating, platforms, background_image, createdDb, genre } = req.body

    if (name && description && platforms && genre) {
        let newGame = await Videogame.create({
            name,
            description,
            platforms,
            released,
            rating,
            background_image,
            createdDb,


        })
        let genreDb = await Genre.findAll({
            where: {
                name:genre
            }
        })

        newGame.addGenre(genreDb)
        res.send("Personaje Creado")
        
    } else {
        res.status(404).send("Completar formulario correctamente")
    }

})





module.exports = router