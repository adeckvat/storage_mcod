const {Item, ItemInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const { model } = require('../db')


class ItemController {
    async create(req, res, next) {
        try {
            let {name, serialNumber, brandId, typeId, storageShelfId, info} = req.body

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        itemId: item.id
                    })
                    )
            }

            const item = await Item.create({name, serialNumber, brandId, typeId, storageShelfId})

            return res.json(item)
            
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
     
    }
    async getAll(req, res, next) {
        let {brandId, typeId, serialNumber, storageShelfId, page, limit} = req.query
        
        page = page || 1
        limit = limit || 9
        
        let offset = page * limit - limit

        let items;

        if (!brandId && !typeId && !serialNumber && !storageShelfId) {
            items = await Item.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId && !serialNumber && !storageShelfId) {
            items = await Item.findAndCountAll({where: {
                brandId}, limit, offset
            })
        }
        if (serialNumber && !brandId && !typeId && !storageShelfId) {
            items = await Item.findAndCountAll({where: {
                serialNumber}, limit, offset
            })
        }
        if (storageShelfId && !brandId && !typeId && !serialNumber) {
            items = await Item.findAndCountAll({where: {
                storageShelfId}, limit, offset
            })
        }
        //------------ if two of all ===
        if (brandId && typeId && !serialNumber && !storageShelfId) {
            items = await Item.findAndCountAll({where: {
                brandId, 
                typeId }, limit, offset
            })
        }
        if (serialNumber && storageShelfId && !brandId && !typeId) {
            items = await Item.findAndCountAll({where: {
                serialNumber, 
                storageShelfId 
                }, limit, offset
            })
        }
        if (brandId && serialNumber && !typeId && !storageShelfId) {
            items = await Item.findAndCountAll({where: {
                brandId, 
                serialNumber }, limit, offset
            })
        }
        if (typeId && serialNumber && !brandId && !storageShelfId) {
            items = await Item.findAndCountAll({where: {
                typeId, 
                serialNumber }, limit, offset
            })
        }
        if (brandId && storageShelfId && !typeId && !serialNumber) {
            items = await Item.findAndCountAll({where: {
                typeId, 
                storageShelfId }, limit, offset
            })
        }
        if (typeId && storageShelfId && !brandId && !serialNumber) {
            items = await Item.findAndCountAll({where: {
                brandId, 
                storageShelfId }, limit, offset
            })
        }
        //---- if three of all ====
        if (brandId && typeId && serialNumber && !storageShelfId) {
            items = await Item.findAndCountAll({where: {
                brandId, 
                typeId, 
                serialNumber 
                }, limit, offset
            })
        }
        if (brandId && typeId && storageShelfId && !serialNumber) {
            items = await Item.findAndCountAll({where: {
                brandId, 
                typeId, 
                storageShelfId }, limit, offset
            })
        }
        if (serialNumber && storageShelfId && brandId && !typeId) {
            items = await Item.findAndCountAll({where: {
                serialNumber, 
                storageShelfId, 
                brandId }, limit, offset
            })
        }
        if (serialNumber && storageShelfId && typeId && !brandId) {
            items = await Item.findAndCountAll({where: {
                serialNumber, 
                storageShelfId, 
                typeId }, limit, offset
            })
        }
        //------------ if all ====
        if(serialNumber && brandId && typeId && storageShelfId) {
            items = await Item.findAndCountAll({where: {
                serialNumber, 
                storageShelfId, 
                typeId, 
                brandId }, limit, offset
            })
        }

        return res.json(items)
    }
    async getOne(req, res) {
        const {id} = req.params
        const item = await Item.findOne(
            {where: {id},
            include: [{model: ItemInfo, as: 'info'}]
        },
        )
        return res.json(item)
    }
}

module.exports = new ItemController()