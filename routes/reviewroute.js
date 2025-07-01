const review = require('../model/reviewmodel')
const express = require('express')
const router = express.Router()
const {createreview,updatereview,deletereview}= require('../controller/reviewcontroller')

router.post('/', createreview)
router.put('/:id', updatereview)
router.delete('/:id', deletereview)

module.exports = router