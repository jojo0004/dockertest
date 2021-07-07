
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


exports.PostAnswer = (req, res, next) => {
    console.log(req.body.ANSWER)
    const {USERID='', ANSWER='', YEAR='', PART='', NUMBER='', videoURL='',date=''} = req.body.ANSWER;             
        UserModel.insertAws1({USERID, ANSWER, YEAR, PART, NUMBER, videoURL,date})
        .then(() => {
            res.status(201)
                .json({
                    message: 'success',
                    
                })
        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })   
 
     
                 
}

exports.PutAnswer = (req, res, next) => {
    console.log(req.body)
    const {USERID='', ANSWER='', YEAR='', PART='', NUMBER='', videoURL='',date=''} = req.body.ANSWER;  
                            
                    UserModel.UPDATEAws1({USERID, ANSWER, YEAR, PART, NUMBER, videoURL,date})
                        .then(() => {
                            res.status(201)
                                .json({
                                    message: 'success',                                   
                                })
                        }).catch((error) => {
                            res.status(500)
                                .json({
                                    message: error
                                })
                        })   
}