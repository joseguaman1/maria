module.exports = function (sequelize, Sequelize) {    
    var producto = require('../models/Producto');
    var Producto = new producto(sequelize, Sequelize);
    
    var Lote = sequelize.define('lote', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },        
        codigo: {
            type: Sequelize.STRING(50)
        }, 
        precio_unitario: {
            type: Sequelize.DOUBLE(7, 2)
        },
        precio_total: {
            type: Sequelize.DOUBLE(7, 2)
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        fecha_creacion: {type: Sequelize.DATEONLY},
        fecha_caducidad: {type: Sequelize.DATEONLY}
        
    }, {timestamps: false,
        freezeTableName: true
    });
    
    Lote.belongsTo(Producto, {
        foreignKey: 'id_producto',
        constraints: false
    });
    
        
    return Lote;
};

