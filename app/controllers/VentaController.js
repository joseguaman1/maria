'use strict';
const uuidv4 = require('uuid/v4');
var models = require('./../models');
var Vino = models.vino;
var Persona = models.persona;
var Venta = models.venta;
var Detalle = models.detalle_vino;
class VentaController {
    mostrarVenta(req, res) {
        res.render('template_admin',
                {titulo: "Venta",
                    fragmento: 'fragmentos/carrito/frm_venta',
                    rol: req.user.rol
                });
    }

    guardar(req, res) {
        var carrito = req.session.carrito;
        Persona.findOne({where: {external_id: req.user.id_persona}}).then(function (persona) {
            if (persona) {
                var venta = {
                    external_id: uuidv4(),
                    fecha: new Date(),
                    subtotal: req.body.subtotal,
                    iva: req.body.iva,
                    total: req.body.total,
                    id_persona: persona.id
                };
                Venta.create(venta).then(function (newVenta, created){
                    if(newVenta) {
                        var detalle = [];
                        for(var i = 0; i < carrito.length; i++) {
                            var aux = carrito[i];
                            var item = {cantidad: aux.cant, precio_unitario: aux.pu, precio_total: aux.pt, id_venta: newVenta.id, id_vino: aux.id};
                            detalle[i] = item;
                        }
                        Detalle.bulkCreate(detalle).then(() => {                            
                            return Detalle.findAll({where:{id_venta: newVenta.id}}); 
                        }).then(detalles => {
                            detalles.forEach(function (item){
                                Vino.findOne({where: {id: item.id_vino}}).then(function (vinito){
                                    Vino.update({ cantidad : vinito.cantidad-item.cantidad },
                                    { where : { id : item.id_vino }});
                                });
                                req.session.carrito = [];
                                res.redirect("/maria");
                            }); 
                        });
                    }
                });
            }
        });
    }

}
module.exports = VentaController;