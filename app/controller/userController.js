
const e = require('express');
const UserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



exports.loginController = (req, res, next) => {
    const { userid = '', password } = req.body;
    UserModel.getall({ USERID: userid })
        .then(([row]) => {
            if (row.length !== 0) {
                return bcrypt.compare(password, row[0].password)
                    .then((result) => {
                        if (!result) {
                            res.status(401)
                                .json({
                                    message: "Authentication failed"
                                })
                        }
                        else { 
                                                
                            let jwtToken = jwt.sign({
                                userid: row[0].userid,
                                expiresIn: 3600                        
                            },
                                "create-authen-nodejs", {
                                expiresIn: "1h"
                            });
                            res.status(200).json({
                                userid: row[0].userid,
                                title_name: row[0].title_name,
                                name: row[0].name,
                                lastname: row[0].lastname,
                                nickname: row[0].nickname,
                                phone: row[0].phone,
                                email: row[0].email,
                                department: row[0].department,
                                position: row[0].position,
                                status_login: true,
                            });                        
                        }
                    }).catch((error) => {
                        res.status(401)
                            .json({
                                message: "Authentication failed1",
                                error: error

                            })
                    })
            } else {
                res.status(401)
                    .json({
                        message: "Authentication failed"
                    })
            }
        })
        .catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })
}


exports.register = (req, res, next) => {
    const { userid = '', password,position='' } = req.body;
    const ROLE1 = 'admin'
    UserModel.getall({ USERID: userid })
        .then(([row]) => {
            if (row.length !== 0) {
                res.status(401)
                .json({
                    message: "Authentication failed"
                })
            } else {
                bcrypt.hash(password, 10)
                .then((hash) => {
                    UserModel.insertUser({ USERID: userid , PASSWORD: hash,position:position})
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
                })
                .catch((error) => {
                    res.status(500)
                        .json({
                            message: error
                        })
                })
            }
        })
        .catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })

    
    
}

exports.register1 = (req, res, next) => {  
    const { userid = '', password} = req.body;
    const ROLE1 = 'admin'
    UserModel.getall({ USERID: userid })
        .then(([row]) => {
            if (row.length !== 0) {
                bcrypt.hash(password, 10)
                .then((hash) => {
                    UserModel.updateUser({ USERID: userid , PASSWORD: hash})
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
                    })
                    .catch((error) => {
                        res.status(500)
                            .json({
                                message: error
                            })
                    })
            } else {
                res.status(401)
                .json({
                    message: "Authentication failed"
                })
              
               
            }
        })
        .catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })

    
    
}


exports.history = (req, res, next) => {
   
    const {userid='',title_name='', name='', lastname='', nickname='', phone='', email='', department='',position=''} = req.body;                            
                    UserModel.insertHistory({userid,title_name, name, lastname, nickname, phone, email, department,position})
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



exports.ask_questions = (req, res, next) => {
  
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
                te=[]  
             
                UserModel.getquestion_1({year,part})
                .then(([row1])=> {                   
                  row1.forEach((element,index) => {     
                         
                      row.forEach((element1)=>{
                  
                         if(element.number===element1.number)
                         {
                          te.push({userid:element1.userid,year:element.year,part:element.part
                              ,number:element.number,qt:element.qt,answer:element1.answer
                              ,videoURL:element1.videoURL,date:element1.date                               
                          })  
                                          
                         }  
                                                      
                      }) 
                      if(index>=te.length){                         
                        te.push({year:element.year,part:element.part
                            ,number:element.number,qt:element.qt}) 
                      }                                                                                                                      
                  })                                                                           
                   res.send(te)                
                      
                }).catch((error) => {
                    res.status(500)
                        .json({
                            message: error
                        })
                })
              
              
               
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
                te=[]             
                UserModel.getquestion_2({year,part})
                .then(([row1])=> {                   
                  row1.forEach((element,index) => {     
                         
                      row.forEach((element1)=>{
                  
                         if(element.number===element1.number)
                         {
                          te.push({userid:element1.userid,year:element.year,part:element.part
                              ,number:element.number,qt:element.qt,answer:element1.answer
                              ,videoURL:element1.videoURL,date:element1.date                               
                          })  
                                          
                         }  
                                                      
                      }) 
                      if(index>=te.length){                         
                        te.push({year:element.year,part:element.part
                            ,number:element.number,qt:element.qt}) 
                      }                                                                                                                      
                  })                                                                           
                   res.send(te)                
                      
                }).catch((error) => {
                    res.status(500)
                        .json({
                            message: error
                        })
                })
               
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


exports.PostAnswer1 = (req, res, next) => {
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
exports.PostAnswer2 = (req, res, next) => {
    const userid  = req.params.userid 
    const year  = req.params.year   
    const part  = req.params.part  
    const number  = req.params.number
    const {answer='', videoURL='', date=''} = req.body;             
        UserModel.insertAws2({userid, answer, year, part, number, videoURL, date})
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

exports.PutAnswer1 = (req, res, next) => {
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

exports.PutAnswer2 = (req, res, next) => {
    const userid  = req.params.userid 
    const year  = req.params.year   
    const part  = req.params.part  
    const number  = req.params.number  
    const {answer='', videoURL='', date=''} = req.body;                             
                    UserModel.UPDATEAws2({userid, answer, year, part, number, videoURL, date})
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