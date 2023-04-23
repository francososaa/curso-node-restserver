const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, tieneRol } = require('../middlewares');
const { existeProducto } = require('../helpers/db_validators');

const { obtenerProductos,
    obtenerProductoID, 
    crearProducto,
    actualizarProducto,
    borrarProducto 
} = require('../controllers/productos');

const router = Router();

//PATH
router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
] , obtenerProductoID);

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], crearProducto );

router.put('/:id', [
    validarJWT,
    //check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
] , actualizarProducto);

router.delete('/:id', [
    validarJWT,
    tieneRol,
    check('id', 'No es un ID de Mongo valido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
] , borrarProducto);

module.exports = router;