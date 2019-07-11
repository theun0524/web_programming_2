var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todoController');

// GET request for list of all Todo items.
router.get('/', todoController.list);

// POST request for creating Todo
router.post('/', todoController.create);

// PUT request for updating Todo
router.put('/:id', todoController.update);

// DELETE request for deleting Todo
router.delete('/:id', todoController.delete);

module.exports = router;
