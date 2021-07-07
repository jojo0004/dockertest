
const UserModel = require('../model/userModel');

exports.get1 = (req, res, next) => { 
    const CUSCOD = req.params.CUSCOD    
    UserModel.getall({CUSCOD:CUSCOD})
        .then(([row]) => {
            if (row.length !== 0) {
               
                res.send(row)
               
            }else{
             
                console.log(CUSCOD)
            }

        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })
}