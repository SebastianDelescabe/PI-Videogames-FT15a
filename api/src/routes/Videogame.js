const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre, Platforms } = require('../db');

const router = Router();


async function apiInfo() { //TRAE INFO DE API
    let promises = []
    let allGames = []

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
                            id: e.id,
                            name: e.name,
                            background_image: e.background_image,
                            genres: e.genres.map(e => {
                                return {
                                    name: e.name
                                }
                            }),
                            platforms: e.platforms.map(e => {
                                return {
                                    name: e.platform.name
                                }
                            }),
                            rating: e.rating
                        }
                    }))
                }
            })
        return allGames

    } catch (error) {
        console.log(error)
    }

}


const bdInfo = async function () {  //TRAE INFO DE BD
    const dataBd = await Videogame.findAll({
        include: [
            {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            },
            {
                model: Platforms,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        ]

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

        if (name && name !== "") {
            const searchName = allVideogames.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase())).slice(0, 15)
            if (searchName.length > 0) {
                return res.status(200).send(searchName)
            } else {
                return res.status(404).send("No se encontro video juego")
            }
        } else {
            return res.status(200).send(allVideogames)
        }
    } catch (error) {
        console.log(error.message)
    }
})


router.get("/games/:id", async function (req, res) {  //RUTA PARA BUSCAR POR ID
    const { id } = req.params
    const arrDbInfo = []
    const arrApiInfo = []

    try {
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
                    platforms: e.platforms.map(e => {
                        return {
                            name: e.platform.name
                        }
                    }),
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
    } catch (error) {
        console.log(error)
    }


})


router.post("/games", async function (req, res) {   //POST GAMES
    const { name, description, released, rating, platforms, background_image, createdDb, genres } = req.body

    if (name && description && genres) {
        let newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            background_image,
        })
        let genreDb = await Genre.findAll({
            where: {
                name: genres
            }
        })

        let platformDb = await Platforms.findAll({
            where: {
                name: platforms
            }
        })

        await newGame.addGenre(genreDb)
        await newGame.addPlatforms(platformDb)
        return res.send("Personaje Creado")

    } else {
        return res.status(404).send("Completar formulario correctamente")
    }

})


router.delete('/delete/:id', async function (req, res) {
    const { id } = req.params;

    try{
        const dbGame = await Videogame.findAll({
            where:{
                id : id
            }
        })
        if(dbGame){
            Videogame.destroy({
                where:{
                    id:id
                }
            })
        }else{
            return res.send(error)
        }

    }catch(error){
        console.log(error)
    }
});

module.exports = router, apiInfo