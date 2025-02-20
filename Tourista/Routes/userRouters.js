const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();
router.route('/').get(userController.getAllusers).post(userController.adduser);
router
  .route('/:id')
  .get(userController.getuser)
  .patch(userController.updateuser)
  .delete(userController.deleteuser);
module.exports = router;
