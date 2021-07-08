const express = require('express');
const router  = express.Router();
const {get1,registerController,getquestion1,getquestion2,PostAnswer,PutAnswer} = require('../controller/userController');


router.get('/', (req, res, next) => {
    res.send('User api')
})

router.get('/mers/:CUSCOD', get1);
router.get('/:userid/:year/:part/manager', getquestion1);
router.get('/:userid/:year/:part/officer', getquestion2);
router.post('/register', registerController);
router.post('/:userid/:year/:part/:number/Answer', PostAnswer);
router.put('/:userid/:year/:part/:number/Answer', PutAnswer);
module.exports = router;