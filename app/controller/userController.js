
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
  
    const {part='', number='', year='', qt=''} = req.query;  
    console.log(part,number,year,qt)                           
                    UserModel.insertUserLSFHP_ARMAST({part, number, year, qt})
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
    const userid  = req.params.userid 
    const year  = req.params.year   
    const part  = req.params.part   
    UserModel.getquestion1({userid,year,part})
        .then(([row]) => {
            
            if (row.length !== 0) {
               
                res.send(row)
               
            }else{
                UserModel.getquestion_1({year,part})
                .then(([row])=> {
                    res.send(row)
                }).catch((error) => {
                    res.status(500)
                        .json({
                            message: error
                        })
                })
               
            }

        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })
}

exports.getquestion2= (req, res, next) => {  
    const userid  = req.params.userid 
    const year  = req.params.year   
    const part  = req.params.part     
    UserModel.getquestion2({userid,year,part})
        .then(([row]) => {
            if (row.length !== 0) {
               
                res.send(row)
               
            }else{
                UserModel.getquestion_2({year,part})
                .then(([row])=> {
                    res.send(row)
                }).catch((error) => {
                    res.status(500)
                        .json({
                            message: error
                        })
                })                          
            }

        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })
}


exports.PostAnswer = (req, res, next) => {
    const userid  = req.params.userid 
    const year  = req.params.year   
    const part  = req.params.part  
    const number  = req.params.number
    const {answer='', videoURL='', date=''} = req.body;             
        UserModel.insertAws1({userid, answer, year, part, number, videoURL, date})
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
    const userid  = req.params.userid 
    const year  = req.params.year   
    const part  = req.params.part  
    const number  = req.params.number  
    const {answer='', videoURL='', date=''} = req.body;                             
                    UserModel.UPDATEAws1({userid, answer, year, part, number, videoURL, date})
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