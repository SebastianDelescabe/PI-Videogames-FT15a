const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db');

const router = Router();


const apiInfo = async function () {
    let allGames = []
    for (let i = 1; i <= 5; i++) {
        var info = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}`)
        allGames = allGames.concat(info.data.results.map(e => {
            return {
                id: e.id,
                name: e.name,
                background_image: e.background_image,
                genres: e.genres.map(e => e.name)
            }
        }))
    }
    return allGames
}


const bdInfo = async function () {
    const dataBd = await Videogame.findAll({
        include: {
            model: Genre,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    })
    return dataBd
}

const allData = async function () {
    const apiData = await apiInfo()
    const bdData = await bdInfo()
    const allData = apiData.concat(bdData)
    return allData
}



router.get("/games", async function (req, res) {
    const { name } = req.query

    const allVideoGames = await allData()

    if (name !== undefined) {
        const searchName = allVideoGames.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase())).slice(0, 15)
        console.log(searchName)
        console.log(searchName.length)
        if (searchName.length > 0) {
            res.status(200).send(searchName)
        } else {
            res.status(404).send("No se encontro video juego")
        }
    } else {
        res.json(allVideoGames)
    }
})



router.get("/games/:id", async function (req, res) {
    const { id } = req.params
    const arrApiInfo = []
    const arrDbInfo = []

    if (id > 643142) {
        return res.status(404).send("Ingresar ID valido")
    }

    if (id.length > 20 || id > 0) {
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
    } else {
        res.status(404).send("Ingresar ID valido")
    }

})




router.post("/games", async function (req, res) {
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
                name: genre
            }
        })

        newGame.addGenre(genreDb)

        res.json(genreDb)
    } else {
        res.status(404).send("Completar formulario correctamente")
    }

})





module.exports = router