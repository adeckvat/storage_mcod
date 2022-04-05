const {StorageShelf} = require('../models/models')
const ApiError = require('../error/ApiError')

class storageShelfController {
    async create(req, res, next) {
        try {
            const {name, storageRackId, description} = req.body
            const storageShelf = await StorageShelf.create({name, storageRackId, description})
            return res.json(storageShelf)
        } catch (error) {
            
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req, res) {
        const storage_shelfs = await StorageShelf.findAll()
        return res.json(storage_shelfs)
    }
}

module.exports = new storageShelfController()