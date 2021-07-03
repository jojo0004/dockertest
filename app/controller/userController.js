
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



exports.registerController = (req, res, next) => {
  
    const {PART='', NUMBER='', YEAR='', QU=''} = req.query;  
    console.log(PART,NUMBER,YEAR,QU)                           
                    UserModel.insertUserLSFHP_ARMAST({PART, NUMBER, YEAR, QU})
                        .then(() => {
                            res.status(201)
                                .json({
                                    message: 'success'
                                })
                        }).catch((error) => {
                            res.status(500)
                                .json({
                                    message: error
                                })
                        })
              
                
            
        
    
}

exports.getquestion1 = (req, res, next) => {   
    const YEAR  = req.params.YEAR   
    const PART  = req.params.PART   
    UserModel.getquestion1({YEAR,PART})
        .then(([row]) => {
            if (row.length !== 0) {
               
                res.send(row)
               
            }else{
             
               
            }

        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })
}

exports.getquestion2= (req, res, next) => {  
    const YEAR  = req.params.YEAR   
    const PART  = req.params.PART     
    UserModel.getquestion2({YEAR,PART})
        .then(([row]) => {
            if (row.length !== 0) {
               
                res.send(row)
               
            }else{
             
               
            }

        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })
}
