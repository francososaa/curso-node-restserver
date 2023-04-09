
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRol,
    esAdminRol
} = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db_validators');
const { usuariosGet,
        usuarioPost,
        usuarioPut,
        usuarioDelete
} = require('../controllers/usuarios');

const router = Router();

// PATH
router.get('/', usuariosGet );

router.post( '/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({ min: 6 }),
    //check('correo','El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
] , usuarioPost );

router.put( '/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuarioPut );

router.delete( '/:id', [
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROL','USER_ROL'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos
] ,usuarioDelete );


module.exports =  router;

