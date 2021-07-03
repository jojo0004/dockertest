const express = require('express');
const router  = express.Router();
const {get1,registerController,getquestion1,getquestion2} = require('../controller/userController');


router.get('/', (req, res, next) => {
    res.send('User api')
})

router.get('/mers/:CUSCOD', get1);
router.get('/getquestion1', getquestion1);
router.get('/getquestion2', getquestion2);
router.post('/register', registerController);

module.exports = router;