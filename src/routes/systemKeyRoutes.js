const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/systemKeyController');

router.get('/groups', ctrl.getAllGroups);
router.get('/', ctrl.getByParentID); // VD: /api/system-keys?parentId=10

module.exports = router;