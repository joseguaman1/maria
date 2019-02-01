//var express = require('express');
//var app = express.Router();
//var home = require('../app/controllers/home');
var passport = require('passport');
//you can include all your controllers
var cuenta = require('../app/controllers/CuentaController');
var cuentaController = new cuenta();

var marca = require('../app/controllers/MarcaController');
var marcaController = new marca();

var vino = require('../app/controllers/VinoController');
var vinoController = new vino();

var carro = require('../app/controllers/CarritoController');
var carrito = new carro();

var venta = require('../app/controllers/VentaController');
var ventaController = new venta();



module.exports = function (app) {
    var auth = function middleWare(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            req.flash('err_cred', 'Inicia sesion!!!');
            res.redirect('/maria/inicio_sesion');
        }
    }


    app.get('/maria', function (req, res, next) {
        console.log(req.isAuthenticated() + "*******************************++");
        if (req.isAuthenticated()) {
            res.redirect('/maria/administrador');
        } else {
            res.render('template', {titulo: "Principal"});
        }

    });



    app.get('/maria/administrador', auth, function (req, res, next) {
        var models = require('../app/models');
        var Vino = models.vino;
        var Marca = models.marca;
        console.log("holaaaaa");
        Vino.findAll({include: {model: Marca}}).then(function (vinos) {
            if (req.session.carrito == undefined) {
                req.session.carrito = [];
                console.log("************");
            }
            console.log(req.session.carrito);
            res.render('template_admin',
                    {titulo: "Administracion",
                        fragmento: 'fragmentos/frm_principal_admin',
                        admin: req.user.nombre,
                        rol: req.user.rol,
                        lista: vinos
                    });


        }).catch(function (err) {
            console.log("Error:", err);
            req.flash('error', 'Hubo un error');
            res.redirect('/maria');
        });


    });


    app.get('/maria/inicio_sesion', cuentaController.verLogin);
    app.get('/maria/cerrar_sesion', cuentaController.cerrar);
    app.get('/maria/registro', cuentaController.verRegistro);
    app.post('/maria/registro/guardar',
            passport.authenticate('local-signup', {successRedirect: '/maria/inicio_sesion',
                failureRedirect: '/maria/registro', failureFlash: true}
            ));
    app.post('/maria/inicio_sesion/iniciar',
            passport.authenticate('local-signin',
                    {successRedirect: '/maria/administrador',
                        failureRedirect: '/maria/inicio_sesion',
                        failureFlash: true}
            ));


//marcas
app.get('/maria/administrar/marca', auth, marcaController.verMarca);
app.post('/maria/administrar/marca/guardar', auth, marcaController.guardar);
app.post('/maria/administrar/marca/modificar', auth, marcaController.modificar);
//vinos
app.get('/maria/administrar/vino', vinoController.verVino);
app.get('/maria/administrar/vino/registro', auth, vinoController.verRegistro);
app.get('/maria/administrar/vino/modificar/:external', auth, vinoController.verEditar);
app.post('/maria/administrar/vino/guardar', auth, vinoController.guardar);
app.post('/maria/administrar/vino/modificar', auth, vinoController.modificar);
app.get('/maria/administrar/vino/foto/:external',  vinoController.verFoto);
app.post('/maria/administrar/vino/foto/subir',  vinoController.guardarImagen);

//carrito

app.get('/maria/compra/carrito/listado', auth,  carrito.mostrarCarrito);
app.get('/maria/compra/carrito/:external', auth,  carrito.cargarCarro);
//venta
app.get('/maria/venta', auth,  ventaController.mostrarVenta);

//    app.get('/login', home.login);
//    app.get('/signup', home.signup);
//
//    app.get('/', home.loggedIn, home.home);//home
//    app.get('/home', home.loggedIn, home.home);//home
//
//    app.post('/signup', passport.authenticate('local-signup', {
//        successRedirect: '/home', // redirect to the secure profile section
//        failureRedirect: '/signup', // redirect back to the signup page if there is an error
//        failureFlash: true // allow flash messages
//    }));
//    // process the login form
//    app.post('/login', passport.authenticate('local-login', {
//        successRedirect: '/home', // redirect to the secure profile section
//        failureRedirect: '/login', // redirect back to the signup page if there is an error
//        failureFlash: true // allow flash messages
//    }));


}
