
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido } = require('../helpers/db_validators');
const { usuariosGet,
        usuarioPost,
        usuarioPut,
        usuarioPatch,
        usuarioDelete
} = require('../controllers/usuarios');


const router = Router();



router.get('/', usuariosGet );
router.post( '/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('correo','El correo no es valido').isEmail(),
    check('rol').custom( esRolValido ),
    validarCampos
] , usuarioPost );
router.put( '/:id', usuarioPut );
router.patch('/', usuarioPatch);
router.delete( '/', usuarioDelete );


module.exports =  router;

