const { registerNewUser } = require('../controllers/userControllers');

const router = require('express').Router();

router.post('/api/auth/register' , registerNewUser);

module.exports = router;