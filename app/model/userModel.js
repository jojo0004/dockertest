const db = require('../DB/mysql')

class UserModel {
    constructor({ CUSCOD = '', PASSWORD = '', USERID_LINE = '',SDATE = '', ROLE = '', MA = '' }) {
        this.CUSCOD = CUSCOD;
        this.PASSWORD = PASSWORD;
        this.SDATE=SDATE;
        this.ROLE = ROLE;
        this.MA = MA;
        this.USERID_LINE = USERID_LINE;
        this.CREATDATE = new Date();
        this.UPDATEDATE = new Date();


    }

static getall({CUSCOD=''}) {
   
    return db.execute("SELECT CUSCOD FROM cal2009.newcontno WHERE CUSCOD = ? limit 10 ", [CUSCOD])
}
static getquestion1({YEAR ='',PART=''}) {
   
    return db.execute("SELECT * FROM cal2009.question1 WHERE YEAR = ? and PART = ?",[YEAR,PART])
}

static getquestion2({YEAR ='',PART=''}) {
   
    return db.execute("SELECT * FROM cal2009.question2  WHERE YEAR = ? and PART = ?",[YEAR,PART])
}

static insertUserLSFHP_ARMAST({PART= '', NUMBER= '', YEAR= '', QU= '' }) {

return db.execute('INSERT INTO cal2009.question1 (PART, NUMBER,YEAR,QT) VALUES (?,?,?,?)',
    [PART, NUMBER, YEAR, QU])
}

static insertAws1({USERID='', ANSWER='', YEAR='', PART='', NUMBER='', videoURL='',date=''}) {

    return db.execute('INSERT INTO cal2009.aws1 (USERID, ANSWER, YEAR, PART, NUMBER,videoURL,date) VALUES (?,?,?,?,?,?,?)',
        [USERID, ANSWER, YEAR, PART, NUMBER, videoURL,date])
    }
 static UPDATEAws1({USERID='', ANSWER='', YEAR='', PART='', NUMBER='', videoURL='',date=''}) {
        return db.execute('UPDATE cal2009.aws1 SET  ANSWER=?,  videoURL=?,date=? WHERE USERID=? and YEAR=? and PART=? and NUMBER=?',
            [ ANSWER,videoURL,date,USERID,YEAR, PART, NUMBER])

    }

}



module.exports = UserModel;