'use strict';

var express = require('express');
var controller = require('./org.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:id/user', controller.getOrgUsers);
router.post('/:id/user', controller.createUserInBulk);
router.post('/:id/group', controller.createGroupsInBulk);
router.post('/:id/user/preview', controller.parseBulkImportFile); // preview is a noun, I checked
router.post('/:id/:groupId', controller.addGroup);

module.exports = router;
