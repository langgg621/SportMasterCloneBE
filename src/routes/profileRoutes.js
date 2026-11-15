const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profileController');
const auth = require('../middlewares/auth');

router.use(auth);
router.get('/menu', ctrl.getMenu);

module.exports = router;