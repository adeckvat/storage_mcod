const Router = require('express')
const itemController = require('../controllers/itemController')
const router = new Router()


router.post('/', itemController.create)
router.get('/', itemController.getAll)
router.get('/:id', itemController.getOne)


module.exports = router