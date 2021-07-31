const { Router } = require('express');
const { API_KEY } = process.env;
const axios = require('axios');

const router = Router();




const pages = async function () {
    var pages = []
    let data =await axios.get("https://api.rawg.io/api/games?key=cdaccd9e0d6748059b943e81ff1c9b43");
    pages.push(data.data.next)
    for (let i = 0; i < 5; i++) {
        let info =await axios.get(data.data.next)
        console.log(info)
        pages.push(info.data.next)

    }
    return pages
}

const apiInfo = async function () {
    const pag = await pages()
    console.log(pag)
}



router.get("/games", async function (req, res) {
    const apiData = await apiInfo()
    res.json(apiData)
})


module.exports = router;




/**var numero = 1;
const apiInfo = async function () {
    let pages = 6;
    const dataApi = []

    for (let i = 1; i < pages ; i++) {
        let info = await axios.get(`https://api.rawg.io/api/games?key=cdaccd9e0d6748059b943e81ff1c9b43&page=${i}`)
        dataApi.push(info.data.results.map(e => {
            return {
                numero : numero++,
                id: e.id,
                name: e.name,
                released: e.released,
                rating: e.rating,
                platforms: e.platforms.map(e => e.platform.name),
                background_image: e.background_image
            }
        }))
    }
    return dataApi
} */


/**.map(e => {
            return {
                numero : numero++,
                id: e.id,
                name: e.name,
                released: e.released,
                rating: e.rating,
                platforms: e.platforms.map(e => e.platform.name),
                background_image: e.background_image
            }
        })/ */