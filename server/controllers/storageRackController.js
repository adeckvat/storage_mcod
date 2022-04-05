const ApiError = require('../error/ApiError')
const {StorageRack} = require('../models/models') 

class storageRackController {
    async add(req, res, next) {
        try {
            const {name, row, description} = req.body
            const storageRack = await StorageRack.create({name, row, description})
            return res.json(storageRack)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    
    async check(req, res, next) {
        const storageRack = await StorageRack.findAll()
        return res.json(storageRack)
    }
}

module.exports = new storageRackController()