const book = require('../model/bookmodel');
const {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook,
    topreviedbooks
} = require('../controller/bookcontroller');
const express = require('express');
const router = express.Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.get('/top-reviewed', topreviedbooks);

module.exports = router;