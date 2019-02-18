/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var models = require('./../models');
var Producto = models.producto;
var Lote = models.lote;
class Sw {
    obtenerProvincias(req, res) {
        var provincias = {"provincias": ["AZUAY", "GUAYAS", "LOJA"]};
        res.status(200).json(provincias);
    }
    obtenerCantones(req, res) {
        var ciudad = req.query.ciudad;
        var cantones = {"LOJA": ["LOJA", "CALVAS", "CATAMAYO", "CELICA", "CHAGUARPAMBA", "ESPÍNDOLA", "GONZANAMÁ", "MACARÁ", "PALTAS", "PUYANGO", "SARAGURO", "SOZORANGA", "ZAPOTILLO", "PINDAL", "QUILANGA", "OLMEDO"],
            "AZUAY": ["CUENCA", "GIRÓN", "GUALACEO", "NABÓN", "PAUTE", "PUCARA", "SAN FERNANDO", "SANTA ISABEL", "SIGSIG", "OÑA", "CHORDELEG", "EL PAN", "SEVILLA DE ORO", "GUACHAPALA", "CAMILO PONCE ENRÍQUEZ"],
            "GUAYAS": ["GUAYAQUIL", "ALFREDO BAQUERIZO MORENO (JUJÁN)", "BALAO", "BALZAR", "COLIMES", "DAULE", "DURÁN", "EL EMPALME", "EL TRIUNFO", "MILAGRO", "NARANJAL", "NARANJITO", "PALESTINA", "PEDRO CARBO", "SAMBORONDÓN", "SANTA LUCÍA", "SALITRE (URBINA JADO)", "SAN JACINTO DE YAGUACHI", "PLAYAS", "SIMÓN BOLÍVAR", "CORONEL MARCELINO MARIDUEÑA", "LOMAS DE SARGENTILLO", "NOBOL", "GENERAL ANTONIO ELIZALDE", "ISIDRO AYORA"]};
        res.status(200).json(cantones[ciudad]);
    }
    obtenerListaTodos(req, res) {
        Producto.findAll({include:{model: Lote}}).then(function (lista){
            res.status(200).json(lista);
        });
    }
    obtenerListaTodosLotes(req, res) {
        Lote.findAll( {include:{model: Producto}}).then(function (lista){
            res.status(200).json(lista);
        });
    }
    
    obtenerCantLotes(req, res) {
        Lote.count({col: "id_producto"}, {where: {id_producto: 5}}, {include:{model: Producto}}).then(function (cont){
            res.status(200).json({cantidad: cont});
        });
    }
    
    obtenerCantProducto(req, res) {
        var idProd = req.params.codigo;
        Lote.sum("cantidad", {where: {id_producto: idProd}}, {include:{model: Producto}}).then(function (cont) {            
            res.status(200).json({cantidad: cont});
        });
    }
}
module.exports = Sw;
