const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth.controller');
const { route } = require('./music.routes');

router.post('/register',authController.registerUser);
router.post('/login',authController.loginUser);
router.post('/logout',authController.logoutUser);

module.exports=router;