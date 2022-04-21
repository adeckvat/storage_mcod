const {Brand, Item} = require('../models/models')
const ApiError = require('../error/ApiError')
const { where } = require('sequelize')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }
    async getAll(req, res) {
        let {name} = req.query

        let brands;

        brands = await Brand.findAndCountAll({
            where: {name}
        })
        
        return res.json(brands)
    }
}

module.exports = new BrandController()