'use strict';
var models = require('./../models');
var Vino = models.vino;
var Marca = models.marca;
class CarritoController {
    mostrarCarrito(req, res) {        
        res.status(200).json(req.session.carrito);        
    }

    cargarCarro(req, res) {
        console.log("cargarCarro");
        var carrito = req.session.carrito;
        console.log(carrito);
        var external = req.params.external;
        Vino.findOne({where: {external_id: external}, include: {model: Marca}}).then(function (vino) {
            var pos = CarritoController.verificar(carrito, external);
            if (pos == -1) {
                var data = {external: external, nombre: vino.nombre, marca: vino.marca.nombre, cant: 1, pu: vino.precio, pt: vino.precio};
                carrito.push(data);
                console.log(req.session.carrito);
            } else {
                var data = carrito[pos];
                data.cant = data.cant + 1;
                data.pt = data.cant * data.pu;
                carrito[pos] = data;
            }
            req.session.carrito = carrito;
            res.status(200).json(req.session.carrito);
        }).catch(function (err) {
            console.log("Error:", err);
            res.status(500).json(err);
        });
    }
    static verificar(lista, external) {
        var pos = -1;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].external == external) {
                pos = i;
                break;
            }
        }
        return pos;
    }

    quitar_item(req, res) {
        var carrito = req.session.carrito;
        var external = req.params.external;
        var pos = CarritoController.verificar(carrito, external);
        var data = carrito[pos];
        if (data.cant > 1) {
            data.cant = data.cant - 1;
            data.pt = data.cant * data.pu;
            carrito[pos] = data;
            req.session.carrito = carrito;
            res.status(200).json(req.session.carrito);
        } else {
            var aux = [];            
            for(var i = 0; i < carrito.length; i++) {
                var items = carrito[i];
                if(items.external != external) {
                    aux.push(items);
                }
            }
            req.session.carrito = aux;
            res.status(200).json(req.session.carrito);
        }
    }

}
module.exports = CarritoController;