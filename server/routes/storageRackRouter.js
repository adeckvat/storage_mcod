const Router = require('express')
const router = new Router()
const storageRackController = require('../controllers/storageRackController')

router.post('/add', storageRackController.add)
router.get('/view', storageRackController.check)


module.exports = router