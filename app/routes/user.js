const express = require('express');
const router  = express.Router();
const {get1} = require('../controller/userController');


router.get('/', (req, res, next) => {
    res.send('User api')
})

router.get('/mers/:CUSCOD', get1);


module.exports = router;