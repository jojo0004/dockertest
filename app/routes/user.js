const express = require('express');
const router  = express.Router();
const {getcontno,getre1,getre2,loginController,users,users_de,history,register,register1,ask_questions,getquestion1,getquestion2,PostAnswer1, PostAnswer2, PutAnswer1, PutAnswer2} = require('../controller/userController');


router.get('/', (req, res, next) => {
    res.send('User api')
})

router.get('/getcontno',getcontno);
router.get('/getcontno/:contno',getre1);
router.post('/getcontno1/:contno',getre2);
router.post('/ask_questions',ask_questions);
router.post('/history',history);
router.post('/register',register);
router.put('/register',register1);

router.post('/login',loginController);
router.get('/users',users);
router.get('/:userid/:position/:department',users_de);
router.get('/:year/:part/manager/:userid', getquestion1);
router.get('/:year/:part/officer/:userid', getquestion2);

router.post('/:year/:part/:number/Answer/manager/:userid', PostAnswer1);
router.post('/:year/:part/:number/Answer/officer/:userid', PostAnswer2);
router.put('/:year/:part/:number/Answer/manager/:userid', PutAnswer1);
router.put('/:year/:part/:number/Answer/officer/:userid', PutAnswer2);
module.exports = router;