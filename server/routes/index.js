const Router = require('express')
const router = new Router()
const storageRackRouter = require('./storageRackRouter')
const storageShelfRouter = require('./storageShelfRouter')
const itemRouter = require('./itemRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')



router.use('/storageRack', storageRackRouter)
router.use('/storageShelf', storageShelfRouter)
router.use('/item', itemRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)


module.exports = router

