const router = require('express').Router();
const New = require('../../models/new');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { createToken } = require('../../helpers/utils');


router.post('/register',
    body('username')
        .exists()
        .withMessage('El campo username es requerido')
        .isLength({ min: 3, max: 15 })
        .withMessage('El campo username debe tener una longitud entre 3 y 15 caracteres'),
    body('email')
        .isEmail()
        .withMessage('El email debe tener un formato correcto'),
    body('password')
        .exists()
        .withMessage('Debes introducir la password')
        .custom(value => {
            return true
        })
    , async (req, res) => {

        // Comprobar los errores de las diferentes validaciones
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json(errors.array());
        }

        try {

            // encriptar la password
            req.body.password = bcrypt.hashSync(req.body.password, 10);

            const result = await New.create(req.body);
            console.log(result)
            res.json(result);

        } catch (err) {
            res.json({ error: err.message })
        };
    });

// ruta login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el email existe en la BD
    const user = await New.getByEmail(email);
    if (!user) {
        return res.json({ error: 'Email y/o contraseña incorrectos1' });
    }

    // Compruebo si coinciden las password
    const iguales = bcrypt.compareSync(password, user.password);
    if (!iguales) {
        return res.json({ error: 'Email y/o contraseña incorrectos2' });
    }

    res.json({
        success: 'Login correcto!!',
        token: createToken(user)
    });

});

module.exports = router;