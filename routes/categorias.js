const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, tieneRol } = require('../middlewares');
const { existeCategoria } = require('../helpers/db_validators');

const { crearCategoria, 
        obtenerCategorias,
        obtenerCategoriaID,
        actualizarCategoria,
        borrarCategoria
} = require('../controllers/categorias');

const router = Router();

//PATH
router.get('/', obtenerCategorias);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
] , obtenerCategoriaID);

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , crearCategoria);

router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
] , actualizarCategoria);

router.delete('/:id', [
    validarJWT,
    tieneRol,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
] , borrarCategoria);

module.exports = router;