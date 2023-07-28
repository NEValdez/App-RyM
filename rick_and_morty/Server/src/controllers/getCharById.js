const axios = require('axios')

const URL_BASE = 'https://rickandmortyapi.com/api/character'

const getCharById = (res, id) => {
    axios(`${URL_BASE}/${id}`)
    .then((data)=>{
         const { name, gender, species, origin, image, status } = data
         res.writeHead(200, {"Content-Type":"application/json"})
         res.end(JSON.stringify({id, name, gender, species, origin, image, status}))
    })
    .catch((error)=>{
        res.writeHead(404, {"Content-Type":"text/plain"})
        res.end(error.message)
    })
}

module.exports = getCharById