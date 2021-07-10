const express = require('express');
const router  = express.Router();
const {get1,registerController,getquestion1,getquestion2,PostAnswer1, PostAnswer2, PutAnswer1, PutAnswer2} = require('../controller/userController');


router.get('/', (req, res, next) => {
    res.send('User api')
})

router.get('/mers/:CUSCOD', get1);
router.get('/:userid/:year/:part/manager', getquestion1);
router.get('/:userid/:year/:part/officer', getquestion2);
router.post('/register', registerController);
router.post('/:userid/:year/:part/:number/Answer/manager', PostAnswer1);
router.post('/:userid/:year/:part/:number/Answer/officer', PostAnswer2);
router.put('/:userid/:year/:part/:number/Answer/manager', PutAnswer1);
router.put('/:userid/:year/:part/:number/Answer/officer', PutAnswer2);
module.exports = router;