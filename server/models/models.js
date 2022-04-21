const sequelize = require('../db');
const {DataTypes} = require('sequelize');


const StorageRack = sequelize.define('storageRack', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    row: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
})

const StorageShelf = sequelize.define('storageShelf', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: false, allowNull: false},
    serialNumber: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const ItemInfo = sequelize.define('itemInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    partNumber: {type: DataTypes.STRING, allowNull: true},
    price: {type: DataTypes.INTEGER, allowNull: true},
    description: {type: DataTypes.STRING, allowNull: true},

})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const TypeBrand = sequelize.define('typebrand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


StorageRack.hasMany(StorageShelf)
StorageShelf.belongsTo(StorageRack)

StorageShelf.hasMany(Item)
Item.belongsTo(StorageShelf)

Item.hasMany(ItemInfo, {as: 'info'})
ItemInfo.belongsTo(Item)

Type.hasMany(Item)
Item.belongsTo(Type)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    StorageRack, 
    StorageShelf, 
    Item, 
    ItemInfo, 
    Type, 
    Brand,
    TypeBrand,
}