
const { response } = require('express');

const usuariosGet = ( req, res = response ) => {

    const { q, nombre, apikey } = req.query;

    res.json({
        msj: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuarioPost = ( req, res = response ) => {

    const body = req.body;

    res.status(201).json({
        msj: 'post API - controlador',
        body
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
