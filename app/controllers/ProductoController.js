/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
'use strict';
const uuidv4 = require('uuid/v4');
var models = require('./../models');
var Producto = models.producto;
var Lote = models.lote;
class ProductoController {
    listar(req, res) {
        res.render('template_test',
                {titulo: "Lista de Producto",
                    fragmento: 'fragmentos/productos/frm_lista'
                });
    }
    registrar(req, res) {
        res.render('template_test',
                {titulo: "Registro de Producto",
                    fragmento: 'fragmentos/productos/frm_registro'
                });
    }
    guardar(req, res) {
        Producto.create({nombre: req.body.nombre, external_id: uuidv4(), provinvia: req.body.provincia, canton: req.body.cantones}).then(function (newProd, created) {
            if (newProd) {
                res.redirect("/test/producto/lista");
            } else {
                res.redirect("/test/producto/registro");
            }
        });
    }
    //lote
    registrarLote(req, res) {
        res.render('template_test',
                {titulo: "Registro de Lote",
                    fragmento: 'fragmentos/productos/frm_registroLote'
                });
    }
    guardarLote(req, res) {
        Lote.create(
                {
                    precio_unitario: req.body.pu,
                    precio_total: req.body.pt,
                    cantidad: req.body.cant,
                    fecha_creacion: req.body.fi,
                    fecha_caducidad: req.body.fe,
                    codigo: req.body.cod,
                    id_producto: req.body.prod
                }
        ).then(function (newLote, created) {
            if (newLote) {
                res.redirect("/test/producto/lista");
            } else {
                res.redirect("/test/lote/registro");
            }
        });
    }
}
module.exports = ProductoController;
