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
static getquestion1() {
   
    return db.execute("SELECT * FROM cal2009.question1")
}

static getquestion2() {
   
    return db.execute("SELECT * FROM cal2009.question2")
}

static insertUserLSFHP_ARMAST({PART= '', NUMBER= '', YEAR= '', QU= '' }) {

return db.execute('INSERT INTO cal2009.question1 (PART, NUMBER,YEAR,QT) VALUES (?,?,?,?)',
    [PART, NUMBER, YEAR, QU])
}


}

module.exports = UserModel;