
const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');



const usuariosGet = ( req, res = response ) => {

    const { q, nombre, apikey } = req.query;

    res.json({
        msj: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuarioPost = async ( req, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });

    if ( existeEmail ) {
        return res.status(400).json({
            msj: 'El correo ya esta registrado'
        })
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
}

const usuarioPut = ( req, res = response ) => {

    const id = req.params.id;

    res.json({
        msj: 'put API - controlador',
        id
    });
}

const usuarioPatch = ( req, res = response ) => {
    res.json({
        msj: 'patch API - controlador'
    });
}

const usuarioDelete = ( req, res = response ) => {
    res.json({
        msj: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete
};
