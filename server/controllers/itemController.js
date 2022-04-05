const {Item} = require('../models/models')
const ApiError = require('../error/ApiError')

class ItemController {
    async create(req, res, next) {
        try {
            const {name, serialNumber, brandId, typeId, storageShelfId, itemInfo} = req.body

            const item = await Item.create({name, serialNumber, brandId, typeId, storageShelfId})

            return res.json(item)
            
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
     
    }
    async getAll(req, res) {
        const {serialNumber, brandId, typeId, storageShelfId} = req.query
        
        let items;

        //-- if all !
        if (!brandId && !typeId && !storageShelfId && !serialNumber) {
            items = await Item.findAll()
        }
        //------------- if one of all ===
        if (brandId && !typeId && !storageShelfId && !serialNumber) {
            items = await Item.findAll({where: {brandId}})
        }
        if (typeId && !brandId && !storageShelfId && !serialNumber) {
            items = await Item.findAll({where: {typeId}})
        }
        if (serialNumber && !brandId && !typeId && !storageShelfId) {
            items = await Item.findAll({where: {serialNumber}})
        }
        if (storageShelfId && !brandId && !typeId && !serialNumber) {
            items = await Item.findAll({where: {storageShelfId}})
        }
        //------------ if two of all ===
        if (brandId && typeId && !serialNumber && !storageShelfId) {
            items = await Item.findAll({where: {brandId, typeId }})
        }
        if (serialNumber && storageShelfId && !brandId && !typeId) {
            items = await Item.findAll({where: {serialNumber, storageShelfId }})
        }
        if (brandId && serialNumber && !typeId && !storageShelfId) {
            items = await Item.findAll({where: {brandId, serialNumber }})
        }
        if (typeId && serialNumber && !brandId && !storageShelfId) {
            items = await Item.findAll({where: {typeId, serialNumber }})
        }
        if (brandId && storageShelfId && !typeId && !serialNumber) {
            items = await Item.findAll({where: {typeId, storageShelfId }})
        }
        if (typeId && storageShelfId && !brandId && !serialNumber) {
            items = await Item.findAll({where: {brandId, storageShelfId }})
        }
        //---- if three of all ====
        if (brandId && typeId && serialNumber && !storageShelfId) {
            items = await Item.findAll({where: {brandId, typeId, serialNumber }})
        }
        if (brandId && typeId && storageShelfId && !serialNumber) {
            items = await Item.findAll({where: {brandId, typeId, storageShelfId }})
        }
        if (serialNumber && storageShelfId && brandId && !typeId) {
            items = await Item.findAll({where: {serialNumber, storageShelfId, brandId }})
        }
        if (serialNumber && storageShelfId && typeId && !brandId) {
            items = await Item.findAll({where: {serialNumber, storageShelfId, typeId }})
        }
        //------------ if all ====
        if(serialNumber && brandId && typeId && storageShelfId) {
            items = await Item.findAll({where: {serialNumber, storageShelfId, typeId, brandId }})
        }

        return res.json(items)
    }
    async getOne(req, res) {
        
    }
}

module.exports = new ItemController()