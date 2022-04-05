const Router = require('express')
const storageShelfController = require('../controllers/storageShelfController')
const router = new Router()



router.post('/', storageShelfController.create)
router.get('/', storageShelfController.getAll)


module.exports = router