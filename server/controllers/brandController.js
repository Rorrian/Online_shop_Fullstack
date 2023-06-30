const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res) {
        const { name } = req.body
        const brand = await Brand.create({ name })
        return res.json(brand)
    }

    async getAll(req, res) { // http://localhost:5000/api/brand
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()