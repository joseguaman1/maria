'use strict';
var models = require('./../models');
var Vino = models.vino;
var Marca = models.marca;
class VentaController {
    mostrarVenta(req, res) {
        res.render('template_admin',
                    {titulo: "Venta",
                        fragmento: 'fragmentos/carrito/frm_venta',
                        rol: req.user.rol                                                
                    });
    }
    
    
}
module.exports = VentaController;