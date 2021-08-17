
const e = require('express');
const UserModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.users = (req, res, next) => {

    UserModel.getusers()
        .then(([row]) => {
            res.send(row)
        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })
}

exports.users_de = (req, res, next) => {
    const userid = req.params.userid
    const position = req.params.position
    const department = req.params.department
    if (position == 'ผู้จัดการ') {
        UserModel.getusers_de({ department })
            .then(([row]) => {
                res.send(row)
            }).catch((error) => {
                res.status(500)
                    .json({
                        message: error
                    })
            })
    } else if (position == 'admin') {
        UserModel.getusers()
            .then(([row]) => {
                res.send(row)
            }).catch((error) => {
                res.status(500)
                    .json({
                        message: error
                    })
            })
    }

}



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
    const { userid = '', password, position = '' } = req.body;
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
                        UserModel.insertUser({ USERID: userid, PASSWORD: hash, position: position })
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
    const { userid = '', password } = req.body;
    const ROLE1 = 'admin'
    UserModel.getall({ USERID: userid })
        .then(([row]) => {
            if (row.length !== 0) {
                bcrypt.hash(password, 10)
                    .then((hash) => {
                        UserModel.updateUser({ USERID: userid, PASSWORD: hash })
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

    const { userid = '', title_name = '', name = '', lastname = '', nickname = '', phone = '', email = '', department = '', position = '' } = req.body;
    UserModel.insertHistory({ userid, title_name, name, lastname, nickname, phone, email, department, position })
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

    const { part = '', number = '', year = '', qt = '' } = req.query;
    console.log(part, number, year, qt)
    UserModel.insertUserLSFHP_ARMAST({ part, number, year, qt })
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
    const userid = req.params.userid
    const year = req.params.year
    const part = req.params.part
    UserModel.getquestion1({ userid, year, part })
        .then(([row]) => {

            if (row.length !== 0) {
                te = []

                UserModel.getquestion_1({ year, part })
                    .then(([row1]) => {
                        row1.forEach((element, index) => {

                            row.forEach((element1) => {

                                if (element.number === element1.number) {
                                    te.push({
                                        userid: element1.userid, year: element.year, part: element.part
                                        , number: element.number, qt: element.qt, answer: element1.answer
                                        , videoURL: element1.videoURL, date: element1.date
                                    })

                                }

                            })
                            if (index >= te.length) {
                                te.push({
                                    year: element.year, part: element.part
                                    , number: element.number, qt: element.qt
                                })
                            }
                        })
                        res.send(te)

                    }).catch((error) => {
                        res.status(500)
                            .json({
                                message: error
                            })
                    })



            } else {
                UserModel.getquestion_1({ year, part })
                    .then(([row]) => {
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

exports.getquestion2 = (req, res, next) => {
    const userid = req.params.userid
    const year = req.params.year
    const part = req.params.part
    UserModel.getquestion2({ userid, year, part })
        .then(([row]) => {
            if (row.length !== 0) {
                te = []
                UserModel.getquestion_2({ year, part })
                    .then(([row1]) => {
                        row1.forEach((element, index) => {

                            row.forEach((element1) => {

                                if (element.number === element1.number) {
                                    te.push({
                                        userid: element1.userid, year: element.year, part: element.part
                                        , number: element.number, qt: element.qt, answer: element1.answer
                                        , videoURL: element1.videoURL, date: element1.date
                                    })

                                }

                            })
                            if (index >= te.length) {
                                te.push({
                                    year: element.year, part: element.part
                                    , number: element.number, qt: element.qt
                                })
                            }
                        })
                        res.send(te)

                    }).catch((error) => {
                        res.status(500)
                            .json({
                                message: error
                            })
                    })

            } else {
                UserModel.getquestion_2({ year, part })
                    .then(([row]) => {
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
    const userid = req.params.userid
    const year = req.params.year
    const part = req.params.part
    const number = req.params.number
    const { answer = '', videoURL = '', date = '' } = req.body;
    UserModel.getAws1({ userid, year, part, number })
        .then(([row]) => {

            if (row.length !== 0) {
                res.status(201)
                    .json({
                        message: 'มีคำตอบแล้ว',

                    })
            } else {
                UserModel.insertAws1({ userid, answer, year, part, number, videoURL, date })
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
        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })



}
exports.PostAnswer2 = (req, res, next) => {
    const userid = req.params.userid
    const year = req.params.year
    const part = req.params.part
    const number = req.params.number
    const { answer = '', videoURL = '', date = '' } = req.body;
    UserModel.getAws2({ userid, year, part, number })
        .then(([row]) => {

            if (row.length !== 0) {
                res.status(201)
                    .json({
                        message: 'มีคำตอบแล้ว',

                    })
            } else {
                UserModel.insertAws2({ userid, answer, year, part, number, videoURL, date })
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
        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })




}

exports.PutAnswer1 = (req, res, next) => {
    const userid = req.params.userid
    const year = req.params.year
    const part = req.params.part
    const number = req.params.number
    const { answer = '', videoURL = '', date = '' } = req.body;
    UserModel.UPDATEAws1({ userid, answer, year, part, number, videoURL, date })
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
    const userid = req.params.userid
    const year = req.params.year
    const part = req.params.part
    const number = req.params.number
    const { answer = '', videoURL = '', date = '' } = req.body;
    UserModel.UPDATEAws2({ userid, answer, year, part, number, videoURL, date })
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


exports.getcontno = (req, res, next) => {


    UserModel.getcontno()
        .then(([row]) => {
            res.send(row)

        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })

}

exports.getre1 = (req, res, next) => {
    const contno = req.params.contno
    const CREAT = new Date();
    const Year = CREAT.getFullYear();
    const day = CREAT.getDate();
    const Month = CREAT.getMonth() + 1;
    EndDate = new Date()
    const t = "" + Year + "" + '-' + "" + Month + "" + '-' + "" + day + ""
    UserModel.getre1({ contno: contno, ddate: t })
        .then(([row]) => {
            let dok1 = []
            row.forEach(i => {
                
                let bala = ~~i.tcshprc
                if (bala < 100000) {
                    let dok = 0.019
                    let all = bala * (1 + (dok * i.totalnopay)) - i.totalpayment
                    
                    dok1.push(all)
                    return dok1
                } else if (bala >= 100000 && bala < 150000) {
                    let dok = 0.0185
                    let all = bala * (1 + (dok * i.totalnopay)) - i.totalpayment
                    
                    dok1.push(all)
                    return dok1
                }
                else if (bala >= 150000 && bala < 200000) {
                    let dok = 0.018
                    let all = bala * (1 + (dok * i.totalnopay)) - i.totalpayment
                    
                    dok1.push(all)
                    return dok1
                }
                else if (bala >= 200000 && bala < 250000) {
                    let dok = 0.0175
                    let all = bala * (1 + (dok * i.totalnopay)) - i.totalpayment
                    
                    dok1.push(all)
                    return dok1

                }
                else if (bala >= 250000 && bala < 300000) {
                    let dok = 0.0170
                    let all = bala * (1 + (dok * i.totalnopay)) - i.totalpayment
                    
                    dok1.push(all)
                    return dok1
                }
                else if (bala >= 300000 && bala < 350000) {
                    let dok = 0.0165
                    let all = bala * (1 + (dok * i.totalnopay)) - i.totalpayment
                    
                    dok1.push(all)
                    return dok1
                }
                else {
                    let dok = 0.0160
                    let all = bala * (1 + (dok * i.totalnopay)) - i.totalpayment
                    
                    dok1.push(all)

                }
                return dok1
            })
            var s1 = (dok1/10000)
            var s2 = s1.toFixed(1)*10000
            res.send(s2.toString())
         

        }).catch((error) => {
            res.status(500)
                .json({
                    message: error
                })
        })

}


const feed1 = async () => {
    let b = await sayHi()
    let INTAMT = await say()
    //  let PAYINT = await  say1() 
    var g = ~~INTAMT[0].aa + Math.round(~~b[0].tttt)
    console.log("l", g)
    return INTAMT
}

exports.getre2 = (req, res, next) => {
    const contno = req.params.contno
    const totalpayment = req.body.totalpayment
    const nopay = req.body.t_nopay
    const no_pay = req.body.totalnopay
    const totalnopay =  ~~nopay-~~no_pay
   // console.log(nopay)
    const CREAT = new Date();
    const Year = CREAT.getFullYear();
    const day = CREAT.getDate();
    const Month = CREAT.getMonth() + 1;
    EndDate = new Date()
    const t = "" + Year + "" + '-' + "" + Month + "" + '-' + "" + day + ""
    
    UserModel.getdamt({ contno: contno, ddate: t })
        .then(([row]) => {
         
            dataDAMT = []
            checkDelay = []
            dataDELAY = []
            dataNOPAT = []
            data = []
            data1 = []
            te = []
            te1 = []
            bu = []
            var arr = new Array();
            bu1 = []
            tttt = []

            for (i = 0; i <= row.length - 1; i++) {
                const StartDDATE = row[i].DDATE;
                const StartDate = row[i].DATE1;
                const PAY = ~~row[i].NOPAY;
                const TCSHPRC = ~~row[i].DAMT;
                const TOTPRC = ~~row[i].DELAY;
                const PAYMENT = ~~row[i].PAYMENT;
                StartD = new Date(StartDDATE)
                Start1 = new Date(StartDate)
                diffD = EndDate.getTime() - StartD.getTime();   //วันสุดท้าย - วันเริ่ม = ? millisec
                diffD = Math.floor(diffD / (1000 * 60 * 60 * 24));
               
                if (StartDate !== null && TCSHPRC > PAYMENT) {
                 
                    StartD = new Date(StartDDATE)
                    Start1 = new Date(StartDate)
                    if (Start1.getTime() <= StartD.getTime()) {
                        diffD = EndDate.getTime() - StartD.getTime();   //วันสุดท้าย - วันเริ่ม = ? millisec
                        diffD = Math.floor(diffD / (1000 * 60 * 60 * 24));
                        
                        if (diffD >= 8) {
                            var DAMs = TCSHPRC - PAYMENT
                            var fees = ((DAMs * 0.0175) / 30)
                            var INTAMTs = ((DAMs * 0.0125) / 30)
                            var INTAMTD = (INTAMTs * diffD)
                            var feeD = (fees * diffD)
                            tttt.push(INTAMTD + feeD)
                            data.push(INTAMTD)
                            data1.push(feeD)
                            dataDELAY.push(diffD)
                            checkDelay.push(diffD)
                           
                        } else {
                            tttt.push(0)
                            

                        }

                    } else {
                        //----เริ่มคิดตั้งแต่วันที่ชำระ จนถึงงวดที่ตัวเองต้องจ่าย------//
                        diffD = Start1.getTime() - StartD.getTime();   //วันสุดท้าย - วันเริ่ม = ? millisec
                        diffD = Math.floor(diffD / (1000 * 60 * 60 * 24));
                       
                        if (diffD >= 8) {
                            var DAMs = TCSHPRC
                            var fees = ((DAMs * 0.0175) / 30)
                            var INTAMTs = ((DAMs * 0.0125) / 30)
                            var INTAMTD = (INTAMTs * diffD)
                            var feeD = (fees * diffD)
                            tttt.push(INTAMTD + feeD)
                            diff = EndDate.getTime() - Start1.getTime();   //วันสุดท้าย - วันเริ่ม = ? millisec
                            diff = Math.floor(diff / (1000 * 60 * 60 * 24));
                            
                            if (diff >= 8) {
                                var DAMs = TCSHPRC - PAYMENT
                                var fees = ((DAMs * 0.0175) / 30)
                                var INTAMTs = ((DAMs * 0.0125) / 30)
                                var INTAMTst = (INTAMTs * diff)
                                var feest = (fees * diff)
                                data.push(INTAMTst)
                                data1.push(feest)
                                dataDELAY.push(diff)
                                checkDelay.push(diffD)
                               
                            }



                        } else {
                            tttt.push(0)
                            diff = EndDate.getTime() - Start1.getTime();   //วันสุดท้าย - วันเริ่ม = ? millisec
                            diff = Math.floor(diff / (1000 * 60 * 60 * 24));
                            
                            if (diff >= 8) {
                                var DAMs = TCSHPRC - PAYMENT
                                var fees = ((DAMs * 0.0175) / 30)
                                var INTAMTs = ((DAMs * 0.0125) / 30)
                                var INTAMTst = (INTAMTs * diff)
                                var feest = (fees * diff)
                                data.push(INTAMTst)
                                data1.push(feest)
                                dataDELAY.push(diff)
                               
                            }
                        }
                    }
                }
                if (diffD >= 8 && StartDate === null) {
                   
                    DDATE = new Date(StartDDATE)
                    diff1 = EndDate.getTime() - DDATE.getTime();
                    diff1 = Math.floor(diff1 / (1000 * 60 * 60 * 24));
                    var DAM = TCSHPRC - PAYMENT
                    var fee0 = ((TCSHPRC * 0.0175) / 30)
                    var INTAMT0 = ((TCSHPRC * 0.0125) / 30)
                    var INTAMT = Math.round(INTAMT0 * diff1)
                    var fee = Math.round(fee0 * diff1)
                    dataNOPAT.push(PAY)
                    dataDAMT.push(DAM)
                    dataDELAY.push(diff1)
                    data.push(INTAMT)
                    data1.push(fee)
                } else {
                   
                    var DAM = TCSHPRC - PAYMENT
                    dataNOPAT.push(PAY)
                    dataDAMT.push(DAM)
                    INTAMT = 0
                    fee = 0
                }
            }
            if (row.length === 0) {
                tttt.push(0)
                te.push({ INTAMT: 0, fee: 0, DELAY: 0, tttt})
                console.log(te)
               
            } else {

                const re = data.reduce((sum, number) => {
                    return sum + number
                }, 0)
                const re1 = data1.reduce((sum, number) => {
                    return sum + number
                }, 0)
                const re2 = dataDELAY.reduce((sum, number) => {
                    return sum + number
                }, 0)
                const re3 = dataDAMT.reduce((sum, number) => {
                    return sum + number
                }, 0)
                te.push({ INTAMT: re, fee: re1, DELAY: re2, DAMT: re3, row, te1, tttt, checkDelay })

               

            }
            UserModel.getaa({ contno: contno })
            .then(([row]) => {
                
                row.forEach((i) => {
                   
                   let a = ~~i.aa+Math.round(~~te[0].tttt)
                 //  console.log(a)
                    bu.push(a,i.payment)  
                    

                })
                UserModel.getPayint({ contno: contno })
                .then(([row1]) => {
                    row1.forEach((i) => {
                      //  console.log(bu[1])
                        let b = ~~i.PAYI-~~bu[0]
                        let balan=~~i.balanc-totalpayment
                        var INTAMT_fee = Math.round(-b * 0.415667)
                        var fee_INTAMT = Math.round(-b * 0.5843337)
                        var c = Math.round(te[0].INTAMT + INTAMT_fee) + Math.round(te[0].fee + fee_INTAMT)
                        
                        if(~~nopay <= 12)
                        {
                            let dok = 0.06
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                            return bu1                          
                        }else if (~~nopay == 24)
                        {
                            let dok = 0.09
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                           
                            bu1.push(all1.toFixed(0))
                            return  bu1
                        }
                        else if (~~nopay == 30)
                        {
                            let dok = 0.11
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                            return bu1
                        }
                        else if (~~nopay == 36)
                        {
                            
                            let dok = 0.13
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                            return bu1
                        }
                        else if (~~nopay == 42)
                        {
                            let dok = 0.145
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                            return bu1
                        }
                        else if (~~nopay == 48)
                        {
                            
                            let dok = 0.16
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                            console.log(balan,c,(bu[1]*totalnopay),totalnopay,all1)
                            return bu1
                        }
                        else if (~~nopay == 54)
                        {
                            let dok = 0.175
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                            return bu1
                        }
                        else if (~~nopay == 60)
                        {
                            let dok = 0.19
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                            return bu1
                        }
                        else if (~~nopay == 66)
                        {
                            let dok = 0.205
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                            return bu1
                        }
                        else if (~~nopay == 72)
                        {
                            let dok = 0.22
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                            return bu1
                        }else
                        {
                            let dok = 0.25
                            let all1 = (balan+c)-((bu[1]*totalnopay)*dok)
                            bu1.push(all1.toFixed(0))
                        }                  
                     
                        return bu1
     
                     })
                   
                     var s1 = (bu1/10000)
                     var s2 = s1.toFixed(1)*10000
                     res.send(s2.toString())
                   
                }).catch((error) => {
                    console.log(error)
                })
                
                 
            }).catch((error) => {
                console.log(error)
            })
           
          

        }).catch((error) => {
            console.log(error)
        })


}




let say1 = function sum2() {
    UserModel.getPayint({ contno: '8-0007934' })
        .then(([row]) => {

            return row
        }).catch((error) => {
            console.log(error)
        })
    console.log(row)
    return row
}
