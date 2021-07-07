const express = require('express');
const router  = express.Router();
const {get1,registerController,getquestion1,getquestion2,PostAnswer,PutAnswer} = require('../controller/userController');


router.get('/', (req, res, next) => {
    res.send('User api')
})

router.get('/mers/:CUSCOD', get1);
router.get('/:YEAR/:PART/manager', getquestion1);
router.get('/:YEAR/:PART/officer', getquestion2);
router.post('/register', registerController);
router.post('/Answer', PostAnswer);
router.put('/EditAnswer', PutAnswer);
module.exports = router;