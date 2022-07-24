const router = require('express').Router();
const bcrypt = require('bcryptjs');

const multer = require('multer');
const uploadProfileImage = multer({ dest: 'public/images/profile_pictures' });
const uploadHeader = multer({ dest: 'public/images/header_pictures' });
const fs = require('fs');

const User = require('../../models/user')



//GET all users
router.get('/all', async (req, res) => {
    try {
        const data = {};
        const result = await User.getAll(parseInt(req.params.offset));
        console.log(result);
        const count = await User.getCountUsers();
        data.result = result;
        data.info = { count, pages: Math.ceil(count / 10) }
        res.json(data);
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    };
});

//GET by Id
router.get('/:idUser', async (req, res) => {
    try {
        const result = await User.getById(req.params.idUser);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    };
});

//GET by email
router.get('/email/:email', async (req, res) => {
    try {
        const result = await User.getByEmail(req.params.email);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    };
});

//GET by user
router.get('/user/:user', async (req, res) => {
    try {
        const result = await User.getByUser(req.params.user);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
});

// EDIT perfil

//Edit (profile_picture incluido)
router.put('/update/:id', uploadProfileImage.single('profile_picture'), async (req, res, next) => {
    if (req.file) {
        const extension = '.' + req.file.mimetype.split('/')[1];
        const newName = req.file.filename + extension;
        const newPath = req.file.path + extension;
        fs.renameSync(req.file.path, newPath);
        req.body.profile_picture = newName

        try {
            const result = await User.updateProfile(req.body, req.params.id);
            res.json(result)
        }
        catch (error) {
            res.status(422).json({ error: error.message });
        }
    } else {

        try {
            const result = await User.updateProfile(req.body, req.params.id);
            res.json(result)
        }
        catch (error) {
            res.status(422).json({ error: error.message });
        }
    }

    next()
});

//Update header
router.put('/updateHeader/:id', uploadHeader.single('header_picture'), async (req, res, next) => {
    const extension = '.' + req.file.mimetype.split('/')[1];
    const newName = req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath);
    req.body.header_picture = newName
    req.body.id_user = req.userId

    try {
        console.log(req.body);
        const result = await User.updateHeader(req.body, req.params.id);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }

    next()
});

//Delete
router.delete('/delete/:iduser', async (req, res) => {
    try {
        const result = await User.deleteById(req.params.iduser);
        res.json(result)
    }
    catch (error) {
        res.status(422).json({ error: error.message });
    }
})





module.exports = router;