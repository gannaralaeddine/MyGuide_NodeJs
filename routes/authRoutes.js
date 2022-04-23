const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup', authController.signup_post);

router.post('/login', authController.login_post);

router.get("/register", authController.register_view)

router.get("/login", authController.login_view)

router.get("/logout", authController.logout)

module.exports = router;