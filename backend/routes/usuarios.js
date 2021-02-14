const { Router } = require('express');
const Usuarios = require('../models/Usuarios');
const router = Router();


// Get para mostrar todos los usuarios registrados
router.get('/', async (req,res) => {
    const usuarios = await Usuarios.find().sort('-_id');
    res.json(usuarios);
});


// Post para crear un nuevo usuario
router.post('/', async (req,res) => {
    const { nombres, apellidos, correo_electronico, contrasena  } = req.body;
    const newUsuarios = new Usuarios({ nombres, apellidos, correo_electronico, contrasena });
    newUsuarios.save();
    res.json({message: 'Se creo un nuevo usuario.'});
});


// Actualizar la informacion de un usuario
router.put('/:id', async (req,res) => {
    const { nombres, apellidos, correo_electronico, contrasena } = req.body;
    const id = req.params.id;
    Usuarios.findOneAndUpdate(id,{
        $set: req.body
    }, (err, resultado) => {
        if(err){
            console.log(err)
        }
        res.json({message: 'Se actualizo la informacion del usuario.'})

    })
});


// Eliminar un usuario
router.delete('/:id', async (req,res) => {
    const id = req.params.id;
    const usuarios = await Usuarios.findByIdAndDelete(id);
    res.json({message: 'Usuario eliminado.'});
});


module.exports = router;