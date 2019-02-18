module.exports = function (sequelize, Sequelize) {
        
    var Producto = sequelize.define('producto', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        nombre: {
            type: Sequelize.STRING(50)
        },      
        provinvia: {type: Sequelize.STRING(50)},
        canton: {type: Sequelize.STRING(50)}
    }, {
        freezeTableName: true
    });
    
    Producto.associate= function (models){
        models.producto.hasMany(models.lote, {
            foreignKey:'id_producto'});
    };
    
    
    
    return Producto;
};