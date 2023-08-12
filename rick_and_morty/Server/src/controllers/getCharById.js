const axios = require('axios')
const errorHandler = require('../utils/errors')

const URL_BASE = 'https://rickandmortyapi.com/api/character/'

const getCharById = async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const respuesta = await axios(`${URL_BASE}${id}`)
        const { name, species, status, origin, image, gender} = respuesta.data
        const personaje = {id, name, species, status, origin, image, gender}

        res.status(200).json(personaje)

    } catch (error){
        errorHandler(res, error)
    }
    
}

module.exports = getCharById