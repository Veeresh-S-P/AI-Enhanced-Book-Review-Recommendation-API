const tag=require('../model/tagmodel');
const express = require('express');
const router = express.Router();
const { createTag, listTags } = require('../controller/tagcontroller');

router.post('/', createTag);
router.get('/', listTags);

module.exports = router;