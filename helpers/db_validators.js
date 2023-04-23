
const Role = require('../models/rol');
const { Usuario, Categoria, Producto } = require('../models');

const esRolValido = async ( rol = ' ') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });

    if ( existeEmail ) {
        throw new Error(`El email ${ correo } ya esta registrado`)
    }
}

const existeUsuarioPorID = async( id ) => {
    const existeUsuario = await Usuario.findById(id);

    if ( !existeUsuario ) {
        throw new Error(`El ID: ${ id } no existe`);
    }
}

const existeCategoria = async( id ) => {
    const existeCategoria = await Categoria.findById(id);

    if ( !existeCategoria ) {
        throw new Error(`El ID: ${ id } no existe`);
    }
}

const existeProducto = async( id ) => {
    const existeProducto = await Producto.findById(id);

    if ( !existeProducto ) {
        throw new Error(`El ID: ${ id } no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoria,
    existeProducto
};
