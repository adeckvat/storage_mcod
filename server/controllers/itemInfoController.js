const uuid = require('uuid')
const path = require('path')
const {ItemInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {
    async create(req, res, next) {
        try {
            const {itemId, title, partNumber, price, description} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", 'static', fileName))

            const itemInfo = await ItemInfo.create({itemId, img, title, partNumber, price, description, img: fileName})

            return res.json(itemInfo)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
     
    }
    async getAll(req, res) {
        
    }
    async getOne(req, res) {
        
    }
}

module.exports = new ItemController()