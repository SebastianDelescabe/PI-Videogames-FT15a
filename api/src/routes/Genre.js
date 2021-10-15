const { Router } = require('express');
const axios = require('axios');
const { Genre } = require('../db');
const router = Router();


router.get("/", async function (req, res) {
    // const genre = await Genre.findAll()

    Genre.findAll().then((response) => {
        if (response) {
            res.send(response)
        } else {
            res.status(404)
        }
    })
})

module.exports = router;